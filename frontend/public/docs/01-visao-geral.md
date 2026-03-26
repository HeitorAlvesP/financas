# 🗺️ Visão Geral do Sistema: HALPI

## 1. O Propósito do HALPI
O **HALPI** é uma plataforma web para controle financeiro pessoal e gestão de benefícios. O objetivo é centralizar gastos em cartões de crédito, contas de débito e saldos de vales (Alimentação e Refeição), oferecendo previsibilidade financeira e controle de recargas através de uma interface moderna, responsiva e focada na experiência do usuário (UX).

---

## 2. Fluxo de Autenticação e Segurança
O acesso ao sistema é rigorosamente controlado. A segurança é garantida por senhas criptografadas no banco de dados (hash) e sessões baseadas em JWT (JSON Web Tokens).

### 2.1. Cadastro e Validação de E-mail
* **Registro:** Ao criar uma conta, o usuário informa seus dados básicos. A conta é criada no banco de dados, mas nasce com o status de **Inativa / Pendente de Validação**.
* **Geração de Token:** Imediatamente após o cadastro, o backend gera um token numérico de 6 dígitos, atrela a esse usuário com um tempo de expiração, e aciona o serviço `Nodemailer` para disparar um e-mail transacional.
* **Validação:** O usuário é levado à tela de validação. Se inserir o código correto antes de expirar, a conta é ativada.

### 2.2. Login e Reencaminhamento Inteligente
* Ao tentar fazer login, o sistema primeiro valida as credenciais (E-mail e Senha).
* **Regra de Negócio Crítica:** Se as credenciais estiverem corretas, mas o banco de dados indicar que o e-mail **não foi validado**, o login é bloqueado. O sistema automaticamente gera um *novo* código de 6 dígitos, dispara um *novo* e-mail e redireciona o usuário compulsoriamente para a tela de Validação Pendente.
* Se a conta estiver validada, o backend devolve o JWT e os dados de sessão, liberando o acesso ao `Dashboard`.

### 2.3. Recuperação de Senha
* Segue a mesma lógica do token de 6 dígitos via e-mail. O usuário comprova a posse do e-mail informado para, então, receber a autorização de cadastrar uma nova senha.

---

## 3. Minha Conta (Perfil do Usuário)
A "Central da Conta" é o módulo onde o usuário gerencia seus dados pessoais e de segurança.
* **Atualização Cadastral:** Permite alterar dados de contato, respeitando validações de formato.
* **Alteração de Senha:** Possui uma trava de segurança. O usuário é obrigado a fornecer a *Senha Atual* (que é validada contra o banco via bcrypt/hash) para provar que é ele mesmo antes de registrar a *Nova Senha*.

---

## 4. Central de Cartões (Gestão e Regras de Negócio)
O módulo de cartões é o núcleo operacional do HALPI. Ele possui rotinas de Cadastro, Edição, Listagem e Inativação (Soft Delete).

### 4.1. Dinâmica de Tela (Frontend)
A interface é reativa. O formulário se reconstrói instantaneamente dependendo do **Tipo de Cartão** selecionado (`C` - Crédito, `D` - Débito, `V` - Vale). Os arquivos de serviço (`handleSalvarCartao` e `handleEditarCartao`) possuem validações que exigem os campos corretos dependendo da seleção.

### 4.2. Inativação (Soft Delete)
Quando um usuário "exclui" um cartão na interface, o registro **não é apagado do banco de dados**. O sistema altera a coluna `status` de `1` para `0`. 
* **Motivo:** Garantir a integridade referencial. Se o cartão for deletado fisicamente, todo o histórico de transações e faturas passadas atreladas a ele perderia a referência ou causaria quebra no banco.

---

### 4.3. Regras Específicas por Tipo de Cartão

#### 💳 Cartão de Crédito (C)
* **Finalidade:** Compras a prazo que geram faturas mensais.
* **Campos Específicos:** Exige *Limite Total* e *Dia de Vencimento*.
* **Regra de Vencimento:** O sistema trava a escolha do dia de vencimento **entre 1 e 28**. Isso evita bugs severos de cálculo em meses como Fevereiro (que não possui dia 29, 30 ou 31), garantindo que a fatura vença no mesmo dia em todos os meses do ano.
* **Lógica de Edição/Visualização:** Ao listar, exibe os 4 últimos dígitos e o limite. Transações futuras neste cartão reduzirão o "Limite Disponível" e aumentarão o valor da fatura atual.

#### 💳 Cartão de Débito (D)
* **Finalidade:** Compras à vista deduzidas diretamente da conta corrente.
* **Campos Específicos:** Apenas os dados básicos (Nome, Titular, 4 Dígitos iniciais). Não possui limite nem vencimento.
* **Lógica de Edição/Visualização:** Formato simplificado. As transações lançadas aqui afetarão imediatamente o saldo principal do usuário no Dashboard.

#### 🛒 Vale Alimentação / Refeição (V)
* **Finalidade:** Gestão de benefícios corporativos com recargas periódicas.
* **Campos Específicos:** Em vez de limite, possui **Saldo**. Exige o preenchimento da regra de **Recarga** (Tipo e Dia).
* **Tipos de Recarga:**
  * `FIXO`: Um dia corrido específico do mês (ex: todo dia 15). Limitado ao dia 28 pelo mesmo motivo do cartão de crédito.
  * `UTIL`: Um dia útil do mês (ex: 2º dia útil). Limitado a 5, assumindo que as empresas recarregam no máximo até o quinto dia útil.
* **A Regra do Número Mágico (99):**
  * Muitas empresas depositam benefícios no *último dia do mês*. Para automatizar isso em meses que terminam em 28, 30 ou 31, o sistema introduz o uso do valor `99`.
  * Na interface, isso se reflete como uma caixinha de seleção ("Último do Mês" ou "Último Dia Útil").
  * Ao ser marcada, o input numérico é bloqueado e o valor `99` é enviado ao banco de dados na coluna `dia_recarga`.
  * **Interpretação no Backend:** * `99` + `FIXO` = O cálculo da recarga buscará o último dia corrido do calendário do mês corrente.
    * `99` + `UTIL` = O cálculo buscará o último dia útil (ignorando finais de semana e feriados) do mês corrente.

---

## 5. Próximos Passos (Roadmap)
Com a base de usuários e cartões solidificada, o desenvolvimento seguirá para:
- Módulo de Categorização de despesas.
- Motor de lançamento de transações (Entradas, Saídas e Faturas).
- Dashboard analítico e resumos dinâmicos.
# 🗄️ Estrutura de Banco de Dados: HALPI

## 1. Visão Geral e Escolha Tecnológica
O banco de dados do HALPI utiliza o motor **SQLite**. 
Diferente de bancos robustos como PostgreSQL ou MySQL (que rodam como serviços separados), o SQLite é um banco de dados relacional embarcado. Todo o banco é salvo em um único arquivo local no servidor.

* **Por que SQLite?** Para um sistema de controle financeiro pessoal (MVP), o SQLite oferece performance formidável, portabilidade (backup é apenas copiar um arquivo) e não exige custos com infraestrutura pesada de banco de dados, suportando perfeitamente milhares de requisições simultâneas e integridade relacional (Chaves Estrangeiras).

---

## 2. Dicionário de Dados: Tabelas Atuais

O banco possui duas tabelas principais que sustentam o ecossistema de autenticação e gestão de contas.

### 2.1. Tabela `tb_usuario`
Responsável por armazenar as credenciais, dados de contato e o controle de segurança (recuperação e validação de e-mail).

| Coluna | Tipo | Regras / Detalhes |
| :--- | :--- | :--- |
| **`id`** | INTEGER | Primary Key (PK), Auto Increment. Identificador único. |
| **`nome`** | TEXT | Nome de exibição do usuário. |
| **`email`** | TEXT | Único (UNIQUE). Usado para login. |
| **`telefone`** | TEXT | Contato para possíveis notificações futuras. |
| **`senha`** | TEXT | **Segredo de Segurança:** NUNCA armazena a senha real. Guarda apenas o *Hash* gerado pela biblioteca `bcrypt`. |
| **`status`** | INTEGER | `0` = Inativo / E-mail não validado. `1` = Ativo. |
| **`token_validacao`** | TEXT | Armazena temporariamente o código de 6 dígitos enviado por e-mail. |
| **`token_expiracao`** | DATETIME | Data e hora exata em que o `token_validacao` perde a validade. |

### 2.2. Tabela `tb_cartao`
Responsável por armazenar todos os métodos de pagamento e benefícios. 
**Segredo de Arquitetura:** Esta tabela usa um conceito semelhante ao *Polimorfismo*. Em vez de criar três tabelas diferentes (uma para Crédito, uma para Débito, uma para Vale), usamos uma única tabela flexível. A coluna `tipo_cartao` dita quais das outras colunas farão sentido para aquele registro. O restante fica como `NULL`.

| Coluna | Tipo | Regras / Detalhes |
| :--- | :--- | :--- |
| **`id`** | INTEGER | Primary Key (PK), Auto Increment. |
| **`usuario_id`** | INTEGER | Foreign Key (FK) apontando para `tb_usuario(id)`. Garante que um usuário só veja os seus cartões. |
| **`nome`** | TEXT | Apelido do cartão (ex: "Nubank", "Sodexo"). |
| **`nome_responsavel`**| TEXT | Nome impresso no plástico. |
| **`numero_cartao`** | TEXT | Armazena APENAS os 4 últimos dígitos por segurança. |
| **`tipo_cartao`** | TEXT | **'C'** (Crédito), **'D'** (Débito) ou **'V'** (Vale). |
| **`limite`** | REAL | Valor financeiro total. *(Preenchido apenas se tipo = 'C')*. |
| **`dia_vencimento`** | INTEGER | Dia do fechamento da fatura (1 a 28). *(Apenas para 'C')*. |
| **`saldo`** | REAL | Valor disponível atual. *(Preenchido apenas se tipo = 'V')*. |
| **`tipo_recarga`** | TEXT | 'FIXO' (Dia corrido) ou 'UTIL' (Dia útil). *(Apenas para 'V')*. |
| **`dia_recarga`** | INTEGER | Dia da recarga. *(Apenas para 'V')*. |
| **`status`** | INTEGER | **Segredo de Integridade:** `1` = Ativo. `0` = Excluído. |

---

## 3. Segredos e Lógicas de Negócio no Banco

Para manter a consistência financeira do sistema ao longo dos anos, o banco de dados impõe algumas "regras invisíveis".

### 3.1. A Regra do "Soft Delete" (Exclusão Lógica)
No HALPI, o comando `DELETE FROM tb_cartao WHERE id = X` **nunca é utilizado**.
* **O Problema:** Se o usuário deletar fisicamente um cartão de crédito, todas as faturas e transações passadas que estavam vinculadas àquele ID ficariam órfãs, corrompendo o histórico financeiro do Dashboard.
* **A Solução (Soft Delete):** Quando o usuário clica em "Excluir Cartão", o sistema faz um `UPDATE tb_cartao SET status = 0`. O frontend passa a ocultar esse cartão (pois a API só retorna `status = 1`), mas o banco mantém o registro intacto para garantir a integridade dos relatórios passados.

### 3.2. A Regra do Número Mágico (99)
Uma das maiores dores de cabeça em sistemas financeiros é lidar com o "último dia do mês", pois meses têm 28, 29, 30 ou 31 dias.
* **No Banco:** Para evitar funções complexas de calendário direto na coluna do SQLite, padronizamos a entrada `99` na coluna `dia_recarga` da tabela `tb_cartao`.
* **Como funciona:** O número `99` é um "código universal". Quando o backend for ler essa linha no banco de dados para calcular uma previsão de saldo, ele sabe que `99` não significa o dia 99 (que não existe), mas sim um gatilho para ativar a função Node.js de "Encontrar o último dia do mês corrente".

### 3.3. Integridade Multi-Tenant (`usuario_id`)
Como vários usuários usam o mesmo banco de dados, todas as tabelas futuras (Transações, Categorias, Faturas) seguirão o mesmo padrão da `tb_cartao`: possuirão a coluna `usuario_id`.
Isso garante que, mesmo que ocorra uma falha no frontend, as queries do backend sempre possuam a trava `WHERE usuario_id = ?`, impedindo matematicamente o vazamento de dados de um usuário para outro.
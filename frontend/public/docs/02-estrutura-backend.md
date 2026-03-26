# 🔌 Estrutura do Backend: FINANÇAS

## 1. Visão Geral da Arquitetura
O backend de finanças é construído em **Node.js** utilizando o framework **Express**. A arquitetura segue o padrão de separação de responsabilidades (Rotas > Controladores > Serviços > Banco de Dados), garantindo que o código seja modular, testável e de fácil manutenção.

O banco de dados escolhido é o **SQLite**, manipulado através de queries otimizadas. Toda a comunicação com o frontend é feita via API RESTful retornando respostas em formato JSON.

---

## 2. Árvore de Diretórios (Estrutura Padrão)
Abaixo está a organização das pastas no servidor:

```text
backend/
 ├── src/
 │    ├── config/           # Configurações globais (CORS, JWT Secret, Nodemailer SMTP)
 │    ├── controllers/      # Lógica de negócio (Auth, Usuários, Cartões)
 │    ├── database/         # Conexão com SQLite e scripts de criação (schema)
 │    ├── middlewares/      # Interceptadores (Verificação de JWT, Validação de dados)
 │    ├── routes/           # Mapeamento de endpoints (URLs da API)
 │    ├── services/         # Lógicas externas (Envio de E-mail)
 │    └── utils/            # Funções auxiliares (Gerador de Token, Formatação de Data)
 ├── .env                   # Variáveis de ambiente (NUNCA comitar no Git)
 ├── server.js              # Ponto de entrada (Entrypoint) da aplicação
 └── package.json           # Dependências do Node.js
```

---

## 3. Banco de Dados (SQLite)
O banco de dados é relacional. Abaixo estão as principais tabelas que sustentam o sistema atual:

### 3.1. Tabela tb_usuario
Armazena os dados de acesso e perfil do usuário.
* `id` (PK, Auto Increment)
* `nome`, `email`, `telefone`
* `senha` (Armazenada em Hash via bcrypt)
* `status` (0 = Inativo/Pendente, 1 = Ativo)
* `token_validacao` (Código numérico de 6 dígitos para e-mail)
* `token_expiracao` (Timestamp de expiração do código)

### 3.2. Tabela tb_cartao
Armazena todos os cartões (Crédito, Débito e Vale), adaptando os campos nulos dependendo do tipo.
* `id` (PK, Auto Increment), `usuario_id` (FK)
* `nome`, `nome_responsavel`, `numero_cartao` (Apenas os 4 últimos dígitos)
* `tipo_cartao` ('C', 'D', 'V')
* `limite`, `dia_vencimento` (Aplicável para 'C')
* `saldo`, `tipo_recarga` ('FIXO', 'UTIL'), `dia_recarga` (Aplicável para 'V')
* `status` (1 = Ativo, 0 = Inativo/Excluído) -> **Soft Delete**.

---

## 4. Middlewares e Segurança

### 4.1. Autenticação (authMiddleware)
Qualquer rota privada (como listar cartões ou alterar perfil) passa por este interceptador.
1. O frontend envia o Token JWT no cabeçalho da requisição (`Authorization: Bearer <token>`).
2. O middleware verifica se o token existe e se a assinatura secreta (`JWT_SECRET`) é válida.
3. Se válido, extrai o `id` do usuário do token e injeta na requisição (`req.usuario_id`), permitindo que os controllers saibam qual usuário está fazendo a ação sem precisar enviar o ID no corpo da requisição.
4. Se inválido ou expirado, retorna `401 Unauthorized`.

### 4.2. Criptografia (bcrypt)
Senhas NUNCA são salvas em texto puro. O backend utiliza `bcrypt` com *Salt Rounds* (geralmente 10) para gerar o hash antes de salvar no banco. No login, a função `bcrypt.compare()` é usada para validar a senha digitada contra o hash.

---

## 5. Endpoints Principais (Rotas)

### 🔐 Autenticação (/api/auth)
* **POST /register**: Cria usuário (`status: 0`), gera token de 6 dígitos e dispara e-mail.
* **POST /login**: Valida credenciais. Se `status == 0`, bloqueia e reenvia e-mail. Se `1`, retorna JWT.
* **POST /validate-email**: Recebe o e-mail e o código numérico. Se bater com o banco e não estiver expirado, atualiza `status` para `1`.
* **POST /forgot-password** e **POST /reset-password**: Fluxo de recuperação de senha.

### 👤 Usuário (/api/user)
* **GET /profile**: Retorna os dados do usuário logado (usando o ID do JWT).
* **PUT /profile**: Atualiza dados cadastrais.
* **PUT /change-password**: Exige `senha_atual` e `nova_senha`. Valida a atual antes de gravar a nova.

### 💳 Cartões (/api/cartoes)
Todas as rotas abaixo exigem JWT e filtram pelo `usuario_id` injetado pelo middleware.
* **GET /**: Retorna todos os cartões onde `status = 1`.
* **POST /**: Insere um novo cartão. O Controller valida os dados obrigatórios dependendo do `tipo_cartao` enviado pelo front.
* **PUT /:id**: Edita um cartão existente verificando se ele pertence ao usuário logado.
* **DELETE /:id**: Realiza o **Soft Delete**, alterando o `status` para `0` no banco de dados.

---

## 6. Lógica de Negócio no Backend (O Número 99)
Para os cartões do tipo Vale ('V'), o frontend envia o `dia_recarga` como `99` quando o usuário seleciona "Último dia". 
O banco de dados armazena esse valor inteiro `99`. 
Futuramente, quando o cronjob (rotina automática) do backend for rodar para calcular previsões de recarga, ele fará a seguinte verificação:

```javascript
if (cartao.dia_recarga === 99) {
    if (cartao.tipo_recarga === 'FIXO') {
        // Lógica para achar o dia 28, 30 ou 31 do mês atual
    } else if (cartao.tipo_recarga === 'UTIL') {
        // Lógica para iterar de trás para frente no calendário e achar a última sexta-feira útil do mês
    }
}
```
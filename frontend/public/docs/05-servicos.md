# ⚙️ Serviços (Services): Segurança e Comunicação

## 1. Visão Geral
Para manter o backend do HALPI leve e focado nas regras de negócio financeiras (CRUD de cartões e usuários), nós delegamos tarefas complexas de segurança e comunicação para serviços especializados. 
Isso garante que o sistema siga os padrões da indústria e esteja protegido contra invasões e vazamentos de dados.

---

## 2. Autenticação e Autorização (JWT)
O **JSON Web Token (JWT)** é o coração da segurança das rotas privadas da nossa API. O HALPI funciona de forma *Stateless* (sem estado), ou seja, o servidor não guarda a sessão do usuário na memória. Toda a autorização viaja junto com a requisição.

### Como o fluxo funciona:
1. **Geração (Login):** Quando o usuário faz login com sucesso, o backend usa a biblioteca `jsonwebtoken` para gerar um *Token* criptografado usando uma chave secreta (`JWT_SECRET` armazenada no `.env`).
2. **Payload (Carga Útil):** Dentro desse token, nós escondemos o `id` do usuário.
3. **Transporte:** O frontend recebe esse token e o salva no `localStorage`. Em todas as requisições futuras (ex: buscar cartões), o frontend envia esse token no cabeçalho HTTP: `Authorization: Bearer <token>`.
4. **Validação (Middleware):** O middleware `authMiddleware` intercepta a requisição, abre o token, verifica se a assinatura confere (se não foi adulterado por hackers) e se ainda está no prazo de validade. Se tudo estiver certo, ele libera o acesso à rota.

---

## 3. Criptografia de Senhas (Bcrypt)
Armazenar senhas em texto puro no banco de dados é o maior erro de segurança que um sistema pode cometer. Para resolver isso, utilizamos a biblioteca **Bcrypt**.

### A Diferença entre Criptografia e Hashing:
* Criptografia é reversível (se você tem a chave, consegue ler a senha original).
* **Hashing (Bcrypt) NÃO é reversível.** Uma vez transformada, a senha original é destruída. Nem mesmo o administrador do banco de dados sabe a senha do usuário.

### Como aplicamos no HALPI:
* **Cadastro / Troca de Senha:** A senha digitada pelo usuário passa pela função `bcrypt.hash()`, que adiciona uma camada de "sal" (*Salt Rounds*, geralmente 10) para deixar o código gerado ainda mais caótico e imune a ataques de força bruta. O que vai para a coluna `senha` do SQLite é apenas esse hash maluco (ex: `$2b$10$w...`).
* **Login:** Quando o usuário tenta entrar, o sistema não "descriptografa" a senha do banco. Ele pega a senha que o usuário acabou de digitar, gera um *novo* hash na hora usando as mesmas regras, e compara com o hash do banco usando `bcrypt.compare()`. Se baterem, o acesso é liberado.

---

## 4. Comunicação Transacional (Nodemailer)
O **Nodemailer** é o carteiro oficial do HALPI. Ele é o módulo Node.js responsável por conectar o nosso backend a um servidor de e-mail (SMTP) real para disparar mensagens transacionais.

### 4.1. Onde ele é utilizado?
Atualmente, o Nodemailer atua em dois fluxos críticos de segurança:
1. **Validação de Conta Nova:** Evita que robôs criem contas falsas e garante que o usuário tem acesso ao e-mail informado.
2. **Recuperação de Senha:** Garante que apenas o dono do e-mail possa redefinir o acesso perdido.

### 4.2. Lógica do Código de 6 Dígitos
Em vez de enviar links complexos (que muitas vezes caem no Anti-Spam), o HALPI adota a estratégia de *OTP (One-Time Password)* moderno:
1. O backend gera um número aleatório de 6 dígitos (ex: `482 915`).
2. Esse número é salvo na tabela `tb_usuario` na coluna `token_validacao`, junto com um limite de tempo na coluna `token_expiracao` (ex: válido por 15 minutos).
3. O Nodemailer monta um template HTML amigável, insere esse código de 6 dígitos no meio, e dispara via SMTP para a caixa de entrada do usuário.
4. O usuário digita esse código na tela do frontend. O backend confere se o código bate com o do banco e se o tempo não estourou.

### 4.3. Configuração (Variáveis de Ambiente)
Para que o Nodemailer funcione, o servidor exige credenciais SMTP reais, que **nunca** devem ser "chumbadas" no código-fonte, mas sim lidas do arquivo `.env`:
* `EMAIL_HOST` (ex: smtp.gmail.com)
* `EMAIL_PORT` (ex: 465 ou 587)
* `EMAIL_USER` (o endereço de e-mail do sistema)
* `EMAIL_PASS` (a senha de aplicativo/app password gerada no provedor)
# 💻 Estrutura do Frontend: HALPI Web App

## 1. Visão Geral e Arquitetura
O frontend do HALPI é uma **Single Page Application (SPA)** desenvolvida em **React.js** com o *bundler* **Vite**. O foco principal da arquitetura é a **Separação de Responsabilidades (SoC)**, garantindo que a lógica de negócio, a interface visual (UI) e a estilização não se misturem no mesmo arquivo.

### 1.1. Árvore de Diretórios (O Padrão HALPI)
A organização da pasta `src` foi pensada para escalar sem virar um "código espaguete":

```text
frontend/src/
 ├── assets/             # Imagens, SVGs e fontes locais
 ├── components/         # Componentes globais e reutilizáveis (LayoutPrivado, ProtectedRoute)
 ├── pages/              # Módulos principais do sistema (Telas)
 │    ├── auth/          # Login, Registro, Recuperação, Validação
 │    ├── cartoes/       # Gestão de Cartões
 │    ├── dashboard/     # Resumos e Gráficos (Futuro)
 │    ├── doc/           # Módulo de Documentação
 │    └── perfil/        # Minha Conta (Edição de perfil e senha)
 ├── App.jsx             # Maestro das Rotas (React Router DOM)
 ├── index.css           # Variáveis CSS globais (Cores Neon, Fontes, Reset)
 └── main.jsx            # Entrypoint do React
```

### 1.2. O Padrão de Componentização das Páginas
Dentro da pasta `pages`, cada módulo possui seu próprio microssistema. Por exemplo, em `/cartoes`:
* **`Cartoes.jsx` (A View):** Contém *apenas* a estrutura JSX (HTML), renderização condicional e os Hooks de estado do React (`useState`, `useEffect`).
* **`js/` (A Lógica):** Arquivos como `handles.js` ou serviços de API. Aqui ficam as funções de `fetch`/`axios`, validações complexas e regras de negócio antes de enviar os dados ao servidor.
* **`style/` (O Estilo):** Arquivos como `style.js` contendo a estilização em formato de **Objetos Javascript (CSS-in-JS)**. Isso isola o estilo daquela tela, evitando que uma classe CSS quebre o layout de outra página.

---

## 2. Roteamento e Proteção (Auth Guards)
O `App.jsx` divide o sistema em dois mundos isolados usando o `react-router-dom`.

### 2.1. Rotas Públicas (`AuthLayout`)
Envolve as rotas `/login`, `/register`, `/recuperar-senha` e `/validacao-pendente`.
* **Regra:** Um usuário que já possui um Token JWT válido no `localStorage` não pode acessar a tela de Login. Se tentar, o sistema o redireciona automaticamente para o `/dashboard`.

### 2.2. Rotas Privadas e `ProtectedRoute`
Envolve `/dashboard`, `/cartoes`, `/perfil` e `/documentacao`.
* Todo o conteúdo privado é "abraçado" pelo componente `<ProtectedRoute />`. 
* **Fluxo do Guardião:** Antes de renderizar a tela solicitada, este componente checa se existe um `token` no `localStorage`. Se não existir, o usuário é bloqueado e arremessado de volta para o `/login`.
* As telas privadas são renderizadas dentro do `<LayoutPrivado />`, que injeta dinamicamente o Menu Lateral (Sidebar) e padroniza o contêiner de conteúdo.

---

## 3. Fluxo de Autenticação (Visão do Cliente)
Como o frontend lida com a segurança e a comunicação com a API:

1. **Login:** O usuário digita as credenciais. A função de *handle* faz um POST para a API.
2. **Tratamento de Erros:**
   * Se a API retornar que o e-mail não foi validado (Status 0), o frontend bloqueia o acesso e redireciona para a tela de `/validacao-pendente`, avisando que um novo e-mail foi disparado.
   * Se as credenciais estiverem erradas, um alerta do `SweetAlert2` é disparado.
3. **Armazenamento:** Se o login for bem-sucedido, o frontend recebe o Token JWT da API e o salva no `localStorage.setItem('token', token)`. Também salva dados não sensíveis do usuário (nome, id) para uso rápido na interface.
4. **Requisições Autenticadas:** A partir desse momento, toda requisição feita para rotas privadas da API deve incluir o token no cabeçalho: `headers: { Authorization: 'Bearer ' + token }`.

---

## 4. Dinâmica e Reatividade: Módulo de Cartões
O módulo de cartões é o maior exemplo de reatividade do HALPI. O formulário se reconstrói em tempo real dependendo do estado do React.

### 4.1. Renderização Condicional do Formulário
A escolha no `select` do `tipo_cartao` aciona mudanças imediatas na UI:
* **'C' (Crédito):** Habilita inputs de "Limite" e "Vencimento" (limitado de 1 a 28).
* **'D' (Débito):** Esconde os blocos financeiros, mostrando apenas Titular e Número.
* **'V' (Vale/Benefício):** Troca a label "Limite" por "Saldo" e exibe as regras de "Recarga" (Fixo ou Útil).

### 4.2. A Mágica do Checkbox "Último Dia" (A Regra do 99)
Para lidar com a complexidade de meses que terminam em dias variáveis (28, 30, 31):
1. Quando o usuário marca o checkbox "Último do Mês" / "Último Dia Útil".
2. O React atualiza o estado `diaRecarga` para a string mágica `'99'`.
3. O input numérico é imediatamente bloqueado (`disabled={true}`, `opacity: 0.5`) para impedir que o usuário digite outro valor junto.
4. Na listagem de cartões criados, a renderização lê o `99` e, no lugar de imprimir "Dia 99", o frontend traduz o texto dinamicamente para "Último do mês" ou "Último dia útil", garantindo uma experiência limpa para o usuário, enquanto o backend recebe o número `99` para fazer os cálculos no banco de dados.

### 4.3. Listagem e Ícones Inteligentes
Dentro do método `.map()` que renderiza a lista de cartões, o frontend usa funções auxiliares para formatar os dados:
* Ícones (🍔/🛒 para Vale, 💳 para Crédito/Débito) são escolhidos via operador ternário.
* Textos como "CRÉDITO • Limite: R$ X" ou "VALE • Saldo: R$ Y" são montados condicionalmente baseados na propriedade `tipo_cartao` que volta da API.

---

## 5. UI/UX e Bibliotecas Auxiliares
* **Animações:** `framer-motion` é utilizado em botões (efeitos de *hover*), transições de rotas e abertura de modais (como o modal desta própria documentação), trazendo suavidade ao sistema.
* **Feedbacks:** Substituímos os `alert()` nativos do navegador pelo `sweetalert2`, garantindo que mensagens de erro, sucesso ou confirmação sigam a paleta de cores escura e neon do sistema.
* **CSS Global:** O arquivo `index.css` guarda a raiz do tema na tag `:root`. Cores como `var(--neon-green)` ou `var(--bg-fundo)` são chamadas dentro dos arquivos `style.js`. Isso prepara o sistema para, no futuro, implementar um botão de "Modo Claro / Escuro" apenas trocando os valores dessas variáveis globais.
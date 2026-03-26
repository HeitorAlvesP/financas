# 🗺️ Visão Geral do Sistema: HALPI

## 1. O que é o HALPI?
O **HALPI** é um sistema web de controle financeiro pessoal e gestão de benefícios. Ele foi projetado para oferecer uma interface moderna, rápida e intuitiva, permitindo que o usuário tenha total clareza sobre seus gastos, limites de crédito e saldos de vale-alimentação/refeição.

## 2. Objetivos Principais
- Centralizar a gestão de múltiplos cartões (Crédito, Débito e Benefícios).
- Prever faturas e datas de recarga de forma automatizada.
- Fornecer um Dashboard claro com o resumo financeiro do mês.
- Garantir a segurança dos dados do usuário através de autenticação moderna.

## 3. Módulos Atuais (MVP)
Atualmente, o sistema conta com os seguintes módulos funcionais:
- **Autenticação:** Login, Cadastro e Recuperação de Senha (com envio de código via e-mail).
- **Gestão de Perfil:** Atualização de dados cadastrais do usuário.
- **Gestão de Cartões:** - Cadastro, edição, inativação e listagem.
  - Suporte a regras específicas para Cartões de Crédito (Limite e Vencimento) e Cartões de Benefício/VA/VR (Saldo, Tipo de Recarga e Dia Útil/Fixo).

## 4. Stack Tecnológico
O sistema adota uma arquitetura separada (Client-Server):
- **Frontend:** React.js (com Vite), React Router DOM para navegação e Framer Motion para animações de interface.
- **Backend:** Node.js com Express.
- **Banco de Dados:** SQLite (arquitetura leve e relacional).
- **Segurança:** JWT (JSON Web Tokens) para controle de sessão.

## 5. Roadmap (Próximos Passos)
O que está planejado para o futuro do HALPI:
- [ ] Módulo de Lançamento de Transações (Entradas e Saídas).
- [ ] Módulo de Categorias personalizáveis.
- [ ] Dashboard interativo com gráficos de consumo.
- [ ] Módulo de Configurações gerais do sistema.
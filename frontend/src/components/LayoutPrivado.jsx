import { Outlet } from 'react-router-dom';
import MenuLateral from './MenuLateral';

function LayoutPrivado() {
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <MenuLateral />
      <main style={mainContentStyle}>
        <Outlet />
      </main>
    </div>
  );
}

const mainContentStyle = {
  marginLeft: '200px', // Deve ser igual à nova largura do menu
  flex: 1,
  height: '100vh',
  padding: '30px',
  backgroundColor: 'var(--bg-dark)',
  overflowY: 'auto', // Só permite scroll dentro do conteúdo se os dados forem muitos
  boxSizing: 'border-box'
};

export default LayoutPrivado;
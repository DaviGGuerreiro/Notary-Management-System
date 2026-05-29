import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Users } from './pages/Users';
import { ServicesList } from './pages/ServicesList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota pública (Fora do Layout) */}
        <Route path="/" element={<Login />} />
        {/* Rotas privadas (Dentro do Layout com Menu) */}
        <Route element={<Layout />}>
          <Route path="/usuarios" element={<Users />} />
          <Route path="/servicos" element={<ServicesList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
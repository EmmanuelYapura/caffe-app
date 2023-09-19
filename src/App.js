import './App.css';
import { FormLogin } from './componentes/FormLogin';
import { RegistroLogin } from './componentes/RegristroLogin';
import { Dashboard } from './componentes/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './componentes/Navbar';
import { Home } from './componentes/Home';
import { PrivateRoute } from './componentes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path='/' element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path='login' element={<FormLogin />} />
            <Route path='register' element={<RegistroLogin />} />
            <Route path='dashboard' element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;

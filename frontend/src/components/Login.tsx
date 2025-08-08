import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Variável de estado para a mensagem de erro
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Limpa a mensagem de erro a cada tentativa

    try {
      const response = await api.post('/auth/login', { email, password });
      
      localStorage.setItem('token', response.data.access_token);

      navigate('/tasks');
    } catch (error: any) {
      if (error.response) {
        // Exibe a mensagem de erro da API abaixo do campo de senha
        setErrorMessage(error.response.data.message || 'Credenciais inválidas.');
      } else {
        console.error('Erro de rede:', error);
        setErrorMessage('Erro de rede. Tente novamente.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        {/* Renderização condicional da mensagem de erro */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button type="submit">Entrar</button>
      </form>
      <p>Não tem uma conta? <a href="/register">Registre-se aqui</a>.</p>
    </div>
  );
};

export default Login;
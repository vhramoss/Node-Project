import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../App.css';

const Register = () => {
  const [name, setName] = useState(''); // NOVO: Estado para o nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // NOVO: Incluir o 'name' na requisição POST
      await api.post('/users', { name, email, password });
      
      alert('Registro realizado com sucesso! Faça login.');
      navigate('/login');
    } catch (error: any) {
      if (error.response) {
        alert(`Erro no registro: ${error.response.data.message}`);
      } else {
        console.error('Erro de rede:', error);
        alert('Erro de rede. Tente novamente.');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        {/* NOVO: Campo de entrada para o nome */}
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Registrar</button>
      </form>
      <p>Já tem uma conta? <a href="/login">Faça login aqui</a>.</p>
    </div>
  );
};

export default Register;
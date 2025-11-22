import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // <-- use sua instância configurada!
import { motion } from 'framer-motion';
import { FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/auth/login', formData);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);

      navigate('/admin/dashboard');
    } catch (err) {
      console.error(err);
      setError('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue-900 via-dark-blue-800 to-dark-blue-700 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-dark-blue-700/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Painel <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Admin</span>
        </h2>

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Usuário</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
                className="w-full bg-dark-blue-800 text-white px-10 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="admin"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2 font-medium">Senha</label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full bg-dark-blue-800 text-white px-10 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 focus:outline-none transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Entrar
          </button>
        </form>

        <button
          onClick={() => navigate('/')}
          className="w-full mt-4 text-gray-400 hover:text-white transition-colors"
        >
          Voltar ao portfólio
        </button>
      </motion.div>
    </div>
  );
};

export default Login;

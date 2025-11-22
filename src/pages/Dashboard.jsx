import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

import api, { projectService } from '../services/api';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    githubUrl: '',
    demoUrl: '',
    technologies: ''
  });

  const navigate = useNavigate();

  // Autenticação + carregar projetos
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    loadProjects();
  }, [navigate]);

  // Buscar todos os projetos
  const loadProjects = async () => {
    try {
      const data = await projectService.getAllProjects();
      setProjects(data);
    } catch (error) {
      console.error('Erro ao carregar projetos:', error);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/admin/login');
  };

  // Criar / Editar projeto
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject.id}`, formData);
      } else {
        await projectService.createProject(formData);
      }

      loadProjects();
      closeModal();
    } catch (error) {
      console.error('Erro ao salvar projeto:', error);
    }
  };

  // Abrir modal de edição
  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || '',
      githubUrl: project.githubUrl || '',
      demoUrl: project.demoUrl || '',
      technologies: project.technologies
    });
    setShowModal(true);
  };

  // Deletar projeto
  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este projeto?')) {
      try {
        await api.delete(`/projects/${id}`);
        loadProjects();
      } catch (error) {
        console.error('Erro ao deletar projeto:', error);
      }
    }
  };

  // Modal novo projeto
  const openNewProjectModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      githubUrl: '',
      demoUrl: '',
      technologies: ''
    });
    setShowModal(true);
  };

  // Fechar modal
  const closeModal = () => {
    setShowModal(false);
    setEditingProject(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-blue-900 via-dark-blue-800 to-dark-blue-700">
      
      {/* NAVBAR */}
      <nav className="bg-dark-blue-900/95 backdrop-blur-sm border-b border-blue-500/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Painel Admin</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <FaSignOutAlt />
            Sair
          </button>
        </div>
      </nav>

      {/* CONTEÚDO */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-white">Meus Projetos</h2>
          <button
            onClick={openNewProjectModal}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300"
          >
            <FaPlus />
            Novo Projeto
          </button>
        </div>

        {/* LISTA DE PROJETOS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              className="bg-dark-blue-700/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20"
            >
              {project.imageUrl && (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>

              <p className="text-gray-300 mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg hover:bg-blue-500/30 transition-colors"
                >
                  <FaEdit />
                  Editar
                </button>

                <button
                  onClick={() => handleDelete(project.id)}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-500/20 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors"
                >
                  <FaTrash />
                  Deletar
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-blue-700 rounded-2xl p-8 border border-blue-500/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingProject ? 'Editar Projeto' : 'Novo Projeto'}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">

                {/* Título */}
                <div>
                  <label className="block text-gray-300 mb-2">Título</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none"
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label className="block text-gray-300 mb-2">Descrição</label>
                  <textarea
                    rows="4"
                    required
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none resize-none"
                  ></textarea>
                </div>

                {/* URLs */}
                <div>
                  <label className="block text-gray-300 mb-2">URL da Imagem</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imageUrl: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">URL do GitHub</label>
                  <input
                    type="url"
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, githubUrl: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">URL da Demo</label>
                  <input
                    type="url"
                    value={formData.demoUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, demoUrl: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none"
                  />
                </div>

                {/* Tecnologias */}
                <div>
                  <label className="block text-gray-300 mb-2">
                    Tecnologias (separadas por vírgula)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Java, Spring Boot, React"
                    value={formData.technologies}
                    onChange={(e) =>
                      setFormData({ ...formData, technologies: e.target.value })
                    }
                    className="w-full bg-dark-blue-800 text-white px-4 py-3 rounded-lg border border-blue-500/20 focus:border-blue-400 outline-none"
                  />
                </div>
              </div>

              {/* BOTÕES */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
                >
                  {editingProject ? 'Atualizar' : 'Criar'}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

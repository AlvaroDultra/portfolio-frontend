import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projectService } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectService.getAllProjects();
        setProjects(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar projetos:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects" className="min-h-screen bg-gradient-to-br from-black via-dark-blue-900 to-dark-blue-800 py-20 flex items-center justify-center">
        <div className="text-white text-2xl">Carregando projetos...</div>
      </section>
    );
  }

  return (
    <section id="projects" className="min-h-screen bg-gradient-to-br from-black via-dark-blue-900 to-dark-blue-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Alguns <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Projetos Meus</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        {projects.length === 0 ? (
          <div className="text-center text-gray-400 text-xl">Nenhum projeto encontrado.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-dark-blue-700/50 backdrop-blur-lg rounded-xl overflow-hidden border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20"
              >
                {project.imageUrl && (
                  <div className="h-48 overflow-hidden bg-dark-blue-800">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.split(',').map((tech, i) => (
                        <span key={i} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                        <FaGithub size={20} />
                        <span>Código</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300">
                        <FaExternalLinkAlt size={18} />
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
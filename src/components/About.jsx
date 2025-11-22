import { motion } from 'framer-motion';
import { FaReact, FaJava, FaDocker, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { SiSpring, SiPostgresql, SiTailwindcss } from 'react-icons/si';

const About = () => {
  const skills = [
    { name: 'Java', icon: <FaJava size={40} />, color: 'text-orange-500' },
    { name: 'Spring Boot', icon: <SiSpring size={40} />, color: 'text-green-500' },
    { name: 'React', icon: <FaReact size={40} />, color: 'text-blue-400' },
    { name: 'PostgreSQL', icon: <SiPostgresql size={40} />, color: 'text-blue-600' },
    { name: 'Docker', icon: <FaDocker size={40} />, color: 'text-blue-500' },
    { name: 'Git', icon: <FaGitAlt size={40} />, color: 'text-orange-600' },
    { name: 'TailwindCSS', icon: <SiTailwindcss size={40} />, color: 'text-cyan-400' },
  ];

  return (
    <section id="about" className="min-h-screen bg-gradient-to-br from-dark-blue-800 via-dark-blue-900 to-black py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Sobre <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Mim</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="bg-dark-blue-700/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-4">Desenvolvedor Full Stack</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Sou um desenvolvedor apaixonado por tecnologia, focado em criar soluções eficientes e escaláveis. 
                Com experiência em desenvolvimento full stack, trabalho tanto no backend com Java e Spring Boot, 
                quanto no frontend com React e tecnologias modernas.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Adoro enfrentar desafios complexos e transformá-los em aplicações funcionais e elegantes. 
                Estou sempre em busca de aprender novas tecnologias e aprimorar minhas habilidades.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Meu foco é entregar projetos de alta qualidade que realmente fazem a diferença para os usuários.
              </p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Tecnologias & Ferramentas</h3>
            <div className="grid grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="bg-dark-blue-700/50 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20 flex flex-col items-center justify-center gap-3 hover:border-blue-400/50 transition-all duration-300"
                >
                  <div className={skill.color}>{skill.icon}</div>
                  <span className="text-gray-300 text-sm font-medium text-center">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
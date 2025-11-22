import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaPhone } from 'react-icons/fa';

const Contact = () => {
  const contactMethods = [
    {
      icon: <FaWhatsapp size={32} />,
      title: 'WhatsApp',
      info: '(71) 99981-2530',
      link: 'https://wa.me/5571999812530',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaEnvelope size={32} />,
      title: 'Email',
      info: 'alvarodultra.dev@gmail.com',
      link: 'mailto:alvarodultra.dev@gmail.com',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaLinkedin size={32} />,
      title: 'LinkedIn',
      info: '/alvarodultra',
      link: 'https://www.linkedin.com/in/alvarodultra/',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <FaGithub size={32} />,
      title: 'GitHub',
      info: '@AlvaroDultra',
      link: 'https://github.com/AlvaroDultra',
      color: 'from-gray-700 to-gray-800'
    }
  ];

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-br from-dark-blue-800 via-dark-blue-900 to-black py-20 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Entre em <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Estou sempre aberto a novos projetos e oportunidades. Vamos conversar!
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-dark-blue-700/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 group"
              >
                <div className={`bg-gradient-to-r ${method.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {method.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{method.title}</h3>
                <p className="text-gray-300 text-lg">{method.info}</p>
              </motion.a>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="bg-dark-blue-700/50 backdrop-blur-lg rounded-2xl p-8 border border-blue-500/20 shadow-xl text-center">
            <div className="flex items-center justify-center gap-3 text-gray-300 mb-4">
              <FaMapMarkerAlt size={24} className="text-blue-400" />
              <p className="text-lg">
                <span className="font-semibold text-white">Localização:</span> Lauro de Freitas, Bahia, Brasil
              </p>
            </div>
            <p className="text-gray-400">
              Disponível para projetos remotos e presenciais na região
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
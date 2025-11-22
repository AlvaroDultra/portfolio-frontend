import { FaGithub, FaLinkedin, FaWhatsapp, FaHeart } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-blue-900 border-t border-blue-500/20 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-300 flex items-center gap-2">
              Desenvolvido com <FaHeart className="text-red-500" /> por{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent font-semibold">
                Álvaro Dultra
              </span>
            </p>
            <p className="text-gray-500 text-sm mt-1">© {currentYear} Todos os direitos reservados</p>
          </div>

          <div className="flex gap-4">
            <a href="https://github.com/AlvaroDultra" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaGithub size={24} />
            </a>
            <a href="https://www.linkedin.com/in/alvarodultra/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaLinkedin size={24} />
            </a>
            <a href="https://wa.me/5571999812530" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
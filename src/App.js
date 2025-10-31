import React, { useState, useEffect } from 'react';
import { 
  Home, 
  User, 
  LogIn, 
  UserPlus, 
  Search, 
  Code, 
  CircuitBoard, 
  Plus, 
  Eye, 
  Edit3, 
  Trash2,
  Upload,
  Video,
  Image as ImageIcon,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Shield,
  Star,
  BookOpen,
  Zap,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [activeCategory, setActiveCategory] = useState('all');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data for tutorials with professional content
  const [tutorials, setTutorials] = useState([
    {
      id: 1,
      title: "Desarrollo Web Moderno con React 18",
      description: "Aprende las últimas características de React 18, incluyendo Suspense, Concurrent Rendering y Server Components.",
      category: "programacion",
      author: "Miguel Angel Buelvas Ortega",
      date: "2025-10-31",
      image: "https://placehold.co/600x400/1e40af/ffffff?text=React+18+Development",
      videoUrl: "https://example.com/react18",
      content: "Contenido detallado sobre React 18...",
      difficulty: "Avanzado",
      duration: "45 min",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Sistemas Embebidos con ESP32",
      description: "Domina el desarrollo de sistemas IoT utilizando el microcontrolador ESP32 y su ecosistema completo.",
      category: "electronica",
      author: "Miguel Angel Buelvas Ortega",
      date: "2025-10-31",
      image: "https://placehold.co/600x400/dc2626/ffffff?text=ESP32+IoT+Systems",
      videoUrl: "https://example.com/esp32",
      content: "Contenido detallado sobre ESP32...",
      difficulty: "Intermedio",
      duration: "60 min",
      tags: ["ESP32", "IoT", "Microcontroladores"]
    },
    {
      id: 3,
      title: "Arquitectura de Microservicios",
      description: "Implementa patrones de diseño modernos para construir aplicaciones escalables y mantenibles.",
      category: "programacion",
      author: "Miguel Angel Buelvas Ortega",
      date: "2025-10-31",
      image: "https://placehold.co/600x400/059669/ffffff?text=Microservices+Architecture",
      videoUrl: "https://example.com/microservices",
      content: "Contenido detallado sobre microservicios...",
      difficulty: "Avanzado",
      duration: "90 min",
      tags: ["Arquitectura", "Backend", "DevOps"]
    },
    {
      id: 4,
      title: "Diseño de PCB Profesional",
      description: "Aprende a diseñar placas de circuito impreso profesionales utilizando herramientas industriales.",
      category: "electronica",
      author: "Miguel Angel Buelvas Ortega",
      date: "2025-10-31",
      image: "https://placehold.co/600x400/7c3aed/ffffff?text=Professional+PCB+Design",
      videoUrl: "https://example.com/pcb",
      content: "Contenido detallado sobre PCB...",
      difficulty: "Intermedio",
      duration: "75 min",
      tags: ["PCB", "Hardware", "Diseño"]
    }
  ]);

  const [newTutorial, setNewTutorial] = useState({
    title: '',
    description: '',
    category: 'programacion',
    image: '',
    videoUrl: '',
    content: '',
    difficulty: 'Principiante',
    duration: '',
    tags: ''
  });

  // Simular autenticación
  const handleLogin = (email, password) => {
    setIsAuthenticated(true);
    setUser({ name: 'Miguel Angel Buelvas Ortega', email: email, avatar: 'https://placehold.co/100x100/3b82f6/ffffff?text=MB' });
    setShowAuthModal(false);
  };

  const handleRegister = (name, email, password) => {
    setIsAuthenticated(true);
    setUser({ name: name, email: email, avatar: 'https://placehold.co/100x100/10b981/ffffff?text=' + name.charAt(0) });
    setShowAuthModal(false);
  };

  const handleGoogleLogin = () => {
    setIsAuthenticated(true);
    setUser({ 
      name: 'Miguel Angel Buelvas Ortega', 
      email: 'shaka21virgo@hotmail.com', 
      avatar: 'https://placehold.co/100x100/ef4444/ffffff?text=MB' 
    });
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const handleCreateTutorial = () => {
    if (newTutorial.title && newTutorial.description) {
      const tutorial = {
        id: tutorials.length + 1,
        ...newTutorial,
        author: user.name,
        date: new Date().toISOString().split('T')[0],
        tags: newTutorial.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setTutorials([...tutorials, tutorial]);
      setNewTutorial({
        title: '',
        description: '',
        category: 'programacion',
        image: '',
        videoUrl: '',
        content: '',
        difficulty: 'Principiante',
        duration: '',
        tags: ''
      });
      setCurrentPage('home');
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = 
      tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || tutorial.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const AuthModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Code className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MB NebulaCode</span>
          </div>
          <button 
            onClick={() => setShowAuthModal(false)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full p-2 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        {authMode === 'login' ? (
          <LoginForm onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />
        ) : (
          <RegisterForm onRegister={handleRegister} />
        )}
        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
            className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            {authMode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );

  const LoginForm = ({ onLogin, onGoogleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      onLogin(email, password);
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Corporativo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="tu@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña Segura</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
        >
          Iniciar Sesión Segura
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500 font-medium">O métodos alternativos</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-red-600 text-white py-3 px-4 rounded-xl hover:bg-red-700 transition-all font-semibold shadow-md"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </button>
      </form>
    );
  };

  const RegisterForm = ({ onRegister }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        onRegister(name, email, password);
      }
    };
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Miguel Bermúdez"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Corporativo</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="miguel@empresa.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña Segura</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Confirmar Contraseña</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="••••••••"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl"
        >
          Crear Cuenta Profesional
        </button>
      </form>
    );
  };

  const Navbar = () => (
    <nav className={`sticky top-0 z-40 border-b transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-md py-2' 
        : 'bg-white/80 backdrop-blur-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className={`font-bold transition-all ${
              scrolled ? 'text-lg' : 'text-xl'
            } bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              MB NebulaCode
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Home size={16} />
              <span>Inicio</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('programacion');
                setCurrentPage('resources');
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                (currentPage === 'resources' && activeCategory === 'programacion') ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
              }`}
            >
              <Code size={16} />
              <span>Programación</span>
            </button>
            <button
              onClick={() => {
                setActiveCategory('electronica');
                setCurrentPage('resources');
              }}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                (currentPage === 'resources' && activeCategory === 'electronica') ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              <CircuitBoard size={16} />
              <span>Electrónica</span>
            </button>
            {isAuthenticated && (
              <button
                onClick={() => setCurrentPage('create')}
                className="flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                <Plus size={16} />
                <span>Crear Recurso</span>
              </button>
            )}
          </div>
          {/* Auth and Search */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent w-48 transition-all"
              />
            </div>
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border-2 border-blue-200"
                />
                <button
                  onClick={handleLogout}
                  className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  <LogIn size={16} className="rotate-180" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('login');
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md hover:shadow-lg"
              >
                <User size={16} />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </button>
            )}
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-all"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2 mb-4">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  currentPage === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                <Home size={18} />
                <span>Inicio</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('programacion');
                  setCurrentPage('resources');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  (currentPage === 'resources' && activeCategory === 'programacion') ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                }`}
              >
                <Code size={18} />
                <span>Programación</span>
              </button>
              <button
                onClick={() => {
                  setActiveCategory('electronica');
                  setCurrentPage('resources');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  (currentPage === 'resources' && activeCategory === 'electronica') ? 'text-purple-600 bg-purple-50' : 'text-gray-700'
                }`}
              >
                <CircuitBoard size={18} />
                <span>Electrónica</span>
              </button>
              {isAuthenticated && (
                <button
                  onClick={() => {
                    setCurrentPage('create');
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-green-600 to-blue-600"
                >
                  <Plus size={18} />
                  <span>Crear Recurso</span>
                </button>
              )}
            </div>
            <div className="mt-4 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar recursos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        )}
      </div>
    </nav>
  );

  const HomePage = () => (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full">
          <Star className="h-4 w-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Plataforma Profesional de Aprendizaje</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Domina la
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Tecnología</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
          MB NebulaCode es tu plataforma integral para dominar programación y electrónica. 
          Recursos profesionales, tutoriales prácticos y una comunidad de expertos esperándote.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => setCurrentPage('resources')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <BookOpen size={20} />
            Explorar Recursos
          </button>
          {isAuthenticated && (
            <button
              onClick={() => setCurrentPage('create')}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-semibold text-lg shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus size={20} />
              Crear Contenido
            </button>
          )}
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Code className="h-6 w-6 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
          <div className="text-gray-600">Recursos de Programación</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <CircuitBoard className="h-6 w-6 text-purple-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">35+</div>
          <div className="text-gray-600">Proyectos Electrónicos</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <User className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">1K+</div>
          <div className="text-gray-600">Profesionales Activos</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Zap className="h-6 w-6 text-orange-600" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
          <div className="text-gray-600">Soporte Técnico</div>
        </div>
      </div>
      {/* Featured Resources */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recursos Destacados</h2>
          <button
            onClick={() => setCurrentPage('resources')}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
          >
            Ver todos <ChevronDown size={16} className="rotate-90" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTutorials.slice(0, 3).map((tutorial) => (
            <ResourceCard key={tutorial.id} tutorial={tutorial} onViewDetail={setCurrentPage} />
          ))}
        </div>
      </div>
      {/* Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <Code className="h-32 w-32" />
          </div>
          <Code className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Programación Avanzada</h3>
          <p className="text-gray-700 mb-6">
            Desde fundamentos hasta arquitecturas empresariales. 
            Frameworks modernos, patrones de diseño y mejores prácticas.
          </p>
          <button
            onClick={() => {
              setActiveCategory('programacion');
              setCurrentPage('resources');
            }}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
          >
            Explorar temas profesionales
            <ExternalLink size={16} />
          </button>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-4 right-4 opacity-10">
            <CircuitBoard className="h-32 w-32" />
          </div>
          <CircuitBoard className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Electrónica Profesional</h3>
          <p className="text-gray-700 mb-6">
            Sistemas embebidos, IoT, diseño de PCB y automatización industrial.
            Proyectos reales con componentes profesionales.
          </p>
          <button
            onClick={() => {
              setActiveCategory('electronica');
              setCurrentPage('resources');
            }}
            className="text-purple-600 hover:text-purple-800 font-semibold flex items-center gap-2"
          >
            Explorar proyectos avanzados
            <ExternalLink size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const ResourceCard = ({ tutorial, onViewDetail }) => (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div className="relative">
        <img
          src={tutorial.image}
          alt={tutorial.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            tutorial.category === 'programacion' 
              ? 'bg-gradient-to-r from-blue-600 to-blue-800' 
              : 'bg-gradient-to-r from-purple-600 to-purple-800'
          }`}>
            {tutorial.category === 'programacion' ? 'Programación' : 'Electrónica'}
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
          <span className="text-xs font-medium text-gray-700">{tutorial.duration}</span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            tutorial.difficulty === 'Principiante' ? 'bg-green-100 text-green-800' :
            tutorial.difficulty === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {tutorial.difficulty}
          </span>
          <span className="text-sm text-gray-500">{tutorial.date}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {tutorial.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{tutorial.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {tutorial.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Por {tutorial.author}</span>
          <button
            onClick={() => onViewDetail(`tutorial-${tutorial.id}`)}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium group/button"
          >
            <Eye size={16} />
            <span className="group-hover/button:underline">Ver recurso</span>
          </button>
        </div>
      </div>
    </div>
  );

  const ResourcesPage = () => {
    const categories = [
      { id: 'all', name: 'Todos', icon: BookOpen },
      { id: 'programacion', name: 'Programación', icon: Code },
      { id: 'electronica', name: 'Electrónica', icon: CircuitBoard }
    ];
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {activeCategory === 'all' ? 'Todos los Recursos' : 
             activeCategory === 'programacion' ? 'Recursos de Programación' : 
             'Recursos de Electrónica'}
          </h1>
          <p className="text-gray-600">
            {filteredTutorials.length} recursos disponibles para tu aprendizaje profesional
          </p>
        </div>
        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <IconComponent size={16} />
                {category.name}
              </button>
            );
          })}
        </div>
        {/* Search Bar */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Buscar por título, descripción o etiquetas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        {/* Resources Grid */}
        {filteredTutorials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTutorials.map((tutorial) => (
              <ResourceCard key={tutorial.id} tutorial={tutorial} onViewDetail={setCurrentPage} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron recursos</h3>
            <p className="text-gray-600 mb-6">Intenta con diferentes términos de búsqueda</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setActiveCategory('all');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Ver todos los recursos
            </button>
          </div>
        )}
      </div>
    );
  };

  const TutorialDetailPage = ({ tutorialId }) => {
    const tutorial = tutorials.find(t => t.id === parseInt(tutorialId));
    if (!tutorial) {
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <X className="h-12 w-12 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Recurso no encontrado</h3>
            <p className="text-gray-600 mb-6">El recurso que buscas no está disponible</p>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => setCurrentPage('resources')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2"
        >
          ← Volver a recursos
        </button>
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <img
            src={tutorial.image}
            alt={tutorial.title}
            className="w-full h-96 object-cover"
          />
          <div className="p-8">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold text-white ${
                tutorial.category === 'programacion' 
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800' 
                  : 'bg-gradient-to-r from-purple-600 to-purple-800'
              }`}>
                {tutorial.category === 'programacion' ? 'Programación' : 'Electrónica'}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                tutorial.difficulty === 'Principiante' ? 'bg-green-100 text-green-800' :
                tutorial.difficulty === 'Intermedio' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {tutorial.difficulty}
              </span>
              <span className="text-gray-500">{tutorial.date}</span>
              <span className="text-gray-500">{tutorial.duration}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{tutorial.title}</h1>
            <p className="text-xl text-gray-600 mb-8">{tutorial.description}</p>
            <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={tutorial.author === user?.name && user?.avatar ? user.avatar : 'https://placehold.co/50x50/3b82f6/ffffff?text=' + tutorial.author.charAt(0)}
                  alt={tutorial.author}
                  className="w-12 h-12 rounded-full object-cover border-2 border-blue-200"
                />
                <div>
                  <div className="font-semibold text-gray-900">{tutorial.author}</div>
                  <div className="text-sm text-gray-500">Experto en {tutorial.category === 'programacion' ? 'Desarrollo' : 'Electrónica'}</div>
                </div>
              </div>
              {tutorial.videoUrl && (
                <a
                  href={tutorial.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  <Video size={20} />
                  Ver tutorial en video
                </a>
              )}
            </div>
            <div className="prose max-w-none mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contenido del Recurso</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {tutorial.content}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-8">
              {tutorial.tags.map((tag, index) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      </div>
    );
  };

  const CreateTutorialPage = () => (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg flex items-center justify-center">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Recurso</h1>
        </div>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Título del Recurso</label>
            <input
              type="text"
              value={newTutorial.title}
              onChange={(e) => setNewTutorial({...newTutorial, title: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ej: Desarrollo de APIs RESTful con Node.js"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción Breve</label>
            <textarea
              value={newTutorial.description}
              onChange={(e) => setNewTutorial({...newTutorial, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe brevemente qué cubrirá este recurso..."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría</label>
              <select
                value={newTutorial.category}
                onChange={(e) => setNewTutorial({...newTutorial, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="programacion">Programación</option>
                <option value="electronica">Electrónica</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nivel de Dificultad</label>
              <select
                value={newTutorial.difficulty}
                onChange={(e) => setNewTutorial({...newTutorial, difficulty: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duración Estimada</label>
              <input
                type="text"
                value={newTutorial.duration}
                onChange={(e) => setNewTutorial({...newTutorial, duration: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Ej: 45 min"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Etiquetas (separadas por comas)</label>
              <input
                type="text"
                value={newTutorial.tags}
                onChange={(e) => setNewTutorial({...newTutorial, tags: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="React, JavaScript, Frontend"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL de la Imagen Principal</label>
            <div className="flex gap-3">
              <input
                type="text"
                value={newTutorial.image}
                onChange={(e) => setNewTutorial({...newTutorial, image: e.target.value})}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen-recurso.jpg"
              />
              <button className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-xl flex items-center gap-2 transition-colors">
                <Upload size={18} />
                Subir
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">URL del Video Tutorial (opcional)</label>
            <input
              type="text"
              value={newTutorial.videoUrl}
              onChange={(e) => setNewTutorial({...newTutorial, videoUrl: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://youtube.com/watch?v=..."
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contenido Detallado</label>
            <textarea
              value={newTutorial.content}
              onChange={(e) => setNewTutorial({...newTutorial, content: e.target.value})}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
              placeholder="Escribe el contenido completo y detallado del recurso aquí..."
            />
          </div>
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={handleCreateTutorial}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-green-700 hover:to-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Shield size={18} />
              Publicar Recurso Seguro
            </button>
            <button
              onClick={() => setCurrentPage('home')}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-300 transition-all font-semibold flex items-center gap-2"
            >
              <X size={18} />
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navbar />
      {showAuthModal && <AuthModal />}
      <main>
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'resources' && <ResourcesPage />}
        {currentPage.startsWith('tutorial-') && (
          <TutorialDetailPage tutorialId={currentPage.split('-')[1]} />
        )}
        {currentPage === 'create' && isAuthenticated && <CreateTutorialPage />}
        {currentPage === 'create' && !isAuthenticated && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="h-10 w-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceso Restringido</h2>
              <p className="text-gray-600 mb-8">
                Debes iniciar sesión para crear y publicar recursos en MB NebulaCode.
              </p>
              <button
                onClick={() => {
                  setShowAuthModal(true);
                  setAuthMode('login');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
              >
                Iniciar Sesión Ahora
              </button>
            </div>
          </div>
        )}
      </main>
      <footer className="bg-gray-900 text-white py-16 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MB NebulaCode
                </span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Plataforma profesional dedicada al aprendizaje avanzado en programación y electrónica. 
                Creamos contenido de alta calidad para desarrolladores y profesionales de la tecnología.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Recursos</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Programación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Electrónica</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutoriales</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Proyectos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-6">Soporte</h3>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentación</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-6 text-gray-400 mb-4 md:mb-0">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>shaka21virgo@hotmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+57 320 423 6962</span>
              </div>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              &copy; 2025 Miguel Angel Buelvas MB NebulaCode. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

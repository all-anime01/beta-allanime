import { useState, useEffect } from 'react';
import { Play, Info, ChevronDown, X, Search, Menu } from 'lucide-react';

interface Anime {
  id: string;
  title: string;
  poster_url: string;
  description: string;
  genres: string[];
  rating: number;
}

function Index() {
  const [featuredAnime, setFeaturedAnime] = useState<Anime | null>(null);
  const [recentlyAdded, setRecentlyAdded] = useState<Anime[]>([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const fetchAnimes = async () => {
      const { data: animes } = await supabase
        .from('animes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(12);

      if (animes && animes.length > 0) {
        setFeaturedAnime(animes[0]);
        setRecentlyAdded(animes.slice(1));
      }
    };

    fetchAnimes();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;
  };

  if (!featuredAnime) return null;

  return (
    <div className="min-h-screen bg-[#141414] text-white font-netflix">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isHeaderScrolled
            ? 'bg-[#dc2d22]'
            : 'bg-gradient-to-b from-black/30 to-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-12 py-4">
          <div className="flex items-center gap-4 md:gap-12">
            <img
              src="https://all-anime.net/image/Logo/logo-all-anime-min.svg"
              alt="All Anime"
              className="w-16 md:w-24"
            />
            <nav className="hidden md:flex gap-6">
              <a
                href="#inicio"
                onClick={handleNavigation}
                className="text-sm hover:text-gray-300"
              >
                Inicio
              </a>
              <a
                href="#explorar"
                onClick={handleNavigation}
                className="text-sm hover:text-gray-300"
              >
                Explorar
              </a>
              <a
                href="#peliculas"
                onClick={handleNavigation}
                className="text-sm hover:text-gray-300"
              >
                Películas
              </a>
            </nav>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4 relative">
            <div
              className={`relative flex items-center transition-all duration-300 ${
                isSearchFocused ? 'bg-[#1f1f1f]' : 'bg-[#1f1f1f]/50'
              } rounded-full overflow-hidden`}
            >
              <Search className="w-5 h-5 ml-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => {
                  setIsSearchFocused(false);
                  setTimeout(() => setShowSearchResults(false), 200);
                }}
                className="w-full py-2 px-3 bg-transparent text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 z-50 transition-transform duration-300 ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-4 p-8">
            <a
              href="#inicio"
              onClick={(e) => {
                handleNavigation(e);
                setIsMobileMenuOpen(false);
              }}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#explorar"
              onClick={(e) => {
                handleNavigation(e);
                setIsMobileMenuOpen(false);
              }}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Explorar
            </a>
            <a
              href="#peliculas"
              onClick={(e) => {
                handleNavigation(e);
                setIsMobileMenuOpen(false);
              }}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Películas
            </a>
          </nav>
        </div>
      </header>

      {/* Featured Anime Banner */}
      <div className="relative h-[70vh] md:h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <img
          src={featuredAnime.poster_url}
          alt={featuredAnime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{featuredAnime.title}</h1>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500 font-semibold">{featuredAnime.rating} Rating</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              HD
            </span>
          </div>
          <p className="text-lg mb-6 text-gray-200">{featuredAnime.description}</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-white text-black rounded hover:bg-white/90 transition">
              <Play className="w-6 h-6" />
              Play
            </button>
            <button
              onClick={() => setShowInfoModal(true)}
              className="flex items-center gap-2 px-8 py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/60 transition"
            >
              <Info className="w-6 h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Recently Added Section */}
      <section className="px-4 md:px-12 py-8">
        <h2 className="text-2xl font-bold mb-6">Recently Added</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recentlyAdded.map((anime) => (
            <div
              key={anime.id}
              className="relative group cursor-pointer"
            >
              <div className="aspect-[2/3] rounded-lg overflow-hidden">
                <img
                  src={anime.poster_url}
                  alt={anime.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-12 h-12" />
              </div>
              <div className="mt-2">
                <h3 className="font-semibold group-hover:text-[#dc2626] transition-colors">
                  {anime.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span>{anime.rating} Rating</span>
                  <span>•</span>
                  <span>{anime.genres.join(', ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#181818] rounded-lg w-full max-w-4xl relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-4">{featuredAnime.title}</h2>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-green-500 font-semibold">
                  {featuredAnime.rating} Rating
                </span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  HD
                </span>
              </div>
              <p className="text-gray-300 mb-6">{featuredAnime.description}</p>
              <div className="text-sm text-gray-400">
                <p>
                  <span className="text-gray-200">Genres:</span>{' '}
                  {featuredAnime.genres.join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#141414] text-gray-400 py-12 mt-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-4 mb-8">
              <p className="text-center text-sm">
                Anime HD Online - Ningún vídeo se encuentra alojado en nuestros
                servidores.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Navegación</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#inicio"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#directorio"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Directorio Anime
                  </a>
                </li>
                <li>
                  <a
                    href="#peliculas"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Películas
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#terminos"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Términos y Condiciones
                  </a>
                </li>
                <li>
                  <a
                    href="#privacidad"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Política de Privacidad
                  </a>
                </li>
                <li>
                  <a
                    href="#dmca"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    DMCA
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Sobre All-Anime</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#about"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Acerca de Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Contacto
                  </a>
                </li>
                <li>
                  <a
                    href="#faq"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Comunidad</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#discord"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Discord
                  </a>
                </li>
                <li>
                  <a
                    href="#facebook"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="#twitter"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 text-center text-xs">
            <p>&copy; 2024 All-Anime. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;
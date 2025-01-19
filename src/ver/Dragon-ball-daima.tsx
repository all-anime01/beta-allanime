import { Play, Info, ChevronDown, X, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';

// Episodes data organized by seasons
const allEpisodes = {
  5: [
    {
      id: 1,
      title: '1. La conspiración',
      duration: '32 min',
      description:
        'Un castillo gigante en un mundo misterioso. Dos Majin observan por un monitor. Sus nombres son Gomah y Degesu. El monitor muestra a Goku y a los demás en una feroz batalla contra Majin Buu. Gomah y Degesu se dirigen a la Tierra.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/c750799082deb6a87ded21b117684ca6.jpg',
      releaseDate: 'Octubre 11, 2024',
      episodeNumber: 'S1:E1',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/1.html',
    },
    {
      id: 2,
      title: "2. Glorio",
      duration: '24 min',
      description:
        'Goku y sus amigos ahora son pequeños debido al plan de Gomah. Deciden viajar al Mundo Demoníaco y comienzan a prepararse. Goku recoge su Bastón Mágico para una nueva aventura. Pero antes de partir, aparece un joven Majin llamado Glorio.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/9b70eec9c296d5f79724880cb6ebf851.jpg',
      releaseDate: 'Octubre 18, 2024',
      episodeNumber: 'S1:E2',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/2.html',
    },
    {
      id: 3,
      title: "3. Daima",
      duration: '24 min',
      description:
        'Goku, Kaio-shin y Glorio se dirigen al Reino Demoníaco. Su avión viaja a través del espacio y hacia una dimensión misteriosa. Llegan a la entrada del Tercer Mundo Demoníaco, el cual se encuentra dentro del Reino Demoníaco.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/cd3e5a3d0b1576a58bbaa263fc58dc1e.jpg',
      releaseDate: 'Octubre 25, 2024',
      episodeNumber: 'S1:E3',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/3.html',
    },
    {
      id: 4,
      title: "4. Conversadores",
      duration: '24 min',
      description:
        'Obligados a atravesar el Tercer Mundo Demoníaco a pie, Goku y sus compañeros se detienen en una tienda solitaria. Allí encuentran unos productos muy extraños y conocen a una pareja majin bastante conversadora y peculiar.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/e93df1712febd0ea52d1e0b41b46dd80.jpg',
      releaseDate: 'Noviembre 01, 2024',
      episodeNumber: 'S1:E4',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/4.html',
    },
    {
      id: 5,
      title: "5. Panzy",
      duration: '24 min',
      description:
        'El majin enmascarado que apareció ante Goku y sus compañeros es una joven llamada Panzy.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/e8cea564d06dfb3068b59ee81bfa2e4f.jpg',
      releaseDate: 'Noviembre 08, 2024',
      episodeNumber: 'S1:E5',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/5.html',
    },
    {
      id: 6,
      title: "6. Relámpago",
      duration: '24 min',
      description:
        'Tras toparse con la Policía Militar, guardianes del Reino Demoníaco, nuestros cuatro amigos se ven obligados a acampar en una cueva.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/d4f3b7d1dde8e6dc661f87e3622ebb6f.jpg',
      releaseDate: 'Noviembre 15, 2024',
      episodeNumber: 'S1:E6',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/6.html',
    },
    {
      id: 7,
      title: "7. Collar",
      duration: '24 min',
      description:
        'Goku y sus amigos continúan con el viaje, pero la Policía Militar aparece y vuelve a impedirles el paso. Los siguieron usando la ubicación del Collar Mágico que Panzy.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/31e33e4b6d3d2c585ef478d40ac1001e.jpg',
      releaseDate: 'Noviembre 22, 2024',
      episodeNumber: 'S1:E7',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/7.html',
    },
    {
      id: 8,
      title: "8. Tamagami",
      duration: '24 min',
      description:
        '¡Comienza la lucha contra el Tamagami! Los Tamagamis son los guardianes de las Esferas del dragón. Panzy y los demás no pueden ocultar su sorpresa al ver luchar a Goku contra uno de ellos. ¿Cómo terminará la batalla?',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/10c92080767edcbe212570e2a801fd50.jpg',
      releaseDate: 'Noviembre 29, 2024',
      episodeNumber: 'S1:E8',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/8.html',
    },
    {
      id: 9,
      title: "9. Ladrones",
      duration: '24 min',
      description:
        'Los rumores sobre lo que hizo Goku en el Tercer Mundo Demoníaco se esparcen a lo largo del Reino Demoníaco. Para evitar problemas, Goku usa un disfraz en el hotel, pero los ladrones del lugar lo reconocen.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/5b828e9c26be6db3a8ca4121d2a522f7.jpg',
      releaseDate: 'Diciembre 6, 2024',
      episodeNumber: 'S1:E9',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/9.html',
    },
    {
      id: 10,
      title: "10. Océano",
      duration: '24 min',
      description:
        '¡Goku y sus compañeros llegan al místico Segundo Mundo Demoníaco, donde un océano gigante se extiende hasta donde llega la vista! El grupo queda asombrado con el lugar, ¡pero inmediatamente son atacados por la Policía Militar!',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/c5993c044460a69bc63176113609962b.jpg',
      releaseDate: 'Diciembre 13, 2024',
      episodeNumber: 'S1:E10',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/10.html',
    },
    {
      id: 11,
      title: "11. Leyenda",
      duration: '24 min',
      description:
        'Goku, Vegeta y los demás, llegan a un planeta que les resulta familiar. Mientras se preparan para irse, ¡una sombra sospechosa los alcanza! ¡Es el Legendario Namek que se quedó solo en el Reino Demoníaco!',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/f3f4fe392296c4fc23c6f5bfd731c6c8.jpg',
      releaseDate: 'Diciembre 20, 2024',
      episodeNumber: 'S1:E11',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/11.html',
    },
    {
      id: 12,
      title: "12. Verdadera fuerza",
      duration: '24 min',
      description:
        'Goku, Vegeta y los demás, llegan a un planeta que les resulta familiar. Mientras se preparan para irse, ¡una sombra sospechosa los alcanza! ¡Es el Legendario Namek que se quedó solo en el Reino Demoníaco!',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/9b70eec9c296d5f79724880cb6ebf851.jpg',
      releaseDate: 'Diciembre 27, 2024',
      episodeNumber: 'S1:E12',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/12.html',
    },
    {
      id: 13,
      title: "13. Sorpresa",
      duration: '24 min',
      description:
        'Goku, Vegeta y los demás, llegan a un planeta que les resulta familiar. Mientras se preparan para irse, ¡una sombra sospechosa los alcanza! ¡Es el Legendario Namek que se quedó solo en el Reino Demoníaco!',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/4f9fd5186ea16febf5eb0a9a8117838e.jpg',
      releaseDate: 'Enero 10, 2025',
      episodeNumber: 'S1:E13',
      videoUrl: 'https://all-anime.net/frame/Dragon-Ball-Daima/T1/13.html',
    },
    // ... rest of episodes
  ],
  // ... rest of seasons
};

interface Episode {
  id: number;
  title: string;
  duration: string;
  description: string;
  thumbnail: string;
  releaseDate: string;
  episodeNumber: string;
  videoUrl: string;
}

function App() {
  const [selectedSeason, setSelectedSeason] = useState(5);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [episodeView, setEpisodeView] = useState<'grid' | 'list'>('list');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Handle internal navigation here
    const href = e.currentTarget.getAttribute('href');
    if (href === '#') return;
    // Add your navigation logic here
  };

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setShowEpisodeModal(true);
  };

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

      {/* Hero Banner */}
      <div className="relative h-[50vh] md:h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <img
          src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=cover,format=auto,quality=94,width=1920/keyart/GG5H5XQ35-backdrop_wide"
          alt="Dragon Ball DAIMA"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl">
          <img
            src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/cr/logo/69975f73-97e1-40b6-a919-0d937e1a9005.png"
            alt="Dragon Ball DAIMA"
            className="w-48 md:w-96 mb-4 md:mb-6"
          />
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-sm md:text-base">
            <span className="text-green-500 font-semibold">
              Nuevos Episodios el Viernes
            </span>
            <span>2024</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              +12
            </span>
            <span>1 Seasons</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              HD
            </span>
          </div>
          <p className="text-sm md:text-lg mb-4 md:mb-6 text-gray-200 line-clamp-3 md:line-clamp-none">
          ¡Goku y compañía vivían vidas pacíficas cuando de repente se volvieron pequeños debido a una conspiración! Cuando descubren que la razón de esto puede estar en un mundo conocido como el "Reino de los Demonios", un joven y misterioso Majin llamado Glorio aparece ante ellos.
          </p>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => handleEpisodeClick(allEpisodes[1][0])}
              className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-white text-black rounded hover:bg-white/90 transition text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-6 md:h-6" />
              Play
            </button>
            <button
              onClick={() => setShowInfoModal(true)}
              className="flex items-center gap-2 px-4 md:px-8 py-2 md:py-3 bg-gray-500/70 text-white rounded hover:bg-gray-500/60 transition text-sm md:text-base"
            >
              <Info className="w-4 h-4 md:w-6 md:h-6" />
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Episodes Section */}
      <section className="px-4 md:px-12 py-8">
        <div className="max-w-9xl mx-auto">
          {/* Season Selection and View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Episodios</h2>
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[#2b2b2b] border border-gray-700 rounded px-4 py-2 appearance-none pr-10 text-sm focus:outline-none focus:border-[#dc2626]"
                >
                  {[1].map((season) => (
                    <option key={season} value={season}>
                      Season {season}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setEpisodeView('grid')}
                className={`p-2 rounded ${
                  episodeView === 'grid'
                    ? 'bg-[#dc2626] text-white'
                    : 'bg-[#2b2b2b] text-gray-400'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setEpisodeView('list')}
                className={`p-2 rounded ${
                  episodeView === 'list'
                    ? 'bg-[#dc2626] text-white'
                    : 'bg-[#2b2b2b] text-gray-400'
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Episodes List */}
          <div
            className={`grid ${
              episodeView === 'grid'
                ? 'grid-cols-1 md:grid-cols-1 lg:grid-cols-6'
                : 'grid-cols-1'
            } gap-4 md:gap-6`}
          >
            {allEpisodes[selectedSeason as keyof typeof allEpisodes].map(
              (episode) => (
                <div
                  key={episode.id}
                  onClick={() => handleEpisodeClick(episode)}
                  className={`bg-[#2b2b2b] rounded-lg overflow-hidden hover:bg-[#363636] transition-all cursor-pointer group
                  ${episodeView === 'grid' ? '' : 'flex flex-col md:flex-row'}`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative ${
                      episodeView === 'grid'
                        ? 'aspect-video'
                        : 'aspect-video md:w-72'
                    }`}
                  >
                    <img
                      src={episode.thumbnail}
                      alt={episode.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12" />
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm">
                      {episode.duration}
                    </div>
                  </div>

                  {/* Episode Info */}
                  <div
                    className={`p-4 ${episodeView === 'grid' ? '' : 'flex-1'}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="text-base md:text-lg font-semibold group-hover:text-[#dc2626] transition-colors">
                          {episode.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mt-1">
                          <span>{episode.episodeNumber}</span>
                          <span>•</span>
                          <span>{episode.releaseDate}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs md:text-sm text-gray-400 line-clamp-2">
                      {episode.description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Episode Modal */}
      {showEpisodeModal && selectedEpisode && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#181818] rounded-lg w-full max-w-4xl relative">
            <button
              onClick={() => setShowEpisodeModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4 md:p-8">
              <div className="relative aspect-video mb-6">
                <iframe
                  src={selectedEpisode.videoUrl}
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedEpisode.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                <span>{selectedEpisode.episodeNumber}</span>
                <span>•</span>
                <span>{selectedEpisode.duration}</span>
                <span>•</span>
                <span>{selectedEpisode.releaseDate}</span>
              </div>
              <p className="text-gray-300">{selectedEpisode.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Info Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#181818] rounded-lg w-full max-w-4xl relative">
            <button
              onClick={() => setShowInfoModal(false)}
              className="absolute top-4 right-4 text-white/70 hover:text-white z-10"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-4 md:p-8">
              <div className="relative aspect-video mb-6">
                <iframe
                  src="https://www.youtube.com/embed/Pu4xBOR4QKw?si=f0eFFcgJ9VQ8yPyj"
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Dragon Ball DAIMA
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="text-green-500 font-semibold">Puntuación media:
4.8 (44.4k)</span>
                <span>2025</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  +12
                </span>
                <span>1 Seasons</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  HD
                </span>
              </div>
              <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8">
              ¡Goku y compañía vivían vidas pacíficas cuando de repente se volvieron pequeños debido a una conspiración! Cuando descubren que la razón de esto puede estar en un mundo conocido como el "Reino de los Demonios", un joven y misterioso Majin llamado Glorio aparece ante ellos.
              </p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-sm text-gray-400">
                <div>
                  <p>
                    <span className="text-gray-200">Idiomas:</span> Subtitulado
                  </p>
                  <p>
                    <span className="text-gray-200">Creador:</span> Akira Toriyama
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-gray-200">Generos:</span> Acción,
                    Aventura, Shounen
                  </p>
                  <p>
                    <span className="text-gray-200">Aviso de contenido:</span>{' '}
                    +12 Violencia
                  </p>
                </div>
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
                    href="https://all-anime.net/explorar"
                    onClick={handleNavigation}
                    className="hover:text-white transition-colors"
                  >
                    Directorio Anime
                  </a>
                </li>
                <li>
                  <a
                    href="https://all-anime.net/peliculas"
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

export default App;
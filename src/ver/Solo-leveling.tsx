import { Play, Info, ChevronDown, X, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

// Episodes data organized by seasons
const allEpisodes = {
  2: [
    {
      id: 13,
      title: '13. Tú no eres nivel E, ¿verdad?',
      duration: '24 min',
      description:
        'Tras una reunión con los profesores de Jinah, le piden a Jinwoo que hable con una de sus compañeras que trabaja como cazadora. En un esfuerzo por mostrarle la dura realidad de su trabajo, Jinwoo la lleva a una incursión designada para los nuevos cazadores del gremio del Tigre Blanco.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/e1a8566071311d4a6720540b0d02a623.jpg',
      releaseDate: 'Enero 4, 2025',
      episodeNumber: 'Subtitulado',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T2/13.html',
    },
    {
      id: 14,
      title: '14. Parece que tú mismo no lo sabes',
      duration: '24 min',
      description:
        'Tras quedar atrapado en el interior de unaun portal rojo, Jinwoo tiene que enfrentarse a un grupo de elfos de hielo sedientos de sangre que pondrán a prueba su humanidad.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/b27889eed12a1c5c1c5765eb0d8f82dc.jpg',
      releaseDate: 'Enero 11, 2025',
      episodeNumber: 'Subtitulado',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T2/14.html',
    },
    {
      id: 15,
      title: '15. Aún queda mucho camino',
      duration: '23 min',
      description:
        'Tras quedar atrapado en el interior de unaun portal rojo, Jinwoo tiene que enfrentarse a un grupo de elfos de hielo sedientos de sangre que pondrán a prueba su humanidad.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=70,width=320,height=180/catalog/crunchyroll/707acde43312c043b135a8d8d12f0372.jpg',
      releaseDate: 'Enero 18, 2025',
      episodeNumber: 'Subtitulado',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T2/15.html',
    },
  ],
  1: [
    {
      id: 1,
      title: 'Ya estoy acostumbrado',
      duration: '24 min',
      description:
        'A Jin-Woo Sung lo conocen el cazador más débil de la humanidad, lo que lo convierte en objeto de burla de sus compañeros, aunque Ju-Hee Lee, una joven sanadora, siempre se preocupa por él y le ayuda a hacer amigos.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/9685e02cab2b3d22296e7c7e46d78aa8.jpe',
      releaseDate: 'Enero 6, 2024',
      episodeNumber: 'S1:E1',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/1.html',
    },
    {
      id: 2,
      title: 'Si tuviera otra oportunidad',
      duration: '24 min',
      description:
        'Jin-Woo y sus compañeros están atrapados y no pueden hacer nada mientras la estatua de piedra los masacra uno a uno. Parece que hay una salida a este pérfido juego, pero ¿a qué precio?',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/50a0eb40c919b8efea01fd4799df08ff.jpe',
      releaseDate: 'Enero 13, 2024',
      episodeNumber: 'S1:E2',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/2.html',
    },
    {
      id: 3,
      title: 'Es como un videojuego',
      duration: '24 min',
      description:
        'Para su sorpresa, Jin-Woo se despierta sano y salvo en el hospital. Al principio cree que los horripilantes sucesos que ha vivido son un sueño, pero las pantallas de estado no desaparecen y no parecen ser visibles para nadie más.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/c6adceca173ff32ae979af193a476fb2.jpe',
      releaseDate: 'Enero 20, 2024',
      episodeNumber: 'S1:E3',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/3.html',
    },
    {
      id: 4,
      title: 'Tengo que hacerme más fuerte',
      duration: '24 min',
      description:
        'En un mundo donde portales misteriosos conectan con mazmorras llenas de monstruos, Sung Jin-Woo lucha por sobrevivir como el cazador más débil.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/78de61960488c9f16f960dae0b554eca.jpe',
      releaseDate: 'Enero 27, 2024',
      episodeNumber: 'S1:E4',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/4.html',
    },
    {
      id: 5,
      title: 'Un muy buen trato',
      duration: '24 min',
      description:
        'Cuando Jinwoo sale del hospital, las enfermeras se fijan en su buen estado físico. ¿Siempre tuvo tan buen cuerpo? Poco después, un grupo de Cazadores de rango C buscan un par de compañeros para rellenar y poder entrar a una mazmorra también C, así que como le ofrecen una buena cantidad, acepta.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/403416c5837765866f3b19ac27932777.jpe',
      releaseDate: 'Febrero 3, 2024',
      episodeNumber: 'S1:E5',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/5.html',
    },
    {
      id: 6,
      title: 'Comienza la verdadera caza',
      duration: '24 min',
      description:
        'Jinwoo cae en la trampa que su nuevo equipo temporal le tiende y tiene que sobrevivir como puede, una vez más, ante un monstruo mucho más poderoso que él. A su lado está Jinho, a quien también han abandonado.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/4622fd0dd6f0072211526a8ae67f0c5c.jpe',
      releaseDate: 'Febrero 10, 2024',
      episodeNumber: 'S1:E6',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/6.html',
    },
    {
      id: 7,
      title: 'Veamos hasta dónde puedo llegar',
      duration: '24 min',
      description:
        'Tras el incidente en la mazmorra de rango C, Jinwoo sigue con su vida como siempre, aunque su hermana no acaba de creer la gran evolución de su hermano.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/018425874ef4c1b18b32c26645d6c848.jpe',
      releaseDate: 'Febrero 17, 2024',
      episodeNumber: 'S1:E7',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/7.html',
    },
    {
      id: 7.5,
      title: 'Episodio especial',
      duration: '24 min',
      description: 'Repasamos la historia hasta el momento.',
      thumbnail:
        'https://www.crunchyroll.com/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/693c3c2259bf67d2afd151453ff15e1d.jpe',
      releaseDate: 'Febrero 24, 2024',
      episodeNumber: 'S1:E7.5',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/7.5.html',
    },
    {
      id: 8,
      title: 'Esto es frustrante',
      duration: '24 min',
      description:
        'Tras su última incursión en una mazmorra, Jinwoo se ha dado cuenta de su propia debilidad. Quiere subir de nivel lo antes posible, pero eso podrá hacerlo si consigue entrar en las mazmorras.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/ba4454c313d44737a3a72fc390bd2159.jpe',
      releaseDate: 'Marzo 2, 2024',
      episodeNumber: 'S1:E8',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/8.html',
    },
    {
      id: 9,
      title: 'Has estado ocultando tus habilidades',
      duration: '24 min',
      description:
        'El grupo de supervivientes de la mazmorra doble entra en la mazmorra junto a los presos condenados y Kang Taeshik, el cazador encargado de supervisar a los prisioneros. Sin embargo, lo que parecía un viaje normal a una mazmorra acaba siendo un río de sangre.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/08ade842ca3ae544ccc5e4f6a207b529.jpe',
      releaseDate: 'Marzo 9, 2024',
      episodeNumber: 'S1:E9',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/9.html',
    },
    {
      id: 10,
      title: '¿Qué es esto, un pícnic?',
      duration: '24 min',
      description:
        'Jinwoo y Jinho preparan un grupo repleto de figurantes para entrar ellos solos a las mazmorras y conseguir dinero, pero esto hace que Tigre Blanco se fije en las posibles capacidades de Jinwoo y sospechen de que vivió un segundo despertar.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/9833d2909af5311139e79b32a44d9605.jpe',
      releaseDate: 'Marzo 16, 2024',
      episodeNumber: 'S1:E10',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/10.html',
    },
    {
      id: 11,
      title: 'Un caballero defendiendo un trono vacío',
      duration: '24 min',
      description:
        'Sung Jinwoo inicia la misión para cambiar de clase y se enfrenta a un enemigo formidable. Mientras, Jinho se reúne con su familia y otros cazadores visitan la isla de Jeju.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=320,height=180,fit=contain,quality=70/catalog/crunchyroll/66e3cabc8e0557f77c93c24178e7a5cd.jpe',
      releaseDate: 'Marzo 23, 2024',
      episodeNumber: 'S1:E11',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/11.html',
    },
    {
      id: 12,
      title: 'Surge',
      duration: '24 min',
      description:
        'Mientras Jinwoo se enfrenta a sí mismo e intenta completar el cambio de clase, Choi Jong-in y los cazadores que lo acompañan descubren algo en la isla de Jeju.',
      thumbnail:
        'https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,fit=contain,width=320,height=180,quality=70/catalog/crunchyroll/cda77a98de7021522ebb5f0cc9bebd7d.jpe',
      releaseDate: 'Marzo 30, 2024',
      episodeNumber: 'S1:E12',
      videoUrl: 'https://all-anime.net/frame/Solo-Leveling/T1/12.html',
    },
  ],
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

interface Season {
  id: number;
  name: string;
}

function SakamotoDaysTV() {
  const [selectedSeason, setSelectedSeason] = useState(1, 2);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEpisodeModal, setShowEpisodeModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [episodeView, setEpisodeView] = useState<'grid' | 'list'>('list');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [episodeSort, setEpisodeSort] = useState<'newest' | 'oldest'>('newest');
  const [episodeFilter, setEpisodeFilter] = useState('');

  // Get latest episode for play button
  const getLatestEpisode = () => {
    const episodes = allEpisodes[selectedSeason as keyof typeof allEpisodes];
    return episodes[episodes.length - 1];
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleEpisodeClick = (episode: Episode) => {
    setSelectedEpisode(episode);
    setShowEpisodeModal(true);
  };

  const getSortedEpisodes = (episodes: Episode[]) => {
    const sortedEpisodes = [...episodes];
    if (episodeSort === 'newest') {
      return sortedEpisodes.reverse();
    }
    return sortedEpisodes;
  };

  const getFilteredEpisodes = (episodes: Episode[]) => {
    if (!episodeFilter) return episodes;

    return episodes.filter(
      (episode) =>
        episode.title.toLowerCase().includes(episodeFilter.toLowerCase()) ||
        episode.episodeNumber
          .toLowerCase()
          .includes(episodeFilter.toLowerCase())
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#141414] text-white font-netflix overflow-x-hidden">
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
                onClick={(e) => handleNavigation(e, 'inicio')}
                className="text-sm hover:text-gray-300"
              >
                Inicio
              </a>
              <a
                href="#explorar"
                onClick={(e) => handleNavigation(e, 'explorar')}
                className="text-sm hover:text-gray-300"
              >
                Explorar
              </a>
              <a
                href="#peliculas"
                onClick={(e) => handleNavigation(e, 'peliculas')}
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
              onClick={(e) => handleNavigation(e, 'inicio')}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#explorar"
              onClick={(e) => handleNavigation(e, 'explorar')}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Explorar
            </a>
            <a
              href="https://all-anime.net/peliculas"
              onClick={(e) => handleNavigation(e, 'peliculas')}
              className="text-lg hover:text-gray-300 transition-colors"
            >
              Películas
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Banner */}
      <div id="inicio" className="relative h-[50vh] md:h-screen w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <img
          src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=94,width=1920/CurationAssets/Solo%20Leveling/SEASON%202/ULTRA-WIDE/SoloLeveling-S2-KV1-UW-LTR.png"
          alt="Sakamoto Days"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl">
          <img
            src="https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480/CurationAssets/Solo%20Leveling/SEASON%202/ULTRA-WIDE/SoloLeveling-S2-KV1-UW-Logo.png"
            alt="Solo Leveling"
            className="w-48 md:w-96 mb-4 md:mb-6"
          />
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-sm md:text-base">
            <span className="text-green-500 font-semibold">
              Nuevo Episodio cada Sábado
            </span>
            <span>2024</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              +16
            </span>
            <span>2 Temporadas</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              HD
            </span>
          </div>
          <p className="text-sm md:text-lg mb-4 md:mb-6 text-gray-200 line-clamp-3 md:line-clamp-none">
            En un mundo donde portales misteriosos conectan con mazmorras llenas
            de monstruos, Sung Jin-Woo debe evolucionar de ser el cazador más
            débil a convertirse en el más fuerte.
          </p>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => handleEpisodeClick(getLatestEpisode())}
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
      <section id="explorar" className="px-4 md:px-12 py-8 w-full">
        <div className="max-w-8xl mx-auto">
          {/* Season Selection, Sort, Filter and View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-semibold">Episodios</h2>
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[#2b2b2b] border border-gray-700 rounded px-4 py-2 appearance-none pr-10 text-sm focus:outline-none focus:border-[#dc2626]"
                >
                  <option value={2}>T2: Arise from the Shadow</option>
                  <option value={1}>Temporada 1</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Rest of the component remains the same... */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Episode Filter */}
              <div className="relative flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Buscar episodio..."
                  value={episodeFilter}
                  onChange={(e) => setEpisodeFilter(e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-[#dc2626] placeholder-gray-400"
                />
                <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Button */}
              <button
                onClick={() => setEpisodeSort(episodeSort === 'newest' ? 'oldest' : 'newest')}
                className="flex items-center gap-2 px-4 py-2 bg-[#2b2b2b] rounded hover:bg-[#363636] transition-colors"
              >
                <span className="text-sm">
                  {episodeSort === 'newest' ? 'Más recientes' : 'Más antiguos'}
                </span>
                <ChevronDown className={`w-4 h-4 transition-transform ${
                  episodeSort === 'newest' ? 'rotate-180' : ''
                }`} />
              </button>

              {/* View Toggle Buttons */}
              <div className="flex items-center gap-2">
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
          </div>

          {/* Episodes List */}
          <div
            className={`grid ${
              episodeView === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5'
                : 'grid-cols-1'
            } gap-4 md:gap-6`}
          >
            {/* Rest of the episodes list code remains the same... */}
          {getFilteredEpisodes(
              getSortedEpisodes(
                allEpisodes[selectedSeason as keyof typeof allEpisodes]
              )
            ).map((episode) => (
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
                {/* ... existing episode card code ... */}
                
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

      {/* ... existing modals and footer code ... */}
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
                  src="https://www.youtube.com/embed/TceDFwPXCuI?si=Pwe8qBK_wKzIZ6a7"
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Solo Leveling
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="text-green-500 font-semibold">
                  Puntuación media: 4.9 (429.5k)
                </span>
                <span>2024</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  +16
                </span>
                <span>2 Temporadas</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  HD
                </span>
              </div>
              <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8">
                En un mundo donde portales misteriosos conectan con mazmorras
                llenas de monstruos, Sung Jin-Woo debe evolucionar de ser el
                cazador más débil a convertirse en el más fuerte.
              </p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-sm text-gray-400">
                <div>
                  <p>
                    <span className="text-gray-200">Audio:</span> Sub | Dob
                  </p>
                  <p>
                    <span className="text-gray-200">Creador:</span> Chugong
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-gray-200">Generos:</span> Acción,
                    Fantasía, Aventura
                  </p>
                  <p>
                    <span className="text-gray-200">Aviso de contenido:</span>{' '}
                    +16 Violencia, Gore
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
            <p>&copy; 2024 all-anime. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SakamotoDaysTV;
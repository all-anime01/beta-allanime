import { Play, Info, ChevronDown, X, Search, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Episodes data organized by seasons
const allEpisodes = {
  2: [
    {
      id: 1,
      title: 'El asesino legendario',
      duration: '25 min',
      description:
        'With war raging overseas, Mike, Dustin, Lucas and Max find their spring break complicated by the emergence of a new threat in Hawkins.',
      thumbnail:
        'https://occ-0-4440-3934.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABWHnS22C_66n2XVbTMhsuhScaDfHqmG5omAMxMWUgAaAQJgHWtk_9V2oGODtI2RtAxM_C9maBSH-LsN1V4TA_jtJUT4Dxdlt0p-jIev2NegUBKfwPmhiuPXN.webp?r=ef0',
      releaseDate: 'Enero 11, 2025',
      episodeNumber: 'S5:E1',
      videoUrl: 'https://all-anime.net/frame/Sakamoto-days/T1/1.html',
    },
    {
      id: 2,
      title: "Contra Son Hee y Bacho",
      duration: '23 min',
      description:
        'A mysterious death sparks a police investigation, leading to shocking revelations about the supernatural forces at work in Hawkins.',
      thumbnail:
        'https://cdn.jkdesu.com/assets/images/animes/video/image/jkvideo_970a2dacdd7d20c07c011641b9c2382f.jpg',
      releaseDate: 'Enero 11, 2022',
      episodeNumber: 'S5:E2',
      videoUrl: 'https://all-anime.net/frame/Sakamoto-days/T1/2.html',
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
  const [selectedSeason, setSelectedSeason] = useState(2);
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

  const seasons: Season[] = [
    { id: 1, name: 'Temporada 1' }
  ];

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
    
    return episodes.filter(episode => 
      episode.title.toLowerCase().includes(episodeFilter.toLowerCase()) ||
      episode.episodeNumber.toLowerCase().includes(episodeFilter.toLowerCase())
    );
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
          src="https://occ-0-4440-3934.1.nflxso.net/dnm/api/v6/E8vDc_W8CLv7-yMQu8KMEC7Rrr8/AAAABbERq_aL7Nej4e_fjN0OZY9qMp4g9JirfV5VKZgJr7FSdM7NE2i_1c3Nep4NDwnBo9r-a5_qAuko9O_FG-n4-oHa7oK1VDBwf8sn.jpg?r=acd"
          alt="Sakamoto Days"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-1/4 left-4 md:left-12 max-w-2xl">
          <img
            src="https://occ-0-4440-3934.1.nflxso.net/dnm/api/v6/S4oi7EPZbv2UEPaukW54OORa0S8/AAAABemKOWL1V4rv61wwalKNdi9che_5dUQD3KvcrCf-CHZWg3F8-e6KEvIYBMHanQPGS-ZzKnH9EwrXc_cP8udykMZLMVTVusZ_VQ.webp?r=0b2"
            alt="Sakamoto Days"
            className="w-48 md:w-96 mb-4 md:mb-6"
          />
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6 text-sm md:text-base">
            <span className="text-green-500 font-semibold">
              Nuevos Episodios el Sábado
            </span>
            <span>2025</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              +14
            </span>
            <span>1 Seasons</span>
            <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
              HD
            </span>
          </div>
          <p className="text-sm md:text-lg mb-4 md:mb-6 text-gray-200 line-clamp-3 md:line-clamp-none">
            Taro Sakamoto, célebre asesino a sueldo, decidió retirarse de la
            acción cuando se enamoró. Pero el pasado vuelve por él y ahora debe
            dar pelea para proteger a su familia.
          </p>
          <div className="flex gap-2 md:gap-4">
            <button
              onClick={() => handleEpisodeClick(allEpisodes[2][0])}
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
          {/* Season Selection, Sort, Filter and View Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-5">
              <h2 className="text-xl md:text-2xl font-semibold">Episodios</h2>
              <div className="relative">
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(Number(e.target.value))}
                  className="bg-[#2b2b2b] border border-gray-700 rounded px-4 py-2 appearance-none pr-10 text-sm focus:outline-none focus:border-[#dc2626]"
                >
                  {seasons.map((season) => (
                    <option key={season.id} value={season.id}>
                      {season.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>

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
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6'
                : 'grid-cols-1'
            } gap-4 md:gap-6`}
          >
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

                {/* Episode Info */}
                <div className={`p-4 ${episodeView === 'grid' ? '' : 'flex-1'}`}>
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
            ))}
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
                  src="https://www.youtube.com/embed/UF4Fz5WKGCc?si=ZdlqX5TErU9mgif0"
                  className="w-full h-full absolute inset-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Sakamoto Days
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4 md:mb-6">
                <span className="text-green-500 font-semibold">98% Match</span>
                <span>2025</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  TV-14
                </span>
                <span>5 Seasons</span>
                <span className="bg-[#30CA38] text-white px-2 py-0.5 rounded text-xs font-bold">
                  HD
                </span>
              </div>
              <p className="text-sm md:text-lg text-gray-300 mb-6 md:mb-8">
                Taro Sakamoto, célebre asesino a sueldo, decidió retirarse de la
                acción cuando se enamoró. Pero el pasado vuelve por él y ahora
                debe dar pelea para proteger a su familia.
              </p>
              <div className="grid md:grid-cols-2 gap-4 md:gap-8 text-xs md:text-sm text-gray-400">
                <div>
                  <p>
                    <span className="text-gray-200">Idioma:</span> Sub | Dob
                  </p>
                  <p>
                    <span className="text-gray-200">Creador:</span> Yuuto Suzuki
                  </p>
                </div>
                <div>
                  <p>
                    <span className="text-gray-200">Generos:</span> Acción,
                    Comedia
                  </p>
                  <p>
                    <span className="text-gray-200">Aviso de contenido:</span>{' '}
                    +14 Lenguaje ofensivo, Diálogos sugerentes, Violencia
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
            <p>&copy; 2024 All-Anime. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SakamotoDaysTV;
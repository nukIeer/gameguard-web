import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, Download, Play, Info, Bookmark, Share2, ChevronRight, X, ChevronLeft, Maximize2 } from 'lucide-react';
import { fetchGames } from '../api';
import { Game } from '../types';
import { AdPlaceholder } from '../components/AdPlaceholder';

export default function GameDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchGames().then(data => {
      const found = data.find(g => g.id === slug);
      setGame(found || null);
      setLoading(false);
    });

    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (slug && saved.includes(slug)) {
      setIsFavorite(true);
    }
  }, [slug]);

  if (loading) {
    return <div className="p-8 text-center text-text-secondary">Loading...</div>;
  }

  if (!game) {
    return <div className="p-8 text-center text-text-secondary">Game not found.</div>;
  }

  const toggleFavorite = () => {
    const saved = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updated = saved.filter((id: string) => id !== slug);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      saved.push(slug);
      localStorage.setItem('favorites', JSON.stringify(saved));
      setIsFavorite(true);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: game?.title,
          text: game?.description?.substring(0, 100),
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    }
  };

  const handleDownload = (type: 'direct' | 'play' | 'galaxy') => {
    if (type === 'direct') {
      window.location.href = `/api/download/${game.id}`;
    } else if (type === 'play' && game.downloadLinks?.playStoreUrl) {
      window.open(game.downloadLinks.playStoreUrl, '_blank');
    } else if (type === 'galaxy' && game.downloadLinks?.galaxyStoreUrl) {
      window.open(game.downloadLinks.galaxyStoreUrl, '_blank');
    }
  };

  const hasLinks = game.downloadLinks && (
    game.downloadLinks.apk1 || 
    game.downloadLinks.apk2 || 
    (game.downloadLinks.mirrors && game.downloadLinks.mirrors.length > 0) ||
    game.downloadLinks.playStoreUrl ||
    game.downloadLinks.galaxyStoreUrl
  );

  return (
    <div className="pb-20">
      {/* Lightbox UI */}
      {lightboxIndex !== null && game.media?.screenshots && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm" onClick={() => setLightboxIndex(null)}>
          <button className="absolute top-4 right-4 p-2 text-white/70 hover:text-white bg-black/50 rounded-full z-50">
            <X className="w-6 h-6" />
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.max(0, lightboxIndex - 1)); }}
            className={`absolute left-4 p-3 text-white/70 hover:text-white bg-black/50 rounded-full z-50 ${lightboxIndex === 0 ? 'opacity-30 pointer-events-none' : ''}`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <img 
            src={game.media.screenshots[lightboxIndex]} 
            className="max-w-full max-h-full object-contain pointer-events-none select-none px-12" 
            alt="Screenshot" 
          />
          
          <button 
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(Math.min(game.media!.screenshots.length - 1, lightboxIndex + 1)); }}
            className={`absolute right-4 p-3 text-white/70 hover:text-white bg-black/50 rounded-full z-50 ${lightboxIndex === game.media.screenshots.length - 1 ? 'opacity-30 pointer-events-none' : ''}`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-bold text-text-faint px-4 py-3">
        <Link to="/" className="hover:text-text-primary">Ana Sayfa</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-text-primary truncate">{game.title}</span>
      </div>

      {/* Banner */}
      <div className="w-full aspect-[21/9] bg-bg-elevated relative">
        {game.media?.bannerUrl ? (
          <img src={game.media.bannerUrl} alt={game.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-bg-elevated to-bg-surface"></div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-transparent"></div>
        
        {/* Top actions */}
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button onClick={toggleFavorite} className="p-2.5 bg-bg-base/80 backdrop-blur-md rounded-full text-text-primary hover:text-accent-green transition-colors">
            <Bookmark className={`w-5 h-5 ${isFavorite ? 'fill-accent-green text-accent-green' : ''}`} />
          </button>
          <button onClick={handleShare} className="p-2.5 bg-bg-base/80 backdrop-blur-md rounded-full text-text-primary hover:text-accent-green transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Icon & Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 translate-y-6 flex gap-4">
          <div className="w-24 h-24 rounded-3xl bg-bg-elevated overflow-hidden border-4 border-bg-base shadow-xl shrink-0">
            {game.media?.iconUrl ? (
              <img src={game.media.iconUrl} alt={game.title} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full bg-gradient-to-br from-bg-elevated to-bg-surface"></div>
            )}
          </div>
          <div className="flex-1 flex flex-col justify-end pb-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight drop-shadow-md">
              {game.title || t('detail.unknownTitle')}
            </h1>
            <span className="text-xs text-text-secondary font-medium mt-0.5">{game.package}</span>
          </div>
        </div>
      </div>

      {/* Meta Stats */}
      <div className="px-4 mt-12 mb-6">
        <div className="flex items-center gap-1.5 text-accent-green font-bold text-lg mb-4">
          <Star className="w-5 h-5 fill-accent-green" />
          <span>{game.details?.rating || '0.0'}</span>
        </div>
        
        <div className="flex overflow-x-auto gap-3 scrollbar-hide pb-2">
          <MetaTile label={t('detail.downloads')} value={game.details?.downloads || '?'} />
          <MetaTile label={t('detail.size')} value={game.details?.size || '?'} />
          <MetaTile label={t('detail.version')} value={game.details?.version || '?'} />
          <MetaTile label={t('detail.android')} value={game.details?.androidVersion || '?'} />
          <MetaTile label={t('detail.ageRating')} value={game.details?.ageRating || '?'} />
        </div>

        {/* Direct download - üst CTA (tek tıkla /api/download/:slug) */}
        {hasLinks && (
          <button
            onClick={() => handleDownload('direct')}
            className="w-full mt-5 relative overflow-hidden bg-accent-green text-bg-base font-black py-4 rounded-full flex items-center justify-center gap-2 text-lg hover:bg-accent-green-pressed transition-colors shadow-[0_0_20px_rgba(20,200,80,0.3)] group"
          >
            <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite] skew-x-[-20deg]"></div>
            <Download className="w-6 h-6 relative z-10" strokeWidth={2.5} />
            <span className="relative z-10">{t('detail.directDownload')}</span>
          </button>
        )}
      </div>

      {/* Screenshots */}
      {game.media?.screenshots && game.media.screenshots.length > 0 && (
        <div className="mb-8">
          <h3 className="px-4 text-sm font-bold text-text-primary mb-3 uppercase tracking-wider">{t('detail.screenshots')}</h3>
          <div className="flex overflow-x-auto gap-3 px-4 pb-4 scrollbar-hide snap-x">
            {game.media.screenshots.map((src, idx) => (
              <button 
                key={idx} 
                onClick={() => setLightboxIndex(idx)}
                className="shrink-0 h-48 sm:h-64 w-auto rounded-2xl overflow-hidden bg-bg-surface/50 border border-white/[0.05] snap-center group relative block shadow-lg"
              >
                <img 
                  src={src} 
                  alt="Screenshot" 
                  className="h-full w-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center backdrop-blur-[2px] opacity-0 group-hover:opacity-100">
                  <Maximize2 className="w-8 h-8 text-white drop-shadow-md" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="px-4"><AdPlaceholder /></div>

      {/* Description */}
      <div className="px-4 mb-8">
        <h3 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">{t('detail.description')}</h3>
        <div className={`text-sm text-text-secondary leading-relaxed whitespace-pre-line relative ${!showFullDesc ? 'max-h-32 overflow-hidden' : ''}`}>
          {game.description || t('detail.noDescription')}
          {!showFullDesc && game.description && game.description.length > 150 && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-bg-base to-transparent pointer-events-none"></div>
          )}
        </div>
        {game.description && game.description.length > 150 && (
          <button 
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="text-accent-green font-bold text-sm mt-2 hover:underline"
          >
            {showFullDesc ? 'Daralt' : 'Devamını Oku'}
          </button>
        )}
      </div>

      {/* What's New */}
      {game.whatsNew && (
        <div className="px-4 mb-12">
          <h3 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wider">{t('detail.whatsNew')}</h3>
          <div className="bg-bg-surface p-4 rounded-2xl border border-border-subtle text-sm text-text-secondary">
            {game.whatsNew}
          </div>
        </div>
      )}

      {/* Download Section (Sticky on Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-base/60 backdrop-blur-2xl border-t border-white/[0.05] sm:static sm:bg-transparent sm:border-0 sm:px-4 sm:p-0 z-50">
        <div className="max-w-md mx-auto sm:max-w-full space-y-3">
          {hasLinks ? (
            <>
              {/* Primary Direct Download */}
              <button 
                onClick={() => handleDownload('direct')}
                className="w-full relative overflow-hidden bg-accent-green text-bg-base font-black py-4 rounded-full flex items-center justify-center gap-2 text-lg hover:bg-accent-green-pressed transition-colors shadow-[0_0_20px_rgba(20,200,80,0.3)] group"
              >
                <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shine_1.5s_ease-in-out_infinite] skew-x-[-20deg]"></div>
                <Download className="w-6 h-6 relative z-10" strokeWidth={2.5} />
                <span className="relative z-10">{t('detail.directDownload')}</span>
              </button>
              
              {/* Secondary Google Play */}
              {game.downloadLinks?.playStoreUrl && (
                <button 
                  onClick={() => handleDownload('play')}
                  className="w-full bg-bg-surface/50 backdrop-blur-md border border-white/[0.1] text-text-primary font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/[0.05] transition-colors text-sm shadow-inner"
                >
                  <Play className="w-4 h-4" />
                  {t('detail.googlePlay')}
                </button>
              )}
            </>
          ) : (
            <button disabled className="w-full bg-bg-surface/30 backdrop-blur-md border border-white/[0.05] text-text-faint font-bold py-4 rounded-full flex items-center justify-center gap-2 text-lg">
              {t('detail.unavailable')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function MetaTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-bg-surface/40 backdrop-blur-md border border-white/[0.05] rounded-2xl p-3 min-w-[80px] shrink-0 flex flex-col items-center justify-center shadow-lg">
      <span className="text-[10px] font-bold text-text-faint uppercase tracking-wider mb-1 text-center">{label}</span>
      <span className="text-sm font-bold text-text-primary">{value}</span>
    </div>
  );
}

import React, { useState } from 'react';
import { useBookmarks } from '../../context/BookmarkContext';
import { useLanguage } from '../../context/LanguageContext';
import { Bookmark, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookmarkButton({ fighterId, showLabel = true, className = '' }) {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const { t } = useLanguage();
  const bookmarked = isBookmarked(fighterId);
  const [justSaved, setJustSaved] = useState(false);

  const handleToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(fighterId);

    if (!bookmarked) {
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 2000);
      try {
        confetti({
          particleCount: 25,
          spread: 40,
          origin: { y: 0.8 },
          colors: ['#781D22', '#996515', '#FAF7F0']
        });
      } catch (err) {
        // silent fail if canvas-confetti unsupported
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-ntr font-medium rounded-xs transition-colors cursor-pointer border ${
        bookmarked
          ? 'border-[#781D22] bg-[#FAF0F0] text-[#781D22]'
          : 'border-[#D6CFC7] bg-[#FAF7F0] text-[#57524C] hover:text-[#781D22] hover:border-[#781D22]'
      } ${className}`}
      title={bookmarked ? t('fighterDetails.savedFighter') : t('fighterDetails.saveFighter')}
    >
      {bookmarked ? (
        <Check className="w-3.5 h-3.5 text-[#781D22]" />
      ) : (
        <Bookmark className="w-3.5 h-3.5" />
      )}
      {showLabel && (
        <span>
          {bookmarked ? t('fighterDetails.savedFighter') : t('fighterDetails.saveFighter')}
        </span>
      )}
    </button>
  );
}

import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from '../components/common/SectionHeading';
import { getArticles } from '../services/api';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

export default function StoriesPage() {
  const { t, isTelugu } = useLanguage();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getArticles();

        const sortedArticles = data.map((article) => ({
          ...article,
          images: [...(article.images || [])].sort(
            (a, b) =>
              (a.image_order || 0) -
              (b.image_order || 0)
          ),
        }));

        setStories(sortedArticles);
      } catch (error) {
        console.error('Failed to load articles:', error);
        setError('Failed to load articles.');
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">

      <div className="max-w-7xl mx-auto space-y-10">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}
        <SectionHeading
          kicker={t('stories.kicker')}
          title={t('stories.title')}
          subtitle={t('stories.subtitle')}
        />

        {/* =====================================================
            LOADING
        ====================================================== */}
        {loading && (
          <div className="text-center py-16">
            <p className="font-ntr text-[#57524C]">
              {isTelugu
                ? 'వ్యాసాలు లోడ్ అవుతున్నాయి...'
                : 'Loading articles...'}
            </p>
          </div>
        )}

        {/* =====================================================
            ERROR
        ====================================================== */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="font-ntr text-[#781D22]">
              {error}
            </p>
          </div>
        )}

        {/* =====================================================
            EMPTY
        ====================================================== */}
        {!loading && !error && stories.length === 0 && (
          <div className="text-center py-16">
            <p className="font-ntr text-[#57524C]">
              {isTelugu
                ? 'వ్యాసాలు ఏవీ కనుగొనబడలేదు.'
                : 'No articles found.'}
            </p>
          </div>
        )}

        {/* =====================================================
            STORIES GRID
        ====================================================== */}
        {!loading && !error && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {stories.map((story) => {
              const firstImage = story.images?.[0];

              const title = isTelugu
                ? story.title_telugu || story.title
                : story.title;

              const description = isTelugu
                ? story.description_telugu ||
                  story.description
                : story.description;

              return (
                <article
                  key={story.article_id}
                  className="
                    border-2
                    border-[#D6CFC7]
                    bg-[#FFFFFF]
                    rounded-xs
                    overflow-hidden
                    flex
                    flex-col
                    justify-between
                    shadow-xs
                    archive-card-hover
                    group
                  "
                >

                  {/* =================================================
                      IMAGE
                  ================================================== */}
                  <div className="relative min-h-[300px] sm:min-h-[400px] bg-[#2B2826] overflow-hidden flex items-center justify-center">

                    {firstImage ? (
                      <Link
                        to={`/stories/${story.article_id}`}
                        className="block w-full h-full"
                      >
                        <img
                          src={`${import.meta.env.VITE_API_BASE_URL}${firstImage.image_url}`}
                          alt={
                            firstImage.caption ||
                            title
                          }
                          className="
                            w-full
                            h-full
                            object-contain
                            grayscale
                            contrast-110
                            group-hover:scale-105
                            transition-transform
                            duration-500
                          "
                          loading="lazy"
                        />
                      </Link>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-[#FAF7F0]">
                          {isTelugu
                            ? 'చిత్రం లేదు'
                            : 'No image'}
                        </span>
                      </div>
                    )}

                    {/* Article Badge */}
                    <span
                      className="
                        absolute
                        top-3
                        left-3
                        px-3
                        py-1
                        text-xs
                        font-ntr
                        bg-[#781D22]
                        text-[#FAF7F0]
                        font-semibold
                        border
                        border-[#FAF7F0]/30
                        shadow-xs
                      "
                    >
                      {isTelugu ? 'వ్యాసం' : 'Article'}
                    </span>

                    {/* Image Count */}
                    {story.images?.length > 0 && (
                      <span
                        className="
                          absolute
                          bottom-3
                          right-3
                          px-2
                          py-0.5
                          text-xs
                          font-ntr
                          bg-[#1C1917]/80
                          text-[#FAF7F0]
                          flex
                          items-center
                          gap-1
                        "
                      >
                        <Clock className="w-3 h-3 text-[#EFE4CA]" />

                        <span>
                          {story.images.length}{' '}
                          {story.images.length === 1
                            ? isTelugu
                              ? 'పేజీ'
                              : 'page'
                            : isTelugu
                              ? 'పేజీలు'
                              : 'pages'}
                        </span>
                      </span>
                    )}

                  </div>


                  {/* =================================================
                      CARD CONTENT
                  ================================================== */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">

                    <div>

                      {/* Title */}
                      <h3
                        className="
                          font-gurajada
                          text-3xl
                          font-bold
                          text-[#1C1917]
                          group-hover:text-[#781D22]
                          transition-colors
                          leading-tight
                          mb-3
                        "
                      >
                        <Link
                          to={`/stories/${story.article_id}`}
                        >
                          {title}
                        </Link>
                      </h3>

                      {/* Context / Description */}
                      {description && (
                        <p
                          className="
                            font-ntr
                            text-sm
                            text-[#57524C]
                            line-clamp-3
                            leading-relaxed
                          "
                        >
                          {description}
                        </p>
                      )}

                    </div>


                    {/* =================================================
                        READ ARTICLE
                    ================================================== */}
                    <div
                      className="
                        pt-3
                        border-t
                        border-[#E8E2D9]
                        flex
                        items-center
                        justify-between
                      "
                    >

                      <Link
                        to={`/stories/${story.article_id}`}
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          text-sm
                          font-ntr
                          font-bold
                          text-[#781D22]
                          hover:text-[#9B282F]
                          transition-colors
                        "
                      >
                        <span>
                          {t('stories.readArticle')}
                        </span>
                      </Link>

                    </div>

                  </div>

                </article>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}
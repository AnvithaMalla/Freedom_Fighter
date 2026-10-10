import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getArticle } from '../services/api';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export default function StoryDetailPage() {
  const { articleId } = useParams();
  const { isTelugu } = useLanguage();

  const [article, setArticle] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getArticle(articleId);

        const sortedImages = [...(data.images || [])].sort(
          (a, b) =>
            (a.image_order || 0) -
            (b.image_order || 0)
        );

        setArticle({
          ...data,
          images: sortedImages,
        });

        setCurrentImage(0);
      } catch (error) {
        console.error('Failed to load article:', error);
        setError('Failed to load article.');
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      loadArticle();
    }
  }, [articleId]);

  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex items-center justify-center">
        <p className="font-ntr text-[#57524C] text-lg">
          {isTelugu
            ? 'వ్యాసం లోడ్ అవుతోంది...'
            : 'Loading article...'}
        </p>
      </div>
    );
  }

  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center px-4">

        <p className="font-ntr text-[#781D22] text-lg mb-5">
          {error}
        </p>

        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-sm font-ntr font-semibold text-[#781D22] hover:text-[#9B282F]"
        >
          <ArrowLeft className="w-4 h-4" />

          {isTelugu
            ? 'వ్యాసాలకు తిరిగి వెళ్ళండి'
            : 'Back to Articles'}
        </Link>

      </div>
    );
  }

  /* ============================================================
     ARTICLE NOT FOUND
  ============================================================ */

  if (!article) {
    return (
      <div className="min-h-screen bg-[#FAF7F0] flex flex-col items-center justify-center px-4">

        <p className="font-ntr text-[#57524C] text-lg mb-5">
          {isTelugu
            ? 'వ్యాసం కనుగొనబడలేదు.'
            : 'Article not found.'}
        </p>

        <Link
          to="/stories"
          className="inline-flex items-center gap-2 text-sm font-ntr font-semibold text-[#781D22] hover:text-[#9B282F]"
        >
          <ArrowLeft className="w-4 h-4" />

          {isTelugu
            ? 'వ్యాసాలకు తిరిగి వెళ్ళండి'
            : 'Back to Articles'}
        </Link>

      </div>
    );
  }

  /* ============================================================
     ARTICLE DATA
  ============================================================ */

  const images = article.images || [];
  const image = images[currentImage];

  const title = isTelugu
    ? article.title_telugu || article.title
    : article.title;

  const description = isTelugu
    ? article.description_telugu ||
      article.description
    : article.description;

  const content = isTelugu
    ? article.content_telugu ||
      article.content
    : article.content;

  /* ============================================================
     IMAGE NAVIGATION
  ============================================================ */

  const previousImage = () => {
    setCurrentImage((current) =>
      current > 0 ? current - 1 : current
    );
  };

  const nextImage = () => {
    setCurrentImage((current) =>
      current < images.length - 1
        ? current + 1
        : current
    );
  };

  /* ============================================================
     SPLIT ARTICLE INTO PARAGRAPHS
  ============================================================ */

  const paragraphs = content
    ? content
        .split(/\n\s*\n/)
        .map((paragraph) => paragraph.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-[#FAF7F0] py-8 sm:py-12 px-4 sm:px-6 lg:px-8 font-ntr">

      <div className="max-w-6xl mx-auto">

        {/* ======================================================
            BACK BUTTON
        ======================================================= */}

        <Link
          to="/stories"
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-ntr
            font-semibold
            text-[#781D22]
            hover:text-[#9B282F]
            mb-8
          "
        >
          <ArrowLeft className="w-4 h-4" />

          {isTelugu
            ? 'వ్యాసాలకు తిరిగి వెళ్ళండి'
            : 'Back to Articles'}
        </Link>


        {/* ======================================================
            1. ARTICLE TITLE
        ======================================================= */}

        <header className="mb-8">

          <h1
            className="
              font-gurajada
              text-4xl
              sm:text-5xl
              lg:text-6xl
              font-bold
              text-[#1C1917]
              leading-tight
            "
          >
            {title}
          </h1>

        </header>


        {/* ======================================================
            2. COMPLETE ARTICLE IMAGE
        ======================================================= */}

        {image && (
          <section className="mb-10">

            <div
              className="
                border-2
                border-[#D6CFC7]
                bg-white
                p-3
                sm:p-5
              "
            >

              {/* Image container */}

              <div
                className="
                  bg-[#FAF7F0]
                  flex
                  items-center
                  justify-center
                  w-full
                  overflow-hidden
                "
              >

                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${image.image_url}`}
                  alt={
                    image.caption ||
                    `${title} - ${currentImage + 1}`
                  }
                  className="
                    block
                    w-auto
                    h-auto
                    max-w-[70%]
                    max-h-[650px]
                    object-contain
                    mx-auto
                  "
                />

              </div>


              {/* Image Caption */}

              {image.caption && (
                <p
                  className="
                    text-center
                    text-sm
                    text-[#57524C]
                    mt-3
                    px-2
                  "
                >
                  {image.caption}
                </p>
              )}

            </div>


            {/* ==================================================
                IMAGE NAVIGATION
            =================================================== */}

            {images.length > 1 && (
              <div
                className="
                  flex
                  items-center
                  justify-between
                  mt-5
                "
              >

                <button
                  type="button"
                  onClick={previousImage}
                  disabled={currentImage === 0}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-[#F4EFE6]
                    text-[#781D22]
                    border
                    border-[#D6CFC7]
                    disabled:opacity-40
                    hover:bg-[#EFE4CA]
                    transition-colors
                  "
                >
                  <ChevronLeft className="w-4 h-4" />

                  {isTelugu
                    ? 'మునుపటి'
                    : 'Previous'}
                </button>


                <span className="text-sm text-[#57524C]">
                  {currentImage + 1} / {images.length}
                </span>


                <button
                  type="button"
                  onClick={nextImage}
                  disabled={
                    currentImage === images.length - 1
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    bg-[#F4EFE6]
                    text-[#781D22]
                    border
                    border-[#D6CFC7]
                    disabled:opacity-40
                    hover:bg-[#EFE4CA]
                    transition-colors
                  "
                >
                  {isTelugu
                    ? 'తదుపరి'
                    : 'Next'}

                  <ChevronRight className="w-4 h-4" />
                </button>

              </div>
            )}

          </section>
        )}


        {/* ======================================================
            3. CONTEXT / DESCRIPTION
        ======================================================= */}

        {description && (
          <section
            className="
              mb-10
              border-l-4
              border-[#781D22]
              bg-[#F4EFE6]
              px-5
              sm:px-7
              py-5
            "
          >

            <p
              className="
                font-ntr
                text-base
                sm:text-lg
                text-[#3F3A36]
                leading-8
              "
            >
              {description}
            </p>

          </section>
        )}


        {/* ======================================================
            4. ARTICLE CONTENT
        ======================================================= */}

        {paragraphs.length > 0 && (
          <article
            className="
              columns-1
              md:columns-2
              gap-10
              lg:gap-14
              text-justify
            "
          >

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="
                  font-ntr
                  text-base
                  sm:text-lg
                  text-[#292522]
                  leading-8
                  mb-6
                  break-inside-avoid
                "
              >
                {paragraph}
              </p>
            ))}

          </article>
        )}


        {/* ======================================================
            NO ARTICLE CONTENT
        ======================================================= */}

        {paragraphs.length === 0 && (
          <div
            className="
              py-10
              text-center
              border-t
              border-[#D6CFC7]
            "
          >
            <p className="font-ntr text-[#57524C]">
              {isTelugu
                ? 'ఈ వ్యాసానికి కంటెంట్ అందుబాటులో లేదు.'
                : 'Article content is not available yet.'}
            </p>
          </div>
        )}


        {/* ======================================================
            5. IMAGE THUMBNAILS
        ======================================================= */}

        {images.length > 1 && (
          <div className="flex gap-3 mt-10 overflow-x-auto pb-3">

            {images.map((img, index) => (
              <button
                key={img.image_id}
                type="button"
                onClick={() => setCurrentImage(index)}
                className={`
                  flex-shrink-0
                  border-2
                  ${
                    currentImage === index
                      ? 'border-[#781D22]'
                      : 'border-[#D6CFC7]'
                  }
                `}
              >
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${img.image_url}`}
                  alt={
                    isTelugu
                      ? `పేజీ ${index + 1}`
                      : `Page ${index + 1}`
                  }
                  className="
                    w-20
                    h-24
                    object-cover
                  "
                />
              </button>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}
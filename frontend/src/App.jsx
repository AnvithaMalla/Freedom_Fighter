import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { BookmarkProvider } from './context/BookmarkContext';

// Layout Components
import Masthead from './components/layout/Masthead';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import FightersPage from './pages/FightersPage';
import FighterDetailsPage from './pages/FighterDetailsPage';
import ArchivePage from './pages/ArchivePage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailsPage from './pages/StoryDetailsPage';
import AboutPage from './pages/AboutPage';

// Scroll to top helper on navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppShell() {
  const { isTelugu } = useLanguage();

  return (
    <BookmarkProvider>
      <Router>
        <ScrollToTop />
        <div className={`min-h-screen flex flex-col text-[#1C1917] ${isTelugu ? '' : 'english-editorial'}`}>
            {/* 1. Historical Newspaper Masthead */}
            <Masthead />

            {/* 2. Responsive Editorial Section Bar */}
            <Navbar />

            {/* 3. Main Page View Container */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/fighters" element={<FightersPage />} />
                <Route path="/fighters/:id" element={<FighterDetailsPage />} />
                <Route path="/archive" element={<ArchivePage />} />
                <Route path="/stories" element={<StoriesPage />} />
                <Route path="/stories/:id" element={<StoryDetailsPage />} />
                <Route path="/articles" element={<StoriesPage />} />
                <Route path="/articles/:id" element={<StoryDetailsPage />} />
                <Route path="/about" element={<AboutPage />} />
              </Routes>
            </main>

            {/* 4. Historical Newspaper Colophon Footer */}
            <Footer />
        </div>
      </Router>
    </BookmarkProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

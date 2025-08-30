import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { CursorTrail } from './components/UI/CursorTrail';
import { Header } from './components/UI/Header';
import { ProjectGrid } from './components/ProjectGrid';
import { Pagination } from './components/UI/Pagination';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchProjects } from './store/projectsSlice';
import { ProjectDetail } from './page/ProjectDetail';
import MobilePrompt from './components/MobilePrompt';

// New page component
// import { ProjectDetail } from './components/ProjectDetail';

function AppContent() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const [desktopConfirmed, setDesktopConfirmed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setIsMobile(true);
    }
  }, []);
  useEffect(() => {
    dispatch(fetchProjects());

    // Set initial theme
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [dispatch, isDarkMode]);

  // Auto-refresh data every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchProjects());
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);
  // if (isMobile && !desktopConfirmed) {
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen p-4 text-gray-800 bg-gray-100 dark:bg-gray-900 dark:text-gray-200">
  //       <h1 className="mb-4 text-2xl font-bold">Desktop Mode Recommended</h1>
  //       <p className="mb-6 text-center">
  //         For the best experience, please switch to desktop mode.
  //       </p>
  //       <div className="space-x-4">
  //         <button
  //           onClick={() => {
  //             const viewport = document.querySelector(
  //               'meta[name="viewport"]'
  //             );
  //             if (viewport) {
  //               viewport.setAttribute('content', 'width=720'); // desktop-like view
  //             }
  //             setDesktopConfirmed(true);
  //           }}
  //           className="px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
  //         >
  //           Switch to Desktop Mode
  //         </button>
  //         <button
  //           onClick={() => {
  //             window.location.href = '/'; // Redirect to home page
  //           }}
  //           className="px-4 py-2 text-gray-800 transition bg-gray-300 rounded hover:bg-gray-400"
  //         >
  //           Go Back Home
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }
  if (isMobile && !desktopConfirmed) {
    return <MobilePrompt onConfirm={() => setDesktopConfirmed(true)} />;
  }
  

  return (
    <div
      className={`min-h-screen transition-all duration-500
        ${isDarkMode
          ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900'
          : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
        }`}
    >
      <CursorTrail />

      <div className="relative z-20">
        <Header />

        <main className="px-6 py-8 mx-auto max-w-7xl">
          <Routes>
            {/* Home page */}
            <Route
              path="/"
              element={
                <>
                  <ProjectGrid />
                  <Pagination />
                </>
              }
            />
            {/* Dynamic project page */}
            <Route path="/project/:title" element={<ProjectDetail />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;

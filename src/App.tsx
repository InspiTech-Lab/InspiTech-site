import React, { useEffect } from 'react';
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

// New page component
// import { ProjectDetail } from './components/ProjectDetail';

function AppContent() {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

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

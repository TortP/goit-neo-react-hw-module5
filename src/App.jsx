import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import LoaderModal from './components/LoaderModal/LoaderModal';
import './App.css';


const HomePage = lazy(() => import('./components/pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('./components/pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./components/pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./components/pages/NotFoundPage/NotFoundPage'));
const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <div className="app">
      <Navigation />
      <Suspense fallback={<LoaderModal />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
import { lazy, Suspense } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Home } from '@/pages/Home';
import { SystemPage } from '@/pages/SystemPage';
import { Loading, NotFound } from '@/pages/Misc';

// Carga diferida por ruta: nada de capítulos, manual ni práctica se descarga al entrar.
const ChapterPage = lazy(() => import('@/pages/ChapterPage').then((m) => ({ default: m.ChapterPage })));
const ManualPage = lazy(() => import('@/pages/Manual').then((m) => ({ default: m.ManualPage })));
const PrintManual = lazy(() => import('@/pages/Manual').then((m) => ({ default: m.PrintManual })));
const PracticePage = lazy(() => import('@/pages/Study').then((m) => ({ default: m.PracticePage })));
const ExamPage = lazy(() => import('@/pages/Study').then((m) => ({ default: m.ExamPage })));
const ReviewPage = lazy(() => import('@/pages/Study').then((m) => ({ default: m.ReviewPage })));
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then((m) => ({ default: m.ProgressPage })));
const ManeuversPage = lazy(() => import('@/pages/ManeuversPage').then((m) => ({ default: m.ManeuversPage })));
const SearchPage = lazy(() => import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage })));

export function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/imprimir/:id" element={<PrintManual />} />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="sistema/:id" element={<SystemPage />} />
            <Route path="capitulo/:id" element={<ChapterPage />} />
            <Route path="manual/:id" element={<ManualPage />} />
            <Route path="practica" element={<PracticePage />} />
            <Route path="examen" element={<ExamPage />} />
            <Route path="repasar" element={<ReviewPage />} />
            <Route path="progreso" element={<ProgressPage />} />
            <Route path="maniobras" element={<ManeuversPage />} />
            <Route path="buscar" element={<SearchPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

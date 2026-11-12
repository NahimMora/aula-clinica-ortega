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
const PreguntasPage = lazy(() => import('@/pages/PreguntasPage').then((m) => ({ default: m.PreguntasPage })));
const SearchPage = lazy(() => import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage })));
const ImprimirParcial = lazy(() => import('@/pages/ImprimirParcial').then((m) => ({ default: m.ImprimirParcial })));
const ImprimirParcialCompacto = lazy(() => import('@/pages/ImprimirParcialCompacto').then((m) => ({ default: m.ImprimirParcialCompacto })));
const ParcialPage = lazy(() => import('@/pages/ParcialPage').then((m) => ({ default: m.ParcialPage })));

export function App() {
  return (
    <HashRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/imprimir/:id" element={<PrintManual />} />
          <Route path="/imprimir-parcial/:sistema" element={<ImprimirParcial />} />
          <Route path="/imprimir-parcial/:sistema/compacto" element={<ImprimirParcialCompacto />} />
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
            <Route path="preguntas" element={<PreguntasPage />} />
            <Route path="buscar" element={<SearchPage />} />
            <Route path="parcial" element={<ParcialPage />} />
            <Route path="parcial/:sec" element={<ParcialPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

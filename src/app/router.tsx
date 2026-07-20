import { createMemoryRouter, createBrowserRouter, type RouteObject } from 'react-router-dom';
import { ArchetypesPage } from '../features/archetypes/ArchetypesPage';
import { AssessmentPage } from '../features/assessment/AssessmentPage';
import { HomePage } from '../features/home/HomePage';
import { ResultPage } from '../features/result/ResultPage';
import { RevealPage } from '../features/reveal/RevealPage';

const routes: RouteObject[] = [
  { path: '/', element: <HomePage /> },
  { path: '/test/:mode', element: <AssessmentPage /> },
  { path: '/reveal', element: <RevealPage /> },
  { path: '/result', element: <ResultPage /> },
  { path: '/archetypes', element: <ArchetypesPage /> },
];

export function createAppRouter(initialEntries?: string[]) {
  return initialEntries
    ? createMemoryRouter(routes, { initialEntries })
    : createBrowserRouter(routes);
}

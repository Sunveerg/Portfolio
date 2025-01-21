import { createBrowserRouter } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import SunveerPage from './pages/SunveerPage';
const router = createBrowserRouter([
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.SunveerPage,
    element: <SunveerPage />,
  },
]);

export default router;

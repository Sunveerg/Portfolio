import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PathRoutes } from './path.routes';
import HomePage from './pages/HomePage';
import SunveerPage from './pages/SunveerPage';
import CallbackPage from './pages/CallbackPage'
const router = createBrowserRouter([
  {
    path: PathRoutes.Default, // Path for "/"
    element: <Navigate to={PathRoutes.HomePage} replace />,
  },
  {
    path: PathRoutes.HomePage,
    element: <HomePage />,
  },
  {
    path: PathRoutes.SunveerPage,
    element: <SunveerPage />,
  },
  {
    path: PathRoutes.CallbackPage,
    element: <CallbackPage />
  }
]);

export default router;

import {createBrowserRouter, Navigate} from 'react-router-dom';
import {PathRoutes} from './path.routes';
import HomePage from './pages/HomePage';
import SunveerPage from './pages/SunveerPage';
import CallbackPage from './pages/CallbackPage'
import ProjectsPage from "./pages/ProjectsPage";
import CommentsPage from "./pages/CommentsPage";
import AddProject from "./features/AddProject";
import UpdateProject from "./features/UpdateProject";
import AddComment from "./features/AddComment";
import Email from "./features/Email";

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
  },
  {
    path: PathRoutes.Projects,
    element: <ProjectsPage />
  },
  {
    path: PathRoutes.Comments,
    element: <CommentsPage />
  },
  {
    path: PathRoutes.AddComment,
    element: <AddComment />
  },
  {
    path: PathRoutes.AddProject,
    element: <AddProject />
  },
  {
    path: PathRoutes.UpdateProject,
    element: <UpdateProject />
  },
  {
    path: PathRoutes.Email,
    element: <Email />
  }
]);

export default router;

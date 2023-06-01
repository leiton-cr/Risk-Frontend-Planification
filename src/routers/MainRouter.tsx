import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../pages/login/Login";
import Index from "../pages/index/Index";
import AuthGuard from "../guards/AuthGuard";
import LoginGuard from "../guards/LoginGuard";
import Template from "../shared/components/template/Template";
import Details from "../pages/details/Details";
import Matrix from "../pages/matrix/Matrix";
import AppSelect from "../pages/search/Search";

const MainRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: (
        <LoginGuard>
          {" "}
          <Login />{" "}
        </LoginGuard>
      ),
    },
    {
      path: "/",
      //element: <Template title="Index"><Index /></Template>,
      element: (
        <AuthGuard>
          <Template title="Index" icon="bi bi-house-fill">
            <Index />
          </Template>
        </AuthGuard>
      ),
    },
    {
      path: "/create",
      //element: <Template title="Create"><Details /></Template>,
      element: (
        <AuthGuard>
          <Template title="Create" icon="bi bi-house-fill">
            <Details />
          </Template>
        </AuthGuard>
      ),
    },
    {
      path: "/edit/:id",
      //element: <Template title="Modify"><Details /></Template>,
      element: (
        <AuthGuard>
          <Template title="Modify" icon="bi bi-house-fill">
            <Details />
          </Template>
        </AuthGuard>
      ),
    },
    {
      path: "/matrix/:id",
      //element: <Template title="Matrix"><Matrix /></Template>,
      element: (
        <AuthGuard>
          <Template title="Matrix" icon="bi bi-house-fill">
            <Matrix />
          </Template>
        </AuthGuard>
      ),
    },
    {
      path: "/search", element: (<AppSelect></AppSelect>)
    }
  ]);

  return <RouterProvider router={router} />;
};

export default MainRouter;

import Account from "./components/Account";
import Login from "./components/Login";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./context/authProvider";
import RequireAuth from "./components/RequireAuth";
import UsersList from "./components/UsersList";
import Unauthorized from "./components/UnAuthorized";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <Account />,
        },
      ],
    },
    {
      path: "/users",
      element: <RequireAuth requiredRoles={["admin"]} />,
      children: [
        {
          path: "/users",
          element: <UsersList />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth roles={["admin"]} />,
      children: [
        {
          path: "/admin",
          element: <h1>Hey Admin</h1>,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Register />,
    },
    {
      path: "/unauthorized",
      element: <Unauthorized />,
    },
  ]);

  return (
    <AuthProvider>
      <div className="flex justify-center flex-col gap-10 lg:max-w-[1200px] mx-auto items-center ">
        <ToastContainer />
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;

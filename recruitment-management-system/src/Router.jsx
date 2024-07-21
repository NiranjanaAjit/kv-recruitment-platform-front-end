import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";

import EmployeeHomeLayout from "./pages/EmployeeHomeLayout/EmployeeHomeLayout";
import "../src/App.scss";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound/NotFound";
import { setRole, signIn } from "./store/authReducer";
import { roleEnum } from "./utils/role.enum";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminHomeLayout from "./pages/AdminHomeLayout/AdminHomeLayout";
import EmployeeDashboard from "./pages/EmployeeDashboard/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";

function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    // const token = localStorage.getItem("accessToken");
    // if (!token) return;
    // dispatch(signIn());
    // const decoded = jwtDecode(token);
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    dispatch(signIn());
    const role = localStorage.getItem("role");
    // const role =
    // decoded.role === roleEnum.ADMIN ? roleEnum.ADMIN : roleEnum.NORMAL_USER;
    dispatch(setRole(role));
  });

  const route = createBrowserRouter([
    {
      //ADDITION : Login Page and assign
      path: "/",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/employee",
      element: <ProtectedRoute role={roleEnum.NORMAL_USER} />,
      children: [
        {
          path: "/employee",
          element: <EmployeeHomeLayout />,
          children: [
            {
              index: true,
              element: <EmployeeDashboard />,
            },
          ],
        },
      ],
    },
    {
      path: "/admin",
      element: <ProtectedRoute role={roleEnum.ADMIN} />,
      children: [
        {
          index: "/admin",
          element: <AdminHomeLayout />,
          children: [
            {
              index: true,
              element: <AdminDashboard />,
            },
          ],
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={route}></RouterProvider>
    </>
  );
}

export default Router;
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './components/auth/AuthLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminLayout from './components/admin-layouts/AdminLayout';
import AdminDashboard from './pages/admin-view/AdminDashboard';
import AdminProducts from './pages/admin-view/AdminProducts';
import AdminOrders from './pages/admin-view/AdminOrders';
import AdminFeatures from './pages/admin-view/AdminFeatures';
import NotFound from './pages/NotFound';
import ShoppingLayout from './components/shopping-layout/ShoppingLayout';
import ShoppingHeader from './components/shopping-layout/ShoppingHeader';
import ProtectedRoute from './components/common/ProtectedRoute';
import UnAuthPage from './pages/UnAuthPage';
import ShoppingHome from './pages/shopping-view/ShoppingHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { checkauth } from './store/auth-slice';
import ShoppingListing from './pages/shopping-view/ShoppingListing';
import { Skeleton } from "@/components/ui/skeleton";
import './App.css';
import Spinner from './pages/Spinner';


function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user, isLoading } = useSelector((store) => store.auth);


  useEffect(() => {
    dispatch(checkauth());
  }, [dispatch]);

  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} user={user}>
          <AuthLayout />
        </ProtectedRoute>
      ),
    },
    {
      path: '/auth',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} user={user}>
          <AuthLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} user={user}>
          <AdminLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: 'dashboard', element: <AdminDashboard /> },
        { path: 'products', element: <AdminProducts /> },
        { path: 'orders', element: <AdminOrders /> },
        { path: 'features', element: <AdminFeatures /> },
      ],
    },
    {
      path: '/shop',
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading} user={user}>
          <ShoppingLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: 'header', element: <ShoppingHeader /> },
        { path: 'home', element: <ShoppingHome /> },
        { path: 'listing', element: <ShoppingListing /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/un-auth-page',
      element: <UnAuthPage />,
    },
  ]);

  // if (!isAuthenticated && isLoading) {
  //   return <Skeleton className="w-[100px] h-[20px] rounded-full" />;
  // }

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

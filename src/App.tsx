import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import MainLayout from './layouts/MainLayout';
import HomePage from './pages/welcome/home';
import LoginPage from './pages/Login/Login';
import ProductDetailPage from './pages/ProductDetails';

const router = createBrowserRouter([
  {
    // This is the main layout for most of your site
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true, // This makes HomePage the default page for '/'
        element: <HomePage />,
      },
      {
        path: '/product/:productId',
        element: <ProductDetailPage />,
      },
      // --- Add other pages that use the MainLayout here ---
      // {
      //   path: '/shop',
      //   element: <ShopPage />,
      // },
      // {
      //   path: '/about',
      //   element: <AboutPage />,
      // },
    ],
  },
  {
    // This is a separate route for the login page
    // It does NOT use the MainLayout
    path: '/login',
    element: <LoginPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
  );
}

export default App;
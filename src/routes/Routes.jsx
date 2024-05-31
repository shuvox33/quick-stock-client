import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import CreateStore from '../pages/Create-Store/CreateStore'
import PrivateRoutes from './PrivateRoutes'
import DashBoardLayout from '../layouts/DashBoardLayout'
import ProductManagement from '../pages/DashBoard/Manager/ProductManagement/ProductManagement'


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'create-store',
        element: <PrivateRoutes><CreateStore></CreateStore></PrivateRoutes>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path:'/dashboard',
    element:<PrivateRoutes><DashBoardLayout></DashBoardLayout></PrivateRoutes>,
    children:[{
      path:'product-management',
      element: <PrivateRoutes><ProductManagement></ProductManagement></PrivateRoutes>
    }]
  }
])


//External Lib Import
import { lazy, Suspense } from 'react';

//Internal Lib Import
import LazyLoader from '../components/LazyLoader';
const Login = lazy(() => import('../screens/Login'));
const Register = lazy(() => import('../screens/Register'));
const ForgetPassword = lazy(() => import('../screens/ForgetPassword'));
const NotAccess = lazy(() => import('../screens/NotAccess'));
const VerifyEmail = lazy(() => import('../screens/VerifyEmail'));
const ResetPassword = lazy(() => import('../screens/ResetPassword'));
const Error = lazy(() => import('../screens/Error'));

const LazyLoading = ({ children }) => {
  return <Suspense fallback={<LazyLoader />}>{children}</Suspense>;
};

const publicRoutes = [
  {
    path: 'login',
    element: (
      <LazyLoading>
        <Login />
      </LazyLoading>
    ),
  },
  {
    path: 'register',
    element: (
      <LazyLoading>
        <Register />
      </LazyLoading>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <LazyLoading>
        <ForgetPassword />
      </LazyLoading>
    ),
  },
  {
    path: 'verify-email',
    element: (
      <LazyLoading>
        <VerifyEmail />
      </LazyLoading>
    ),
  },
  {
    path: 'reset-password',
    element: (
      <LazyLoading>
        <ResetPassword />
      </LazyLoading>
    ),
  },
  {
    path: 'not-access',
    element: (
      <LazyLoading>
        <NotAccess />
      </LazyLoading>
    ),
  },
  {
    path: '*',
    element: (
      <LazyLoading>
        <Error />
      </LazyLoading>
    ),
  },
];

export default publicRoutes;

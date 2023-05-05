import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';

function useAuth() {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);
  const [authToken, setAuthToken] = useState();

  useEffect(() => {
    authCheck(router.asPath);

    // set authorized to false to hide page content while changing routes
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);

    // run auth check on route change
    router.events.on('routeChangeComplete', authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    let token = null;

    const authData = localStorage.getItem('make-anything-user');
    const parsedAuthData = JSON.parse(authData);
    if (parsedAuthData?.token) {
      token = parsedAuthData?.token;
      setAuthToken(token);
    }
    // redirect to login page if accessing a private page and not logged in
    const publicPaths = [
      '/login',
      '/signup',
      '/home',
      '/',
      '/home/start-making',
      '/home/start-making/build-your-own',
      '/home/start-making/build-your-own/help-carft',
      '/home/start-making/inspiration',
      '/home/start-making/inspiration/roll-dice',
      '/home/start-making/pick-from-a-collection',
      '/home/start-making/pick-from-a-collection/featured-collection',
      '/faq',
      'community-curated',
      '/contact',
      '/privacy-policy',
      '/terms-of-services',
    ];
    const authPaths = ['/login', '/signup'];
    const path = url.split('?')[0];

    if (!token && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: '/login',
      });
    } else if (authPaths.includes(path) && token) {
      setAuthorized(false);
      router.push({
        pathname: '/home',
      });
    } else {
      setAuthorized(true);
    }
  }

  return { authorized, authToken };
}
export default useAuth;

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '../components/Shared/Layout/Layout';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/home');
  }, [router]);

  return (
    <>
      <Layout></Layout>
    </>
  );
}

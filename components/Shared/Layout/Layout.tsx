import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { useRouter } from 'next/router';

function Layout({ children }: any) {
  const flexCenter = 'flex items-center justify-center';
  const router = useRouter();
  const activePage = router.pathname;

  return (
    <div className={`${flexCenter} flex-col w-full relative`}>
      <Header activePage={activePage} />
      <div className={`${flexCenter} bg-[#10192f] pt-[80px] w-full flex-col`}>
        <div className="w-full min-h-[calc(100vh-357px)]">{children}</div>
        <Footer activePage={activePage} />
      </div>
    </div>
  );
}

export default Layout;

import React from 'react';
import PrivacyPolicy from '../../components/PrivacyPolicy/PrivacyPolicy';
import Layout from '../../components/Shared/Layout/Layout';
function index() {
  return (
    <Layout>
      <div className="min-h-screen">
        <PrivacyPolicy />
      </div>
    </Layout>
  );
}

export default index;

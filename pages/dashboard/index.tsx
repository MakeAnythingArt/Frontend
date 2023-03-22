import React from 'react';
import DashboardBanner from '../../components/Dashboard/DashboardBanner/DashboardBanner';
import DashboardDetails from '../../components/Dashboard/DashboardDetails/DashboardDetails';
import Layout from '../../components/Shared/Layout/Layout';

function index() {
  return (
    <Layout>
      <DashboardBanner />
      <DashboardDetails />
    </Layout>
  );
}

export default index;

import React from 'react';
import InspirationBanner from '../../../../../components/Inspiration/InspirationBanner';
import RollDice from '../../../../../components/Inspiration/RollDice/RollDice';
import Layout from '../../../../../components/Shared/Layout/Layout';

function index() {
  return (
    <Layout>
      <InspirationBanner />
      <RollDice />
    </Layout>
  );
}

export default index;

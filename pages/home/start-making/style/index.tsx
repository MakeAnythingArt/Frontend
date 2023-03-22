import React from 'react';
import Layout from '../../../../components/Shared/Layout/Layout';
import PickCollectionCards from '../../../../components/Shared/PickCollectionCards/PickCollectionCards';
import StartStyle from '../../../../components/Start-Style/StartStyle';

const cardsData = [
  {
    id: 1,
    name: 'Water color',
    src: '/Assets/Images/orange_umbrella.svg',
  },
  {
    id: 2,
    name: 'Studio Photography',
    src: '/Assets/Images/brown_umbrella.svg',
  },
  {
    id: 3,
    name: 'Color Pencil',
    src: '/Assets/Images/pink_umbrella.svg',
  },
  {
    id: 4,
    name: 'Pencil Sketch',
    src: '/Assets/Images/white_umbrella.svg',
  },
  {
    id: 5,
    name: 'Threed Game',
    src: '/Assets/Images/yellow_umbrella.svg',
  },
  {
    id: 6,
    name: 'Steampunk',
    src: '/Assets/Images/golden_umbrella.svg',
  },
  {
    id: 7,
    name: 'Cyberpunk',
    src: '/Assets/Images/pink_blue_umbrella.svg',
  },
  {
    id: 8,
    name: 'Surrealism',
    src: '/Assets/Images/brown_white_umbrella.svg',
  },
  {
    id: 9,
    name: 'Grafitti',
    src: '/Assets/Images/pink_sky_umbrella.svg',
  },
  {
    id: 10,
    name: 'Stained Glass',
    src: '/Assets/Images/multi_color_umbrella.svg',
  },
];

function Index() {
  return (
    <Layout>
      <StartStyle />
      <PickCollectionCards buttonText="Apply Style" cardsData={cardsData} />
    </Layout>
  );
}

export default Index;

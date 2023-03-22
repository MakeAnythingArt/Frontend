import type { MenuProps } from 'antd';

const styleDropDownItems: MenuProps['items'] = [
  {
    key: 'DEFAULT',
    label: 'DEFAULT',
  },
  {
    key: 'FANTASY',
    label: 'FANTASY',
  },
  {
    key: 'DRAWING',
    label: 'DRAWING',
  },
  {
    key: 'THREED_RENDER',
    label: 'THREED_RENDER',
  },
  {
    key: 'PHOTO_REAL',
    label: 'PHOTO_REAL',
  },
  {
    key: 'SURREALISM',
    label: 'SURREALISM',
  },
  {
    key: 'COLOR_PENCIL',
    label: 'COLOR_PENCIL',
  },
  {
    key: 'WATER_COLOR',
    label: 'WATER_COLOR',
  },
  {
    key: 'THREED_GAME',
    label: 'THREED_GAME',
  },
  {
    key: 'STUDIO_PHOTOGRAPHY',
    label: 'STUDIO_PHOTOGRAPHY',
  },
  {
    key: 'STEAMPUNK',
    label: 'STEAMPUNK',
  },
  {
    key: 'CYBERPUNK',
    label: 'CYBERPUNK',
  },
  {
    key: 'GRAFITTI',
    label: 'GRAFITTI',
  },
  {
    key: 'STAINED_GLASS',
    label: 'STAINED_GLASS',
  },
];

const adjectiveDropDownItems: MenuProps['items'] = [
  {
    key: 'A gorgeous',
    label: 'A gorgeous',
  },
  {
    key: 'A dramatic',
    label: 'A dramatic',
  },
  {
    key: 'An epic',
    label: 'An epic',
  },
  {
    key: 'An adorable',
    label: 'An adorable',
  },
  {
    key: 'A mindblowing',
    label: 'A mindblowing',
  },
  {
    key: 'An ancient',
    label: 'An ancient',
  },
  {
    key: 'A colorful',
    label: 'A colorful',
  },
  {
    key: 'A cozy',
    label: 'A cozy',
  },
  {
    key: 'A dreamlike',
    label: 'A dreamlike',
  },
  {
    key: 'A groovy',
    label: 'A groovy',
  },
  {
    key: 'A mind-bending',
    label: 'A mind-bending',
  },
  {
    key: 'A minimal',
    label: 'A minimal',
  },
  {
    key: 'A moody',
    label: 'A moody',
  },
  {
    key: 'An impressive',
    label: 'An impressive',
  },
  {
    key: 'An otherwordly',
    label: 'An otherwordly',
  },
  {
    key: 'A psychadelic',
    label: 'A psychadelic',
  },
  {
    key: 'An enormous',
    label: 'An enormous',
  },
];

const artistDropDownItems: MenuProps['items'] = [
  {
    key: 'by Salvidor Dali',
    label: 'by Salvidor Dali',
  },
  {
    key: 'by Leonardo DaVinci',
    label: 'by Leonardo DaVinci',
  },
  {
    key: 'by Voncent van Gogh',
    label: 'by Voncent van Gogh',
  },
  {
    key: 'by Andy Warhol',
    label: 'by Andy Warhol',
  },
  {
    key: 'NONE',
    label: 'NONE',
  },
];

const items: MenuProps['items'] = [
  {
    key: 'person playing the violin',
    label: 'person playing the violin',
  },
  {
    key: 'sun setting behind mountains',
    label: 'sun setting behind mountains',
  },
  {
    key: 'rainbows above a field',
    label: 'rainbows above a field',
  },
  {
    key: 'lamb sleeping in the sun',
    label: 'lamb sleeping in the sun',
  },
  {
    key: 'Plants/Flowers',
    label: 'Plants/Flowers',
    children: [
      {
        key: 'Mushroom',
        label: 'Mushroom',
      },
      {
        key: 'Cactus',
        label: 'Cactus',
      },
      {
        key: 'Sunflower',
        label: 'Sunflower',
      },
      {
        key: 'Rose',
        label: 'Rose',
      },
      {
        key: 'Tulip',
        label: 'Tulip',
      },
      {
        key: 'Lily',
        label: 'Lily',
      },
      {
        key: 'Orchid',
        label: 'Orchid',
      },
      {
        key: 'Daisy',
        label: 'Daisy',
      },
      {
        key: 'Carnation',
        label: 'Carnation',
      },
      {
        key: 'Chrysanthemum',
        label: 'Chrysanthemum',
      },
      {
        key: 'Marigold',
        label: 'Marigold',
      },
      {
        key: 'Hibiscus',
        label: 'Hibiscus',
      },
    ],
  },
  {
    key: 'Animal',
    label: 'Animal',
    children: [
      {
        key: 'cat',
        label: 'cat',
      },
      {
        key: 'dog',
        label: 'dog',
      },
      {
        key: 'bird',
        label: 'bird',
      },
      {
        key: 'turtle',
        label: 'turtle',
      },
      {
        key: 'giraffe',
        label: 'giraffe',
      },
      {
        key: 'hamster',
        label: 'hamster',
      },
      {
        key: 'panda',
        label: 'panda',
      },
      {
        key: 'mouse',
        label: 'mouse',
      },
      {
        key: 'snail',
        label: 'snail',
      },
      {
        key: 'fish',
        label: 'fish',
      },
      {
        key: 'rabbit',
        label: 'rabbit',
      },
      {
        key: 'wolf',
        label: 'wolf',
      },
    ],
  },
  {
    key: 'Bugs',
    label: 'Bugs',
    children: [
      {
        key: 'Bee',
        label: 'Bee',
      },
      {
        key: 'Butterfly',
        label: 'Butterfly',
      },
      {
        key: 'Ladybug',
        label: 'Ladybug',
      },
      {
        key: 'Praying mantis',
        label: 'Praying mantis',
      },
      {
        key: 'Grasshopper',
        label: 'Grasshopper',
      },
      {
        key: 'Beetle',
        label: 'Beetle',
      },
      {
        key: 'Ant',
        label: 'Ant',
      },
      {
        key: 'Spider',
        label: 'Spider',
      },
      {
        key: 'Dragonfly',
        label: 'Dragonfly',
      },
    ],
  },
  {
    key: 'Cars',
    label: 'Cars',
    children: [
      {
        key: 'Ferrari',
        label: 'Ferrari',
      },
      {
        key: 'Lamborghini',
        label: 'Lamborghini',
      },
      {
        key: 'Porsche',
        label: 'Porsche',
      },
      {
        key: 'Mercedes-Benz',
        label: 'Mercedes-Benz',
      },
      {
        key: 'Audi',
        label: 'Audi',
      },
      {
        key: 'BMW',
        label: 'BMW',
      },
      {
        key: 'Ford Mustang',
        label: 'Ford Mustang',
      },
      {
        key: 'Chevrolet Corvette',
        label: 'Chevrolet Corvette',
      },
      {
        key: 'Aston Martin',
        label: 'Aston Martin',
      },
      {
        key: 'Lexus',
        label: 'Lexus',
      },
    ],
  },
  {
    key: 'Food',
    label: 'Food',
    children: [
      {
        key: 'Pizza',
        label: 'Pizza',
      },
      {
        key: 'Burgers',
        label: 'Burgers',
      },
      {
        key: 'Fries',
        label: 'Fries',
      },
      {
        key: 'Steak',
        label: 'Steak',
      },
      {
        key: 'Pasta',
        label: 'Pasta',
      },
      {
        key: 'Sushi',
        label: 'Sushi',
      },
      {
        key: 'Tacos',
        label: 'Tacos',
      },
      {
        key: 'Chicken wings',
        label: 'Chicken wings',
      },
      {
        key: 'Ice cream',
        label: 'Ice cream',
      },
      {
        key: 'Donuts',
        label: 'Donuts',
      },
    ],
  },
  {
    key: 'Nature',
    label: 'Nature',
    children: [
      {
        key: 'Forest',
        label: 'Forest',
      },
      {
        key: 'Mountains',
        label: 'Mountains',
      },
      {
        key: 'Beach',
        label: 'Beach',
      },
      {
        key: 'Waterfall',
        label: 'Waterfall',
      },
    ],
  },
  {
    key: 'Architecture',
    label: 'Architecture',
    children: [
      {
        key: 'Modern architecture',
        label: 'Modern architecture',
      },
      {
        key: 'Classical architecture',
        label: 'Classical architecture',
      },
      {
        key: 'Gothic architecture',
        label: 'Gothic architecture',
      },
      {
        key: 'Art Deco architecture',
        label: 'Art Deco architecture',
      },
    ],
  },
  {
    key: 'Science/Tech',
    label: 'Science/Tech',
    children: [
      {
        key: 'Futuristic Gadget',
        label: 'Futuristic Gadget',
      },
      {
        key: 'Alien machinery',
        label: 'Alien machinery',
      },
      {
        key: 'Chemistry lab',
        label: 'Chemistry lab',
      },
      {
        key: 'Robot',
        label: 'Robot',
      },
      {
        key: 'Satellite',
        label: 'Satellite',
      },
    ],
  },
  {
    key: 'other',
    label: 'other',
    children: [
      {
        key: 'superhero',
        label: 'superhero ',
      },
      {
        key: 'celebrity',
        label: 'celebrity',
      },
      {
        key: 'anime character',
        label: 'anime character ',
      },
    ],
  },
];

export {
  adjectiveDropDownItems,
  styleDropDownItems,
  items,
  artistDropDownItems,
};

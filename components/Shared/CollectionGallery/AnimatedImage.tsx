import React, { useEffect } from 'react';

import { useSpring, animated } from '@react-spring/web';

const AnimatedImage = ({ image }: any) => {
  const [styles, api] = useSpring(() => ({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: { duration: 1500 },
  }));

  useEffect(() => {
    api.start({ opacity: 1 });

    const timer = setTimeout(() => {
      api.start({ opacity: 0 });
    }, 4000);

    return () => {
      api.start({ opacity: 0 });
      clearTimeout(timer);
    };
  }, [api]);

  return (
    <animated.img
      // @ts-nocheck
      style={{
        ...styles,
        display: 'inline-block',
      }}
      className="rounded-[24px] object-cover"
      width="100%"
      height="100%"
      src={image}
      alt=""
    />
  );
};

export default AnimatedImage;

import React from 'react';
import Title from '../../Shared/Title/Title';

function FavouriteBanner() {
  const flexCenter = 'flex items-center justify-center';

  return (
    <div className={`${flexCenter} std_padding std_paddingTop`}>
      <div className={`${flexCenter} flex-col std_maxWidth`}>
        <Title
          title="FAVORITES"
          subTitle="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        />
      </div>
    </div>
  );
}

export default FavouriteBanner;

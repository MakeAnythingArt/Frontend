import React from 'react';
import Title from '../../Shared/Title/Title';

function CommunityCuratedBanner() {
  return (
    <div className="std_padding std_paddingTop flex justify-center items-center">
      <div className=" std_maxWidth ">
        <Title
          title="COMMUNITY PICKS"
          subTitle="The Community's bookmarked generations all in one place.
        Add to your own bookmarks, or view our other featured collections."
        />
      </div>
    </div>
  );
}

export default CommunityCuratedBanner;

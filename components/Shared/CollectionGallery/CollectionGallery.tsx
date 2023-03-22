import { AddArchive } from '../AddArchive/AddArchive';
import ButtonShared from '../ButtonShared/ButtonShared';
import { v4 as uuid } from 'uuid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AnimatedImage from './AnimatedImage';

const flexCenter = 'flex items-center justify-center';

function CollectionGallery({
  collectionsImages,
  buttonText,
  clickHandler,
  refetch,
  homePage = false
}: {
  collectionsImages: any;
  buttonText?: any;
  clickHandler?: any;
  refetch?: any;
  homePage?: boolean
}) {
  const [key, setKey] = useState(uuid());
  const router = useRouter();
  const images = collectionsImages;

  useEffect(() => {
    setKey(uuid());
  }, [images]);

  return (
    <div className={`std_padding std_paddingTop w-full ${flexCenter} flex-col`}>
      <div className={`std_maxWidth ${flexCenter}`}>
        <div className={`${flexCenter} w-full gap-[26px]`}>
          <div className="relative w-full h-[209.84px] tabletSM:hidden max-w-[181.59px]">
            <AnimatedImage key={key} image={images[0]?.url} />
            <AddArchive
              id={images[0]?.id}
              isFavourite={images[0]?.is_favorited}
              refetch={refetch}
            />
          </div>
          <div
            className={`${flexCenter} flex-col w-full gap-[26px] max-w-[224.73px] mobile:max-w-[106.65px] `}
          >
            <div className="relative w-full h-[138.96px] mobile:h-[65.87px]">
              <AnimatedImage key={key} image={images[1]?.url} />
              <AddArchive
                id={images[1]?.id}
                isFavourite={images[1]?.is_favorited}
                refetch={refetch}
              />
            </div>
            <div className="relative w-full h-[221px] mobile:h-[104.75px]">
              <AnimatedImage key={key} image={images[2]?.url} />
              <AddArchive
                id={images[2]?.id}
                isFavourite={images[2]?.is_favorited}
                refetch={refetch}
              />
            </div>
          </div>
          <div className="relative w-full max-w-[259px] h-[496px] mobile:h-[235.1px] mobile:max-w-[122.77px]">
            <AnimatedImage key={key} image={images[3]?.url} />
            <AddArchive
              id={images[3]?.id}
              isFavourite={images[3]?.is_favorited}
              refetch={refetch}
            />
          </div>
          <div
            className={`${flexCenter} flex-col gap-[26px] w-full max-w-[225px] mobile:max-w-[106.65px]`}
          >
            <div className="relative w-full h-[221px] mobile:h-[104.75px]">
              <AnimatedImage key={key} image={images[4]?.url} />
              <AddArchive
                id={images[4]?.id}
                isFavourite={images[4]?.is_favorited}
                refetch={refetch}
              />
            </div>
            <div className="relative w-full h-[139px] mobile:h-[65.89px]">
              <AnimatedImage key={key} image={images[5]?.url} />
              <AddArchive
                id={images[5]?.id}
                isFavourite={images[5]?.is_favorited}
                refetch={refetch}
              />
            </div>
          </div>
          <div className="relative tabletSM:hidden w-full max-w-[182px] h-[210px]">
            <AnimatedImage key={key} image={images[6]?.url} />
            <AddArchive
              id={images[6]?.id}
              isFavourite={images[6]?.is_favorited}
              refetch={refetch}
            />
          </div>
        </div>
      </div>
      {buttonText && (
        <div className='w-full flex items-center justify-center tabletSM:flex-col'>
          <div className="mt-[30px]">
            <ButtonShared
              clickHandler={clickHandler}
              text={buttonText}
              type="primary"
              ghost
            />
          </div>
          {
            homePage && <div className="mt-[30px] ml-[30px] tabletSM:ml-0">
              <ButtonShared
                clickHandler={() => router.push('/community-curated')}
                text="Art By The Community"
                type="primary"
                ghost
              />
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default CollectionGallery;

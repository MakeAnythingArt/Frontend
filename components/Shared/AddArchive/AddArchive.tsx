/* eslint-disable @next/next/no-img-element */
import { message } from 'antd';
import { useMutation } from 'react-query';
import { favouriteImage, unFavouriteImage } from '../../../services/favourites';

const flexCenter = 'flex items-center justify-center';

//Favourite the image
export const AddArchive = ({
  id,
  isFavourite,
  refetch,
}: {
  id: number;
  isFavourite: boolean;
  refetch: any;
}) => {
  const { mutate: favMutate } = useMutation(
    (id: any) => favouriteImage({ image_id: id }),
    {
      onSuccess: () => {
        message.success('Artwork saved!');
        refetch();
      },
      onError: (err: any) => {
        message.error(err?.response?.data);
      },
    },
  );

  //Unfavourite the image
  const { mutate: unFavMutate } = useMutation(
    (id: any) => unFavouriteImage({ image_id: id }),
    {
      onSuccess: () => {
        message.success('Artwork unsaved!');
        refetch();
      },
      onError: (err: any) => {
        message.error(err?.response?.data);
      },
    },
  );

  return (
    <div
      className={`${flexCenter} absolute top-[10px] right-[10px] cursor-pointer rounded-full w-[34.03px] h-[34.03px]  bg-[#344267] border-solid border-[1px] border-[#385494] hover:bg-[white] hover:border-[white] mobile:w-[16.13px] mobile:h-[16.13px]`}
    >
      <div
        onClick={() =>
          isFavourite === false ? favMutate(id) : unFavMutate(id)
        }
        className={`${flexCenter} w-[23px] h-[23px] mobile:w-[8px] mobile:h-[8px]`}
      >
        <img
          src={
            isFavourite === true
              ? '/Assets/Images/archive-minus-blue.svg'
              : '/Assets/Images/archive-add.svg'
          }
          width="100%"
          height="100%"
          alt=""
        />
      </div>
    </div>
  );
};

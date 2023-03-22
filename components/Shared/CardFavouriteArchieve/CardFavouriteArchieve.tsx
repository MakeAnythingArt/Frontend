/* eslint-disable @next/next/no-img-element */
import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { favouriteImage, unFavouriteImage } from '../../../services/favourites';

function CardFavouriteArchieve({
  card,
  refetch,
}: {
  card: any;
  refetch?: any;
}) {
  const [archived, setArchived] = useState<boolean>(card?.is_favorited);

  //Favourite the image
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

  useEffect(() => {
    setArchived(card?.is_favorited);
  }, [setArchived, card]);

  return (
    <div className="cursor-pointer">
      <div
        className="w-[20px] h-[20px] ml-2"
        onClick={() =>
          archived === false ? favMutate(card?.id) : unFavMutate(card?.id)
        }
      >
        <img
          src={
            archived === true
              ? '/Assets/Images/archive-minus.svg'
              : '/Assets/Images/archive.svg'
          }
          className="object-cover"
          width="100%"
          height="100%"
          alt=""
        />
      </div>
    </div>
  );
}

export default CardFavouriteArchieve;

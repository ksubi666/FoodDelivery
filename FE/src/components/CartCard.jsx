'use client';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MinusIcon from './icons/MinusIcon';
import PlusIcon from './icons/PlusIcon';
import { useEffect, useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

const styles = {
  container: 'py-6 px-4 border-b grid grid-cols-2 gap-4',
  imageContainer: 'relative h-[156px] w-[245px]',
  subContainer: 'flex flex-col items-start justify-between gap-2',
  headerContainer: 'flex justify-between items-start w-full',
  header: 'text-[18px] font-semibold',
  price: 'text-[#18BA51] text-[16px] font-semibold',
  salePrice: 'text-[16px] line-through',
  button: 'w-[45px] h-10 bg-[#18BA51]',
  buttonContainer: 'flex justify-between items-center gap-2',
  recipe: 'text-[#767676] text-[16px]',
};

export const CartCard = ({
  imageSrc,
  name,
  price,
  recipe,
  discount,
  alt,
  quantity,
  id,
  handlerDelete,
  cartId,
  cartFoods,
  isOrder = false,
}) => {
  const [current, setCurrent] = useState(quantity);

  const updateQuantity = async () => {
    await axiosInstance.put(`/cart/updateQuantity/${cartId}`, {
      productId: id,
      quantity: current,
    });
  };

  useEffect(() => {
    if (current < 1) return setCurrent(1);
    updateQuantity();
  }, [current]);
  return (
    <div
      className={
        isOrder
          ? `${styles.container} items-center px-0 py-4`
          : styles.container
      }
    >
      {isOrder ? (
        <CldImage
          src={imageSrc}
          className=" rounded-2xl relative"
          width="184"
          height="131"
          alt={alt}
          crop={{
            type: 'auto',
            source: true,
          }}
        />
      ) : (
        <div className={styles.imageContainer}>
          <CldImage
            src={imageSrc}
            className=" rounded-2xl relative"
            width="282"
            height="186"
            alt={alt}
            crop={{
              type: 'auto',
              source: true,
            }}
          />
        </div>
      )}
      <div className={styles.subContainer}>
        <div className={styles.headerContainer}>
          <div>
            <h2 className={styles.header}>{name}</h2>
            <div className="flex items-center gap-3">
              {discount ? (
                <p className={styles.price}>
                  {price * current - ((price * current) / 100) * discount}₮
                </p>
              ) : (
                <p className={styles.price}>{price * current}₮</p>
              )}
              {discount && (
                <p className={styles.salePrice}>{price * current}₮</p>
              )}
            </div>
          </div>
          {!isOrder && (
            <div onClick={() => handlerDelete(id)} className="cursor-pointer">
              <X size={20} />
            </div>
          )}
        </div>

        <p className={styles.recipe}>{recipe}</p>
        {!isOrder && (
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setCurrent(current - 1)}
              className={styles.button}
            >
              <MinusIcon />
            </Button>
            <p className="text-center px-[30px]">{current}</p>
            <Button
              onClick={() => setCurrent(current + 1)}
              className={styles.button}
            >
              <PlusIcon />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartCard;

'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import PlusIcon from './icons/PlusIcon';
import MinusIcon from './icons/MinusIcon';
import { useEffect, useState } from 'react';
import Card from './Card';
import { X } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { axiosInstance } from '@/lib/axios';
import { useCookies } from 'next-client-cookies';
import { jwtDecode } from 'jwt-decode';

const style = {
  container: 'flex flex-col gap-[14px] items-start',
  imgContainer: 'relative w-[282px] min-h-[186px] rounded-2xl',
  discount:
    ' absolute rounded-2xl py-1 px-4 text-lg font-semibold text-white bg-[#18BA51] border-white border-[1px] flex justify-center items-center top-4 right-4',
  title: 'text-[20px] font-[590]',
  price: 'text-[#18BA51] font-semibold text-lg',
  salePrice: 'text-lg line-through',
};

const styles = {
  dialogContent:
    'min-w-[981px] min-h-[548px] flex flex-row gap-[33px] items-center',
  subContainer: 'flex flex-col gap-8 max-w-[384px] my-auto',
  header: 'text-[28px] font-bold',
  subHeader: 'text-[18px] font-semibold',
  button: 'rounded-[10px] bg-[#18BA51] text-white h-10',
  submitButton: ' bg-[#18BA51] text-white rounded-[4px] w-full h-12',
  current: 'min-w-[254px] flex items-center justify-center font-semibold',
  recipe:
    'text-[#767676] p-3 bg-[#F6F6F6] rounded-[8px] flex items-center justify-start',
  price: 'text-[18px] font-semibold text-[#18BA51]',
  buttonContainer: 'flex justify-between gap-5',
};

export const OrderDetailDialog = ({
  name,
  price,
  recipe,
  imageSrc,
  discount,
  alt,
  params,
  data,
}) => {
  const cookies = useCookies();
  const encodedToken = cookies.get('token');
  const decoded = encodedToken && jwtDecode(encodedToken);
  const user = decoded && decoded._doc;

  const [quantity, setQuantity] = useState(1);
  const handlerCart = async () => {
    if (encodedToken) {
      const { data } = await axiosInstance.post('/cart/create', {
        quantity: quantity,
        productId: params,
        userId: user._id,
        _id: localStorage.getItem('cartId') && localStorage.getItem('cartId'),
      });
      localStorage.setItem('cartId', data._id);
    }
  };

  useEffect(() => {
    if (quantity < 1) return setQuantity(1);
  }, [quantity]);
  return (
    <Dialog>
      <DialogTrigger>
        <Card
          params={params}
          title={name}
          price={price}
          discount={discount}
          imageSrc={imageSrc}
          alt={alt}
        />
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <CldImage
          src={imageSrc}
          width="500"
          height="500"
          alt={alt}
          crop={{
            type: 'auto',
            source: true,
          }}
        />
        <DialogClose className="absolute right-6 top-6">
          <X />
        </DialogClose>
        <div className={styles.subContainer}>
          <div>
            <h2 className={styles.header}>{name}</h2>
            <div className="flex items-center gap-4">
              {discount ? (
                <p className={styles.price}>
                  {price - (price / 100) * discount}₮
                </p>
              ) : (
                <p className={styles.price}>{price}₮</p>
              )}
              {discount && <p className={style.salePrice}>{price}₮</p>}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h4 className={styles.subHeader}>Орц</h4>
            <p className={styles.recipe}>{recipe}</p>
          </div>
          <h4 className={styles.subHeader}>Тоо</h4>
          <div className={styles.buttonContainer}>
            <Button
              onClick={() => setQuantity(quantity - 1)}
              className={styles.button}
            >
              <MinusIcon />
            </Button>
            <p className={styles.current}>{quantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              className={styles.button}
            >
              <PlusIcon />
            </Button>
          </div>
          <DialogClose>
            <Button
              onClick={handlerCart}
              className={styles.submitButton}
              type="submit"
            >
              Сагслах
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;

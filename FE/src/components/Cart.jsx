'use client';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import ArrowLeftIcon from './icons/arrowLeftIcon';
import CartCard from './CartCard';
import CartIcon from './icons/CartIcon';
import { useEffect, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { AlertDialogAction } from '@radix-ui/react-alert-dialog';

const styles = {
  container: 'flex flex-col p-6 pb-0 h-full overflow-auto',
  p: 'text-[#5E6166] text-[18px] ',
  totalAmount: 'text-[#121316] text-[18px] font-bold',
  button: 'bg-[#18BA51] font-normal',
  contentContainer:
    'relative flex items-center gap-2 text-sm font-bold leading-4 spacing-[0,2px] px-4 py-2 hover:cursor-pointer',
};

export const Cart = () => {
  const router = useRouter();
  const [cartFoods, setCartFoods] = useState();
  const cartId = localStorage.getItem('cartId');
  const [totalPrice, setTotalPrice] = useState();

  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  const handlerDelete = async (id) => {
    await axiosInstance.post(`/cart/deleteCartItem`, {
      id: cartId,
      productId: id,
    });
    setIsDelete(!isDelete);
  };

  useEffect(() => {
    const getCart = async () => {
      const { data } = await axiosInstance.get(`/cart/getCart/${cartId}`);
      data && setCartFoods(data.products);
    };
    setTotalPrice(
      cartFoods &&
        cartFoods.reduce((total, product) => {
          const price = product.productId.discount
            ? product.productId.price -
              (product.productId.price / 100) * product.productId.discount
            : product.productId.price;
          const quantity = product.quantity;
          return total + price * quantity;
        }, 0)
    );
    cartId && getCart();
  }, [open, isDelete]);

  return (
    <AlertDialog open={open} onOpenChange={toggleOpen}>
      <AlertDialogTrigger asChild>
        <div className={styles.contentContainer}>
          {cartFoods && cartFoods.length > 0 ? (
            <>
              <CartIcon color="#18BA51" />
              <p className="text-[#18BA51]">Сагс</p>
              <span className="bg-[#18BA51] text-[10px] size-4 rounded-full flex items-center justify-center text-white absolute right-1 top-0">
                {cartFoods && cartFoods.length}
              </span>
            </>
          ) : (
            <>
              <CartIcon />
              <p>Сагс</p>
            </>
          )}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className={styles.container}>
          <AlertDialogHeader>
            <AlertDialogCancel>
              <ArrowLeftIcon />
            </AlertDialogCancel>
            <AlertDialogTitle>Таны сагс</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex flex-col h-full ">
            {cartFoods &&
              cartFoods.map((product) => (
                <CartCard
                  cartFoods={cartFoods}
                  cartId={cartId}
                  handlerDelete={handlerDelete}
                  id={product.productId._id}
                  name={product.productId.name}
                  imageSrc={product.productId.image}
                  price={product.productId.price}
                  discount={product.productId.discount}
                  quantity={product.quantity}
                  recipe={product.productId.ingeredient}
                />
              ))}
          </div>
        </div>
        <AlertDialogFooter>
          <div>
            <p className={styles.p}>Нийт төлөх дүн</p>
            <h2 className={styles.totalAmount}>{totalPrice}₮</h2>
          </div>
          <AlertDialogAction>
            <Button
              onClick={() => router.push('/orderdetail')}
              className={styles.button}
            >
              Захиалах
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Cart;

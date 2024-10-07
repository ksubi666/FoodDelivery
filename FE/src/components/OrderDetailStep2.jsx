'use client';
import WaitingIcon from '@/components/icons/WaitingIcon';
import { Button } from '@/components/ui/button';
import { axiosInstance } from '@/lib/axios';
import { useEffect, useState } from 'react';
import CartCard from './CartCard';

const styles = {
  orderContainer:
    'p-6 w-[432px] h-[624px] flex flex-col justify-between gap-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
  bottomContainer: 'grid grid-cols-2 text-[18px] items-center',
  button:
    'disabled:bg-[#EEEFF2] disabled:text-[#1C20243D] text-white bg-[#18BA51]',
};
export const OrderDetailStep2 = () => {
  const [cartFoods, setCartFoods] = useState();
  const cartId = localStorage.getItem('cartId');

  useEffect(() => {
    const getCart = async () => {
      const { data } = await axiosInstance.get(`/cart/getCart/${cartId}`);
      data && setCartFoods(data.products);
    };
    cartId && getCart();
  }, []);
  return (
    <div className="flex flex-col gap-6">
      <div className="p-6 flex items-center gap-4">
        <WaitingIcon />
        <div>
          <p>Алхам 2</p>
          <h3>Захиалга баталгаажуулах</h3>
          <p>Хүлээгдэж байна</p>
        </div>
      </div>
      <div className={styles.orderContainer}>
        <div className="w-full overflow-auto">
          {cartFoods &&
            cartFoods.map((product) => (
              <CartCard
                isOrder={true}
                cartFoods={cartFoods}
                cartId={cartId}
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
        <div className={styles.bottomContainer}>
          <div>
            <p className=" text-[#5E6166]">Нийт төлөх дүн</p>
            <h3 className="text-[#121316] font-bold">
              {cartFoods &&
                cartFoods.reduce((total, product) => {
                  const price = product.productId.discount
                    ? product.productId.price -
                      (product.productId.price / 100) *
                        product.productId.discount
                    : product.productId.price;
                  const quantity = product.quantity;
                  return total + price * quantity;
                }, 0)}
              ₮
            </h3>
          </div>
          <Button className={styles.button} disabled>
            Захиалах
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailStep2;

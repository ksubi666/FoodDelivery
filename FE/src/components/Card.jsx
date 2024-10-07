'use client';
import { CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const styles = {
  container: 'flex flex-col gap-[14px] items-start',
  imgContainer: 'relative rounded-2xl',
  discount:
    ' absolute rounded-2xl py-1 px-4 text-lg font-semibold text-white bg-[#18BA51] border-white border-[1px] flex justify-center items-center top-4 right-4',
  title: 'text-[20px] font-[590] text-start',
  price: 'text-[#18BA51] font-semibold text-lg',
  salePrice: 'text-lg line-through',
};

export const Card = ({ imageSrc, title, price, discount, alt, params }) => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
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
        {discount && <div className={styles.discount}>{discount}%</div>}
      </div>
      <div>
        <h2 className={styles.title}>{title}</h2>
        <div className="flex gap-4">
          {discount ? (
            <p className={styles.price}>{price - (price / 100) * discount}₮</p>
          ) : (
            <p className={styles.price}>{price}₮</p>
          )}
          {discount && <p className={styles.salePrice}>{price}₮</p>}
        </div>
      </div>
    </div>
  );
};

export default Card;

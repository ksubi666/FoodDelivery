'use client';

import OrderDetailDialog from '@/components/OrderDetailDialog';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useFoodsAndCategories } from '@/hooks/useFoodsAndCategories';
import Loading from '@/components/Loading';

const styles = {
  category:
    ' w-full h-[43px] border-[#D6D8DB] border bg-white rounded-[8px] flex justify-center py-2 px-4 text-black text-[18px] font-[500]',
  selectedCategory:
    ' w-full h-[43px] border-[#D6D8DB] border bg-[#18BA51] rounded-[8px] flex justify-center py-2 px-4 text-black text-[18px] text-white font-[500]',
  contentEmptyConatiner:
    'flex flex-col gap-[30px] items-center justify-center text-[#808080] text-[18px]',
  container: 'w-[1200px] mx-auto flex flex-col gap-[54px]',
  categoryContainer:
    'grid grid-cols-4 gap-x-[26px] gap-y-4 items-center justify-center py-8 ',
  foodsContainer: 'flex flex-wrap gap-y-[60px] gap-x-6 pb-[60px]',
};

const page = () => {
  const { response, loading, error } = useFoodsAndCategories();

  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        {response &&
          response.map((el, i) => (
            <Link
              href={`/menu?category=${i}`}
              className={
                Number(category) === i
                  ? styles.selectedCategory
                  : styles.category
              }
            >
              {el.name}
            </Link>
          ))}
      </div>
      {loading ? (
        <Loading />
      ) : response && category && response[category].foods.length !== 0 ? (
        <div className={styles.foodsContainer}>
          {response &&
            category &&
            response[category] &&
            response[category].foods.map((food) => (
              <OrderDetailDialog
                name={food.name}
                imageSrc={food.image}
                price={food.price}
                discount={food.discount <= 0 ? null : food.discount}
                recipe={food.ingeredient}
                alt={food.name}
              />
            ))}
        </div>
      ) : (
        <div className={styles.contentEmptyConatiner}>
          <p>Уучлаарай, Меню хоосон байна.</p>
        </div>
      )}
    </div>
  );
};

export default page;

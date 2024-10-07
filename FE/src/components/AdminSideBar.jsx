'use client';
import DottedIcon from '@/components/icons/DottedIcon';
import CreateCategory from './CreateCategory';
import { useContext } from 'react';
import { DataContext } from '@/app/food&category/page';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import CategoryEditAndDeleteDropdown from './CategoryEditAndDeleteDropdown';

export const styles = {
  container:
    'min-w-[402px] h-screen pl-[120px] py-[26px] pr-6 flex flex-col gap-10 bg-white',
  header: 'text-[22px] font-bold',
  category:
    ' w-full h-10 border-[#D6D8DB] border bg-white rounded-[8px] flex items-center justify-between py-2 px-4 text-black text-[18px] font-[500]',
  selectedCategory:
    ' w-full h-10 border-[#D6D8DB] border bg-[#18BA51] rounded-[8px] flex items-center justify-between py-2 px-4 text-black text-[18px] text-white font-[500]',
  categoryAdd:
    ' w-full h-10 border-[#D6D8DB] border bg-white rounded-[8px] flex items-center py-2 px-4 gap-2 text-[#5E6166] justify-start',
  categoryContainer: 'flex flex-col gap-[26px]',
};
export const AdminSideBar = () => {
  const { response, handlerDeleteClick } = useContext(DataContext);

  const searchParams = useSearchParams();

  const category = searchParams.get('category');

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Food menu</h2>
      <div className={styles.categoryContainer}>
        {response &&
          response.map((el, i) => (
            <Link
              href={`/food&category?category=${i}`}
              className={
                Number(category) === i
                  ? styles.selectedCategory
                  : styles.category
              }
            >
              <h4>{el.name}</h4>
              <CategoryEditAndDeleteDropdown
                response={response}
                handlerDeleteClick={handlerDeleteClick}
                i={i}
              />
            </Link>
          ))}
        <CreateCategory />
      </div>
    </div>
  );
};

export default AdminSideBar;

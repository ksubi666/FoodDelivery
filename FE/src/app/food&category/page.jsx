'use client';
import AdminSideBar from '@/components/AdminSideBar';
import Foods from '@/components/Foods';
import Loading from '@/components/Loading';
import { useFoodsAndCategories } from '@/hooks/useFoodsAndCategories';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, createContext } from 'react';

export const DataContext = createContext();

const page = () => {
  const router = useRouter();

  const { response, loading, error, refetch } = useFoodsAndCategories();

  useEffect(() => {
    router.push(`/food&category?category=${0}`);
  }, []);

  const handlerDeleteClick = async (categoryId) => {
    await axiosInstance.delete(`/category/categoryDelete/${categoryId}`);
    router.push(`/food&category?category=0`);
    refetch(categoryId);
  };

  return (
    <DataContext.Provider value={{ response, handlerDeleteClick }}>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gradient-to-r from-white via-white to-[#F7F7F8]">
          <div className="flex flex-row max-w-[1440px] mx-auto ">
            <AdminSideBar />
            <Foods />
          </div>
        </div>
      )}
    </DataContext.Provider>
  );
};

export default page;

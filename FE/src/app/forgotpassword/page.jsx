'use client';
import ForgotPass from '@/components/ForgotPass';
import ForgotPassOTP from '@/components/forgotPassOTP';
import NewPassword from '@/components/NewPassword';
import { useRouter, useSearchParams } from 'next/navigation';
import { createContext, useEffect } from 'react';

export const DataContext = createContext();

const page = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/forgotpassword?page=0');
  }, []);
  const searchParams = useSearchParams();

  const page = searchParams.get('page');
  return (
    <div>
      {Number(page) === 0 && <ForgotPass />}
      {Number(page) === 1 && <ForgotPassOTP />}
      {Number(page) === 2 && <NewPassword />}
    </div>
  );
};

export default page;

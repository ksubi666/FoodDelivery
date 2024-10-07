'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { axiosInstance } from '@/lib/axios';

export const styles = {
  container:
    'w-[448px] h-fit rounded-[16px] flex flex-col gap-[48px]  p-8 bg-white m-auto pt-[143px] pb-[107px]',
  header: 'text-[#0D1118] text-center text-[28px] font-bold',
  form: 'flex flex-col items-start gap-4 w-full text-sm',
  inputContainer: 'flex flex-col gap-1 w-full text-sm',
  subContainer: 'flex flex-col w-full gap-8 items-center text-sm',
  input:
    'w-full flex items-center justify-between border-[#ECEDF0] border-[0.5px] bg-[#F7F7F8] text-[#8B8E95] rounded-[4px] pr-3',
  ButtonStyle1:
    'disabled:bg-[#EEEFF2] disabled:text-[#1C20243D] font-normal px-4 py-2 bg-[#18BA51] text-white',
  ButtonStyle2:
    'bg-white border-[#18BA51] border-[1px] text-[#272727] font-normal px-4 py-2 hover:bg-[#18BA51] hover:text-white',
  borderOff: 'bg-[#F7F7F8] border-0',
};

export const page = () => {
  const router = useRouter();
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const debounceFn = useMemo(() => debounce(handleOnChange, 500), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
      if (response.status === 200) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h2>Нэвтрэх</h2>
      </div>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <h3>Имэйл </h3>
          <Input
            name="email"
            type="email"
            onChange={debounceFn}
            placeholder="Имэйл хаягаа оруулна уу"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <h3>Нууц үг</h3>
          <div className={styles.input}>
            <Input
              name="password"
              type={isHidePassword ? 'password' : 'text'}
              onChange={debounceFn}
              placeholder="Нууц үг"
              className={styles.borderOff}
              required
            ></Input>
            <Icon
              onClick={togglePasswordVisibility}
              className="cursor-pointer"
            />
          </div>
          <p
            className="text-end cursor-pointer"
            onClick={() => router.push('/forgotpassword')}
          >
            Нууц үг сэргээх
          </p>
        </div>
      </div>
      <div className={styles.subContainer}>
        <Button
          disabled={
            formData.email.length > 0 && formData.password.length > 0
              ? false
              : true
          }
          type="submit"
          className={styles.ButtonStyle1}
        >
          Нэвтрэх
        </Button>
        <p>Эсвэл</p>
        <Button
          type="button"
          onClick={() => router.push('/signup')}
          className={styles.ButtonStyle2}
        >
          Бүртгүүлэх
        </Button>
      </div>
    </form>
  );
};

export default page;

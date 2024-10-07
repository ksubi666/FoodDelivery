'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import debounce from 'lodash/debounce';
import { axiosInstance } from '@/lib/axios';
import { styles } from '@/app/login/page';

export const NewPassword = () => {
  const router = useRouter();
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [formData, setFormData] = useState({ NewPassword: '', rePassword: '' });
  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;

  const searchParams = useSearchParams();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const debounceFn = useMemo(() => debounce(handleOnChange, 500), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.NewPassword !== formData.rePassword) {
      return console.log('password taarahgu bn');
    } else {
      const res = await axiosInstance.put(`/otp/newPassword`, {
        email: email,
        accessToken: token,
        password: formData.NewPassword,
      });
      if (res.status === 200) {
        router.push('/login');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <div className={styles.header}>
        <h2>Шинэ нууц үг зохиох </h2>
      </div>
      <div className={styles.form}>
        <div className={styles.inputContainer}>
          <h3>Нууц үг</h3>
          <div className={styles.input}>
            <Input
              name="NewPassword"
              type={isHidePassword ? 'password' : 'text'}
              onChange={debounceFn}
              placeholder="Шинэ нууц үгээ оруулна уу"
              className={styles.borderOff}
              required
            ></Input>
            <Icon
              onClick={togglePasswordVisibility}
              className="cursor-pointer"
            />
          </div>
        </div>
        <div className={styles.inputContainer}>
          <h3>Нууц үг давтах </h3>
          <div className={styles.input}>
            <Input
              name="rePassword"
              type={isHidePassword ? 'password' : 'text'}
              onChange={debounceFn}
              placeholder="Шинэ нууц үгээ давтан оруулна уу"
              className={styles.borderOff}
              required
            ></Input>
            <Icon
              onClick={togglePasswordVisibility}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
      <Button
        disabled={
          formData.NewPassword.length > 0 && formData.rePassword.length > 0
            ? false
            : true
        }
        type="submit"
        className={styles.ButtonStyle1}
      >
        Үргэлжлүүлэх
      </Button>
    </form>
  );
};

export default NewPassword;

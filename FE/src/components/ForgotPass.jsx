'use client';
import { styles } from '@/app/login/page';
import { Button } from './ui/button';
import { Input } from './ui/input';
import debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';

export const ForgotPass = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: '' });
  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const debounceFn = useMemo(() => debounce(handleOnChange, 500), []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await axiosInstance.post('/otp/create', {
      email: formData.email,
    });
    if (res.status === 200) {
      router.push(`/forgotpassword?page=1&email=${res.data.email}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.header}>Нууц үг сэргээх</h2>
      <div className={styles.inputContainer}>
        <h3>Имэйл</h3>
        <Input
          name="email"
          placeholder="Имэйл хаягаа оруулна уу"
          type="email"
          onChange={debounceFn}
          className={styles.input}
          required
        />
      </div>
      <Button
        disabled={formData.email.length > 0 ? false : true}
        type="submit"
        className={styles.ButtonStyle1}
      >
        Үргэлжлүүлэх
      </Button>
    </form>
  );
};

export default ForgotPass;

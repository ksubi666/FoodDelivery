'use client';
import { Input } from '@/components/ui/input';
import { styles } from '../login/page';
import { Button } from '@/components/ui/button';
import { useEffect, useMemo, useState } from 'react';
import { EyeIcon, EyeOff } from 'lucide-react';
import { axiosInstance } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import debounce from 'lodash/debounce';

const style = {
  container:
    'pt-[106px] pb-[139px] flex flex-col gap-12 rounded-[16px] max-w-[448px] h-fit bg-white m-auto',
  form: 'flex flex-col gap-3',
  bottomContainer: 'flex flex-col gap-8',
  checkboxContainer: 'flex gap-2 px-4 py-2 text-sm ',
};

export const page = () => {
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const togglePasswordVisibility = () => setIsHidePassword((prev) => !prev);
  const Icon = isHidePassword ? EyeOff : EyeIcon;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    rePassword: '',
  });

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const debounceFn = useMemo(() => debounce(handleOnChange, 500), []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === formData.rePassword) {
      try {
        const response = await axiosInstance.post('/user/create', {
          name: formData.name,
          email: formData.email,
          phone: formData.phoneNumber,
          password: formData.password,
        });
        if (response.status === 200) router.push('/login');
      } catch (error) {
        console.error(error);
      }
    } else {
      return console.log('pass buruu');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={style.container}>
      <h2 className={styles.header}>Бүртгүүлэх</h2>
      <div className={style.form}>
        <div className={styles.inputContainer}>
          <h3>Нэр</h3>
          <Input
            name="name"
            type="text"
            onChange={debounceFn}
            placeholder="Нэрээ оруулна уу"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <h3>И-мэйл</h3>
          <Input
            name="email"
            type="email"
            onChange={debounceFn}
            placeholder="И-мэйл хаягаа оруулна уу"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <h3>Утасны дугаар</h3>
          <Input
            name="phoneNumber"
            type="tel"
            onChange={debounceFn}
            placeholder="Та утасны дугаараа оруулна уу"
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
              placeholder="Нууц үгээ оруулна уу"
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
          <h3>Нууц үг давтах</h3>
          <div className={styles.input}>
            <Input
              name="rePassword"
              type={isHidePassword ? 'password' : 'text'}
              onChange={debounceFn}
              placeholder="Нууц үгээ оруулна уу"
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
      <div className={style.bottomContainer}>
        <div className={style.checkboxContainer}>
          <input
            type="checkbox"
            className="accent-black"
            name="check"
            onClick={() => setIsChecked(!isChecked)}
          />
          <p>Үйлчилгээний нөхцөл зөвшөөрөх</p>
        </div>
        <Button
          type="submit"
          disabled={
            formData.email.length > 0 &&
            formData.password.length > 0 &&
            formData.name.length > 0 &&
            formData.phoneNumber.length > 0 &&
            formData.rePassword.length > 0 &&
            isChecked === true
              ? false
              : true
          }
          className={styles.ButtonStyle1}
        >
          Бүртгүүлэх
        </Button>
      </div>
    </form>
  );
};

export default page;

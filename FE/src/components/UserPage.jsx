'use client';
import {
  EditIcon,
  HistoryIcon,
  MailIcon,
  PhoneIcon,
  UserPageUserIcon,
} from './icons';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useCookies } from 'next-client-cookies';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import ProfileLogout from './ProfileLogout';
import debounce from 'lodash/debounce';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { axiosInstance } from '@/lib/axios';

const styles = {
  container: 'flex flex-col gap-6 w-[432px] mx-auto pt-[76px]',
  avatarContainer: 'flex flex-col items-center gap-10',
  editIconBg:
    'size-[34px] bg-white rounded-full border-[1px] border-[#D6D8DB] flex items-center justify-center absolute right-[-4px] bottom-[-5px]',
  formContainer: 'pt-4 px-5 flex flex-col items-center gap-4',
  formSubContainer:
    'flex gap-2 px-5 py-2 rounded-[8px] bg-[#F6F6F6] min-w-[392px] items-center',
  formSubcontainerRed:
    'flex gap-2 px-5 py-2 rounded-[8px] bg-[#F6F6F6] min-w-[392px] items-center border-[1px] border-[#FCBABE]',
  formContentHeader: 'text-[#888A99] text-xs',
  buttons:
    'flex gap-2 px-5 py-2 rounded-[8px] min-w-[392px] items-center cursor-pointer',
  textContainer: 'flex flex-col gap-1 w-[264px]',
};

export const UserPage = () => {
  const [isEdit, setIsEdit] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
  });

  const router = useRouter();
  const cookies = useCookies();

  const encodedToken = cookies.get('token');
  const decoded = encodedToken && jwtDecode(encodedToken);
  const user = decoded && decoded._doc;

  useEffect(() => {
    encodedToken === undefined && router.push('/');
    router.refresh();
  }, [encodedToken]);

  const handleOnChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const debounceFn = useMemo(() => debounce(handleOnChange, 500), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name !== '' &&
      formData.phoneNumber !== '' &&
      formData.email !== ''
    ) {
      await axiosInstance.put(`/user/userUpdate/${user._id}`, {
        name: formData.name,
        phone: formData.phoneNumber,
        email: formData.email,
      });

      location.reload();
    }
  };

  const handlerLogOut = () => {
    cookies.remove('token');
  };

  const handlerEditClick = () => {
    setIsEdit(!isEdit);
  };

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className="size-[120px] relative">
          <Avatar className="size-[120px]">
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback className="text-[40px] capitalize text-[#8B8E95]">
              {user && user.name.slice(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className={styles.editIconBg}>
            <EditIcon />
          </div>
        </div>
        <h2 className="text-[28px] font-bold capitalize">
          {user && user.name}
        </h2>
      </div>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <div
          className={
            !isEdit && formData.name.length === 0
              ? styles.formSubcontainerRed
              : styles.formSubContainer
          }
        >
          <UserPageUserIcon />
          <div className={styles.textContainer}>
            <p className={styles.formContentHeader}>Таны нэр</p>
            <Input
              name="name"
              className="outline-none capitalize border-0 bg-[#F6F6F6] p-0 h-fit placeholder:text-[#0D1118] disabled:opacity-100"
              disabled={isEdit}
              onChange={debounceFn}
              placeholder={user && user.name}
            ></Input>
          </div>
          <div onClick={handlerEditClick}>
            <EditIcon />
          </div>
        </div>
        <div
          className={
            !isEdit && formData.phoneNumber.length === 0
              ? styles.formSubcontainerRed
              : styles.formSubContainer
          }
        >
          <PhoneIcon />
          <div className={styles.textContainer}>
            <p className={styles.formContentHeader}>Утасны дугаар</p>
            <Input
              name="phoneNumber"
              className="outline-none border-0 bg-[#F6F6F6] p-0 h-fit placeholder:text-[#0D1118] disabled:opacity-100"
              disabled={isEdit}
              onChange={debounceFn}
              placeholder={user && user.phone}
            ></Input>
          </div>
          <div onClick={handlerEditClick}>
            <EditIcon />
          </div>
        </div>
        <div
          className={
            !isEdit && formData.email.length === 0
              ? styles.formSubcontainerRed
              : styles.formSubContainer
          }
        >
          <MailIcon />
          <div className={styles.textContainer}>
            <p className={styles.formContentHeader}>Имэйл хаяг</p>
            <Input
              name="email"
              className="outline-none border-0 bg-[#F6F6F6] p-0 h-fit placeholder:text-[#0D1118] disabled:opacity-100"
              disabled={isEdit}
              onChange={debounceFn}
              placeholder={user && user.email}
            ></Input>
          </div>
          <div onClick={handlerEditClick}>
            <EditIcon />
          </div>
        </div>
        {isEdit ? (
          <>
            <div className={styles.buttons}>
              <HistoryIcon />
              <h4>Захиалгын түүх</h4>
            </div>
            <ProfileLogout handlerLogOut={handlerLogOut} />
          </>
        ) : (
          <Button type="submit" className="h-12 mt-6 bg-[#18BA51]">
            Хадгалах
          </Button>
        )}
      </form>
    </div>
  );
};

export default UserPage;

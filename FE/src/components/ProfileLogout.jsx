import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LogoutIcon } from './icons';

const styles = {
  dialogTrigger:
    'flex gap-2 px-5 py-2 rounded-[8px] min-w-[392px] items-center cursor-pointer',
  dialogContent:
    'w-[384px] h-[228px] p-0 flex flex-col justify-between border-none text-center sm:rounded-2xl overflow-hidden',
  dialogDescription: 'text-[#171717] text-[20px] font-semibold leading-[30px]',
  buttonContainer: 'grid grid-cols-2 h-[61px]',
  button1: 'rounded-none bg-[#18BA5133] text-[#8B8E95] text-[20px] h-full',
  button2: 'rounded-none text-[20px] text-white bg-[#18BA51] h-full',
};
export const ProfileLogout = ({ handlerLogOut }) => {
  return (
    <Dialog>
      <DialogTrigger className={styles.dialogTrigger}>
        <LogoutIcon />
        <h4>Гарах</h4>
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader></DialogHeader>
        <DialogDescription className={styles.dialogDescription}>
          Та системээс гарахдаа итгэлтэй байна уу?
        </DialogDescription>
        <div className={styles.buttonContainer}>
          <Button onClick={handlerLogOut} className={styles.button1}>
            Тийм
          </Button>
          <DialogClose>
            <Button className={styles.button2}>Үгүй</Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileLogout;

import Image from 'next/image';
import NotFound from './assets/NotFoundIcon.png';

const style = { container: 'flex flex-col gap-8 items-center bg-white' };

export const NotFoundPage = () => {
  return (
    <div className={style.container}>
      <Image src={NotFound} width={133} height={133} alt="Not Found" />
      <p className="text-sm">Уучлаарай илэрц олдсонгүй...</p>
    </div>
  );
};

export default NotFoundPage;

'use client';
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
});
import TermOfServiceIcon from '@/components/icons/TermOfServiceIcon';

const content = [
  'Нархан хотхон',
  '26-р байр',
  '26-р байр',
  '45-р байр',
  '3-р байр',
  'Хоймор хотхон ',
  'Хоймор хотхон ',
];
const styles = {
  container: 'pt-[61px] pb-[45px] flex flex-col gap-10 max-w-[1200px] m-auto',
  header:
    'flex items-center p-4 pb-[22px] text-[22px] font-bold text-[#272727] gap-1',
  subContainer: 'p-6 w-full flex flex-col gap-4 rounded-2xl shadow-md',
  h3: 'border-b border-[#18BA51] py-4 text-[20px] font-[590]',
  content: 'flex-col flex gap-4 w-[262px]',
};

const page = () => {
  return (
    <div className={styles.container}>
      <div className="h-[616px] w-[1200px]">
        <Map />
      </div>
      <div>
        <div className={styles.header}>
          <TermOfServiceIcon />
          <h2>Хүргэлтийн бүс дэх хаягууд</h2>
        </div>
        <div className="flex gap-6">
          <div className={styles.subContainer}>
            <h3 className={styles.h3}>А бүс</h3>
            <div className="flex gap-4 ">
              <div className={styles.content}>
                {content.map((el) => (
                  <p>{el}</p>
                ))}
              </div>
              <div className={styles.content}>
                {content.map((el) => (
                  <p>{el}</p>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.subContainer}>
            <h3 className={styles.h3}>Б бүс</h3>
            <div className="flex gap-4 ">
              <div className={styles.content}>
                {content.map((el) => (
                  <p>{el}</p>
                ))}
              </div>
              <div className={styles.content}>
                {content.map((el) => (
                  <p>{el}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;

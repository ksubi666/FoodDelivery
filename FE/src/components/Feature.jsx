import BookIcon from './icons/BookIcon';
import FoodIcon from './icons/FoodIcon';
import TimeIcon from './icons/TimeIcon';

const content = [
  {
    Icon: <BookIcon />,
    Header: 'Хүргэлтийн төлөв хянах',
    p: 'Захиалга бэлтгэлийн явцыг хянах',
  },
  {
    Icon: <TimeIcon />,
    Header: 'Шуурхай хүргэлт',
    p: 'Захиалга бэлтгэлийн явцыг хянах',
  },
  {
    Icon: <FoodIcon />,
    Header: 'Эрүүл, баталгаат орц',
    p: 'Захиалга бэлтгэлийн явцыг хянах',
  },
  {
    Icon: <BookIcon />,
    Header: 'Хоолны өргөн сонголт',
    p: 'Захиалга бэлтгэлийн явцыг хянах',
  },
];

const styles = {
  container: 'flex w-[1200px] items-start gap-[47px] my-[122px] mx-auto',
  subContainer:
    'flex flex-col p-4 rounded-[16px] border-[1px] bg-white border-[#D6D8DB] text-[#272727] min-w-[264.75px] min-h-[155px] justify-center items-start gap-[15px]',
  textContainer: 'flex flex-col items gap-1 items-start justify-center',
  header: 'text-[18px] font-bold',
  p: 'text-[13px] text-[#272727] opacity-[0.75]',
};
export const Feature = () => {
  return (
    <div className={styles.container}>
      {content.map((content) => (
        <div className={styles.subContainer}>
          <div className="p-[15px]">{content.Icon}</div>
          <div className={styles.textContainer}>
            <h2 className={styles.header}>{content.Header}</h2>
            <p className={styles.p}>{content.p}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Feature;

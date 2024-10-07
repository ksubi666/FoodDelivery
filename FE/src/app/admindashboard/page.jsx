import { SearchIcon } from '@/components/icons';
import DottedIcon from '@/components/icons/DottedIcon';
import Pagination from '@/components/Pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const dashboardTitles = [
  'Order name',
  'Buyer info',
  'Payment',
  'Address',
  'Delivery state',
];

const styles = {
  container:
    'bg-[#F7F7F8] h-screen flex pt-[27px] flex flex-col items-center gap-8',
  subContainer:
    'w-[1024px] h-[624px] bg-white rounded-[12px] border border-[#ECEDF0] flex flex-col',
  headerContainer: 'py-5 px-6 flex justify-between items-center',
  header: 'text-[20px] leading-7 tracking-[-0.5px] font-bold',
  inputContainer:
    'flex items-center rounded-[8px] w-[356px] h-9 bg-[#F7F7F8] border border-[#ECEDF0] text-[#8B8E95] text-[20px] py-2 px-3',
  dashboardTitles:
    'h-[44px] w-full bg-[#F7F7F8] border-y-[1px] border-[#ECEDF0] text-[#3F4145] grid grid-cols-5 items-center text-[12px] font-semibold leading-4 tracking-[-0.12px] px-6 py-3',
  contentContainer: 'w-full h-full grid grid-rows-7',
};
const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.header}>Admin dashboard</h1>
          <div className={styles.inputContainer}>
            <SearchIcon />
            <Input
              className="h-[30px] bg-[#F7F7F8] border-0"
              placeholder="search"
            />
          </div>
        </div>

        <div className={styles.dashboardTitles}>
          {dashboardTitles.map((el) => (
            <p>{el}</p>
          ))}
        </div>
        <div className={styles.contentContainer}>
          {/* tusad ni gargaj conponent uusgeh */}
          <div className="w-full grid grid-cols-5 border-b items-center py-4 px-6">
            <div>bla</div>
            <div>bla</div>
            <div>bla</div>
            <div>bla</div>
            <div className="flex items-center justify-between">
              <p>bla</p>
              <DottedIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="border-t w-[1024px] pt-5">
        <Pagination />
      </div>
    </div>
  );
};

export default page;

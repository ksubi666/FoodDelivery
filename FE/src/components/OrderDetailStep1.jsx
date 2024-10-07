import OrderDetailSelect from '@/components/OrderDetailSelect';
import { Input } from '@/components/ui/input';
import WaitingIcon from '@/components/icons/WaitingIcon';

const styles = {
  container: 'flex flex-col gap-6 ',
  headerContainer: 'p-6 flex items-center gap-4',
  form: 'p-6 w-[432px] flex flex-col gap-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)]',
  selectContainer: 'flex flex-col gap-4',
  textarea:
    'h-[112px] w-full bg-[#F7F7F8] border border-[#ECEDF0] text-[#8B8E95] px-4 py-2 rounded-[4px]',
  input: 'border border-[#ECEDF0] bg-[#F7F7F8] text-[#8B8E95]',
  subContainer: 'flex flex-col gap-1',
  checkboxContainer: 'grid grid-cols-2 text-[#8B8E95]',
  checkbox: 'size-4 accent-white',
};

const District = [
  'Баянзүрх дүүрэг',
  'Хан-Уул дүүрэг',
  'Баянгол дүүрэг',
  'Сонгинохайрхан дүүрэг',
  'Чингэлтэй дүүрэг',
];
const Horoo = [
  '1-р хороо',
  '2-р хороо',
  '3-р хороо',
  '4-р хороо',
  '5-р хороо',
  '6-р хороо',
  '7-р хороо',
  '8-р хороо',
  '9-р хороо',
];
const Bair = [
  'Нархан хотхон',
  '26-р байр',
  'Хоймор хотхон',
  '45-р байр',
  'Зайсан хотхон ',
];

export const OrderDetailStep1 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <WaitingIcon />
        <div>
          <p>Алхам 1</p>
          <h3>Хаягийн мэдээлэл оруулах</h3>
          <p>Хүлээгдэж байна</p>
        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.selectContainer}>
          <h4 className="text-sm">Хаяг аа оруулна уу</h4>
          <OrderDetailSelect triggerName={'Дүүрэг'} selectData={District} />
          <OrderDetailSelect triggerName={'Хороо'} selectData={Horoo} />
          <OrderDetailSelect triggerName={'Байр, гудамж'} selectData={Bair} />
        </div>
        <div className="flex flex-col gap-8">
          <div className={styles.subContainer}>
            <h4 className="text-sm">Нэмэлт мэдээлэл</h4>
            <textarea className={styles.textarea} name="hayg" id="hayg" />
          </div>
          <div className={styles.subContainer}>
            <h4 className="text-sm">Утасны дугаар*</h4>
            <Input
              className={styles.input}
              placeholder="Утасны дугаараа оруулна уу"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-sm">Төлбөр төлөх </h3>
            <div className={styles.checkboxContainer}>
              <div className="flex gap-2 items-center ">
                <input
                  type="checkbox"
                  id="Бэлнээр"
                  name="Бэлнээр"
                  className={styles.checkbox}
                />
                <label for="Бэлнээр">Бэлнээр</label>
              </div>
              <div className="flex gap-2 items-center ">
                <input
                  type="checkbox"
                  id="Картаар"
                  name="Картаар"
                  className={styles.checkbox}
                />
                <label for="Картаар">Картаар</label>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderDetailStep1;

import OrderDetailStep2 from '@/components/OrderDetailStep2';
import OrderDetailStep1 from '@/components/orderDetailStep1';

const page = () => {
  return (
    <div className="flex flex-row gap-[180px] mx-auto justify-center items-start pb-20 pt-12">
      <OrderDetailStep1 />
      <OrderDetailStep2 />
    </div>
  );
};

export default page;

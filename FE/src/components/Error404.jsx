import ErrorIcon from '@/components/icons/ErrorIcon';

const Error404 = () => {
  return (
    <div className="flex items-center justify-start flex-col h-screen pt-[203px]">
      <ErrorIcon />
      <p className="text-[#808080]">
        Уучлаарай, систем ачааллахад алдаа гарлаа.
      </p>
    </div>
  );
};

export default Error404;

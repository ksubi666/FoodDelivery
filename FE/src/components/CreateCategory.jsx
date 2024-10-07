'use client';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { styles } from './AdminSideBar';
import { Plus, X } from 'lucide-react';
import { useRef } from 'react';
import { axiosInstance } from '@/lib/axios';

export const CreateCategory = () => {
  const formRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const { categoryName } = Object.fromEntries(formData);

    await axiosInstance.post('/category/create', {
      name: categoryName,
    });
    location.reload();
  };

  const clearClick = () => {
    formRef.current[1].value = '';
    formRef.current[1].focus();
  };
  return (
    <Dialog>
      <DialogTrigger className={styles.categoryAdd}>
        <Plus />
        <h4>Create new category</h4>
      </DialogTrigger>
      <DialogContent className="max-w-[587px] p-0">
        <form ref={formRef} onSubmit={handleSubmit}>
          <DialogHeader className="border-b py-4 px-6">
            <div className="flex justify-between items-center">
              <DialogTitle>Create new category</DialogTitle>
              <DialogClose>
                <X />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="p-6 flex flex-col gap-2">
            <h3 className="text-[14px] leading-[19.6px] font-medium">
              Category name
            </h3>
            <Input
              name="categoryName"
              className="bg-[#F4F4F4] h-[56px] px-3 text-[#8B8E95]"
              placeholder="Category name"
            />
          </div>
          <DialogFooter className="p-6 border-t gap-4">
            <Button
              type="button"
              onClick={clearClick}
              className="bg-white text-[#3F4145] h-10 w-[49px]"
            >
              Clear
            </Button>
            <Button
              type="submit"
              className="bg-[#3F4145] text-white h-10 w-[109px]"
            >
              Continue
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;

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
import { X } from 'lucide-react';
import { useRef } from 'react';
import { axiosInstance } from '@/lib/axios';
import { EditIcon } from './icons';

export const EditCategory = ({ response, i }) => {
  const formRef = useRef();

  const handleSubmit = async () => {
    const formData = new FormData(formRef.current);
    const { categoryName } = Object.fromEntries(formData);
    await axiosInstance.put(`/category/categoryUpdate/${response[i]._id}`, {
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
      <DialogTrigger className=" flex gap-4 py-2 px-4 text-[14px] text-[#161616]  font-medium">
        <EditIcon color="#525252" />
        <span>Edit name</span>
      </DialogTrigger>
      <DialogContent className="max-w-[587px] p-0">
        <form ref={formRef}>
          <DialogHeader className="border-b py-4 px-6">
            <div className="flex justify-between items-center">
              <DialogTitle>Edit category name</DialogTitle>
              <DialogClose>
                <X />
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="p-6 flex flex-col gap-2">
            <Input
              name="categoryName"
              className="bg-[#F4F4F4] h-[56px] px-3 text-[#8B8E95]"
              placeholder={response[i].name}
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
              onClick={handleSubmit}
              type="submit"
              className="bg-[#3F4145] text-white h-10 w-[109px]"
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;

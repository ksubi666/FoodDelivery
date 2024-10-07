'use client';
import { DataContext } from '@/app/food&category/page';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/categorySelect';
import { useContext } from 'react';

export const CategorySelect = ({ setCategoryId }) => {
  const { response } = useContext(DataContext);
  return (
    <Select onValueChange={(e) => setCategoryId(e)}>
      <SelectTrigger className="bg-[#F4F4F4] h-[56px] px-3 text-[#8B8E95] w-full">
        <SelectValue placeholder="Хоолны ангилал" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {response.map((el) => (
            <SelectItem value={el._id}>{el.name}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;

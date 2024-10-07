import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import LocationIcon from './icons/LocationIcon';

export const OrderDetailSelect = ({ triggerName, selectData }) => {
  return (
    <Select>
      <SelectTrigger className="w-full h-12 px-4 py-2">
        <div className="flex gap-2">
          <LocationIcon />
          <SelectValue placeholder={`${triggerName} сонгоно уу`} />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {selectData &&
            selectData.map((el) => <SelectItem value={el}>{el}</SelectItem>)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default OrderDetailSelect;

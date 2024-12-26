import { Button } from "./ui/button";
import { Share, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const HelperHeader = () => {
  return (
    <div className="__helper_header flex justify-between items-center text-white bg-black p-2">
      <div className="__btn_container flex justify-center items-center gap-2">
        <Button variant="success">
          <Download size={16} strokeWidth={1.75} />
          save
        </Button>
        <Button variant={"secondary"}>
          <Share size={16} strokeWidth={1.75} />
          share
        </Button>
      </div>
      <div className="__tab_switcher flex justify-center items-center gap-2 ">
        <small>current language:</small>
        <Select defaultValue="html" >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none offset-ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="html">HTML</SelectItem>
            <SelectItem value="css">CSS</SelectItem>
            <SelectItem value="javascript">Javascript</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default HelperHeader;

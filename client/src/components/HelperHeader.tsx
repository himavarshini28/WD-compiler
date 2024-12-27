import { Button } from "./ui/button";
import { Share, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  CompilerSliceStateType,
  updateCurrentLanguage,
} from "./redux/slices/compilerSlice";
import { RootState } from "./redux/store";

const HelperHeader = () => {
  const currentLanguage = useSelector(
    (state: RootState) => state.compilerSlice.currentLanguage
  );
  const dispatch = useDispatch();
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
        <Select
          defaultValue={currentLanguage}
          onValueChange={(value) => {
            dispatch(
              updateCurrentLanguage(
                value as CompilerSliceStateType["currentLanguage"]
              )
            );
          }}
        >
          <SelectTrigger className="w-[120px] bg-gray-800 outline-none offset-ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="w-full">
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

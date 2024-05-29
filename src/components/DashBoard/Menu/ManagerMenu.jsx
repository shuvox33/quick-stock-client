import { MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "../SideBar/MenuItem";

const ManagerMenu = () => {
    return (
        <div>
            <MenuItem icon={MdOutlineManageHistory} label={'Product Management'} address={'product-management'}></MenuItem>
        </div>
    );
};

export default ManagerMenu;
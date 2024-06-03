import { MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "../SideBar/MenuItem";

const ManagerMenu = () => {
    return (
        <div>
            <MenuItem icon={MdOutlineManageHistory} label={'Product Management'} address={'product-management'}></MenuItem>
            <MenuItem icon={MdOutlineManageHistory} label={'Product Section'} address={'product-section'}></MenuItem>
        </div>
    );
};

export default ManagerMenu;
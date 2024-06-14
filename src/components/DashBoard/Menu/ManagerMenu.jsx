import { MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "../SideBar/MenuItem";

const ManagerMenu = () => {
    return (
        <div>
            <MenuItem icon={MdOutlineManageHistory} label={'Product Management'} address={'/dashboard'}></MenuItem>
            <MenuItem icon={MdOutlineManageHistory} label={'Product Section'} address={'product-section'}></MenuItem>
            <MenuItem icon={MdOutlineManageHistory} label={'Subscription & Payment'} address={'subscription'}></MenuItem>
        </div>
    );
};

export default ManagerMenu;
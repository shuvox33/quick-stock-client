import { MdInventory2 } from 'react-icons/md';
import { Link } from 'react-router-dom';


const Logo = () => {
    return (
        <Link to='/'>
            <MdInventory2 className='text-3xl' />
        </Link>
    );
};

export default Logo;
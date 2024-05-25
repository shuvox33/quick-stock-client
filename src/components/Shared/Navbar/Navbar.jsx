import { Link } from 'react-router-dom'
import Container from '../Container'
// import logoImg from '../../../assets/images/logo.png'
import MenuDropdown from './MenuDropdown'
import { MdInventory2 } from "react-icons/md";

const Navbar = () => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row  items-center justify-between gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <div className='flex items-center gap-2'>
                <MdInventory2 className='text-3xl' />
                <h2 className='text-3xl font-semibold hidden md:block'>Quick Stock</h2>
              </div>
              {/* <img
                className='hidden md:block'
                src={logoImg}
                alt='logo'
                width='100'
                height='100'
              /> */}
            </Link>
            {/* Dropdown Menu */}
            <MenuDropdown />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar

import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import avatarImg from '../../../assets/images/placeholder.jpg'

const MenuDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logOut } = useAuth()

  const links = <>
    <div className='hidden md:flex flex-row  font-semibold md:gap-7 lg:gap-10 '>
      <NavLink to={'/'} className={({ isActive }) => `hover:bg-slate-200 rounded-md px-2 py-1 ${isActive && "bg-gray-200"}`}>Home</NavLink>
      <NavLink to={'/create'} className={({ isActive }) => `hover:bg-slate-200 rounded-md px-2 py-1 ${isActive && "bg-gray-200"}`}>Create-Store</NavLink>
      <NavLink to={'/watch'} className={({ isActive }) => `hover:bg-slate-200 rounded-md px-2 py-1 ${isActive && "bg-gray-200"}`}>Watch Demo</NavLink>
    </div>
  </>

  const handdleLogOut = async () =>{
    const result = logOut();
    console.log(result);
  }

  return (
    <>
      {links}
      {
        user ? (
          <div className='relative'>

            {/* Dropdown btn */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className='  p-4 md:py-1 md:px-3 border-[1px] border-neutral-200 flex flex-row items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition'
            >
              <AiOutlineMenu className='' />
              <div className='hidden md:block'>
                {/* Avatar */}
                <img
                  className='rounded-full h-7'
                  referrerPolicy='no-referrer'
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt='profile'
                  height='30'
                  width='30'
                />
              </div>
            </div>

            {isOpen && (
              <div className='absolute rounded-xl shadow-md w-[40vw] md:w-[15vw] bg-white overflow-hidden right-0 top-12 text-sm'>
                <div className='flex flex-col cursor-pointer'>
                  <Link
                    to='/'
                    className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center'
                  >
                    Home
                  </Link>
                  <Link
                    to='/'
                    className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center'
                  >
                    Create-Store
                  </Link>
                  <Link
                    to='/'
                    className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center'
                  >
                    Watch Demo
                  </Link>

                  <Link
                    to='/login'
                    className='px-4 py-3 hover:bg-neutral-100 transition font-semibold text-center'
                  >
                    Dashboard
                  </Link>
                  <button onClick={handdleLogOut} className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'>Log Out</button>
                </div>
              </div>
            )}

          </div>)
          :
          <NavLink to={'/login'} className={({ isActive }) => `bg-gray-200 rounded-md px-2 py-1 ${isActive && "bg-slate-300"}`}>Login</NavLink>
      }
    </>

  )
}

export default MenuDropdown

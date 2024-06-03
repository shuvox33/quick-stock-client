import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import {imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import { updateRole } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { createStore } from "../../api/store";

const CreateStore = () => {
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{

        e.preventDefault();
        const form = e.target;
        const storeName = form.store.value;
        const location = form.location.value;
        const description = form.description.value;
        const ownerName = user?.displayName;
        const ownerEmail = user?.email;
        const logo = form.logo.files[0]

        try {
            //upload log in imgbb
            const logoData = await imageUpload(logo);


            const storeInfo ={
                storeName,
                logo : logoData,
                description,
                location,
                ownerName,
                ownerEmail,
                limit : 3
            }

            // save store info in db 
            createStore(storeInfo);

            //update roles
            updateRole(user?.email, "manager")

            toast.success("Store Created")
            navigate('/dashboard');

        } catch (error) {
            console.log(error);
            toast(error.message)
        }

    }


    const {user, loading}= useAuth()
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
                <div className='mb-8 text-center'>
                    <h1 className='my-3 text-4xl font-bold'>Create Store</h1>
                    <p className='text-sm text-gray-400'>Welcome to Quick Store</p>
                </div>
                <form onSubmit={handleSubmit}
                    noValidate=''
                    action=''
                    className='space-y-6 ng-untouched ng-pristine ng-valid'
                >
                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='shop' className='block mb-2 text-sm'>
                                Store Name
                            </label>
                            <input
                                required
                                type='text'
                                name='store'
                                id='shop'
                                placeholder='Enter Your Shop Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='logo' className='block mb-2 text-sm'>
                                Select Logo:
                            </label>
                            <input
                                required
                                type='file'
                                id='logo'
                                name='logo'
                                accept='image/*'
                            />
                        </div>
                        <div>
                            <label htmlFor='description' className='block mb-2 text-sm'>
                                Description
                            </label>
                            <input
                                required
                                type='text'
                                name='description'
                                id='description'
                                placeholder='Enter Your Shop Description Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='location' className='block mb-2 text-sm'>
                                Location
                            </label>
                            <input
                            required
                                type='text'
                                name='location'
                                id='location'
                                placeholder='Enter Your Shop Location Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='name' className='block mb-2 text-sm'>
                                Owner Name
                            </label>
                            <input
                                type='text'
                                name='name'
                                id='name'
                                readOnly
                                defaultValue={user?.displayName}
                                // placeholder='Enter Your Shop Name Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                        <div>
                            <label htmlFor='email' className='block mb-2 text-sm'>
                                Email address
                            </label>
                            <input
                                type='email'
                                name='email'
                                id='email'
                                readOnly
                                defaultValue={user?.email}
                                required
                                // placeholder='Enter Your Email Here'
                                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                                data-temp-mail-org='0'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            className='bg-rose-500 w-full rounded-md py-3 text-white'
                        >
                            {loading ? (<TbFidgetSpinner className='animate-spin mx-auto' />) : ('Continue')}

                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateStore;
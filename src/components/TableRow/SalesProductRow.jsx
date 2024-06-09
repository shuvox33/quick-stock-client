
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
const SalesProductRow = ({product, setAddedProduct}) => {

    const handleAddProduct= () =>{
        setAddedProduct(prev=>{
            const temp = [...prev];
            const exist = temp.some(tempPro=>tempPro._id === product._id)

            if(product.quantity < 1){
                toast.error("No product availabe")
                return [...prev] 
            } 
            if(exist) {
                toast.error("product already exist")
                return [...prev];
            }
            
            return [...prev, product]
        })
    }

    return (
        <tr>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <div className='flex items-center'>
                <div className='flex-shrink-0'>
                    <div className='block relative'>
                        <img
                            alt='profile'
                            src={product?.image}
                            className='mx-auto object-cover rounded h-10 w-15 '
                        />
                    </div>
                </div>
                <div className='ml-3'>
                    <p className='text-gray-900 whitespace-no-wrap'>{product?.productName}</p>
                </div>
            </div>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <p className='text-gray-900 whitespace-no-wrap'>{product?.quantity}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <p className='text-gray-900 whitespace-no-wrap '>{product?.discount}</p>
        </td>
        <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
            <p className='text-gray-900 whitespace-no-wrap '>{product?.sellingPrice}</p>
        </td>
        <td className='px-5 py-5 border-b  border-gray-200 bg-white text-sm'>
            <button
                onClick={handleAddProduct}
                className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
            >
                <span
                    aria-hidden='true'
                    className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                ></span>
                <span className='relative'>Add</span>
            </button>
        </td>

    </tr>
    );
};
SalesProductRow.propTypes = {
    product: PropTypes.object,
    setAddedProduct:PropTypes.func
}
export default SalesProductRow;
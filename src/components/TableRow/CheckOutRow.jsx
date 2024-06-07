import PropTypes from 'prop-types';
import { useState } from 'react';
import toast from 'react-hot-toast';

const CheckOutRow = ({ product, addedProducts, setAddedProducts, setCheckOutProduct }) => {
    const handleRemoveProduct = () => {
        const updatedProducts = addedProducts.filter(pro => pro._id !== product._id)
        setAddedProducts(updatedProducts)
        toast.success("Product removed ")
    }

    const [quantity, setQuantity] = useState(product?.quantity)

    const handleIncrease = () => {
        if (1 + quantity > product.quantity) return toast.error("Quatity limit over")
        setQuantity(prevQuantity => prevQuantity + 1);

        setCheckOutProduct(prevProducts => {
            return prevProducts.map(prevProduct => {
                return product?._id === prevProduct?._id ? { ...prevProduct,saleCoutn: 1+quantity, quantity: product?.quantity-quantity + 1} : prevProduct
            })
        })
    }
    const handleDecrease = () => {
        if (quantity - 1 < 1) return toast.error("Minimum limit over")
        setQuantity(prevQuantity => (prevQuantity - 1));

        setCheckOutProduct(prevProducts => {
            return prevProducts.map(prevProduct => {
                return prevProduct?._id === product?._id ? { ...prevProduct, saleCoutn: quantity-1, quantity: product?.quantity-quantity-1 } : prevProduct
            })
        })

        // setCheckOutProduct(prevProducts => prevProducts.map(prevProduct => product?._id === prevProduct?._id ? { ...product, quantity: quantity } : product))
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
                <p className='text-gray-900 whitespace-no-wrap'>{product?.sellingPrice}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap '><button onClick={handleIncrease} className='p-3 text-xl'>+</button>{quantity}<button onClick={handleDecrease} className='p-3 text-xl'>-</button></p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap '>{product?.sellingPrice * quantity}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <button
                    onClick={handleRemoveProduct}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Remove</span>
                </button>
            </td>
        </tr>
    );
};
CheckOutRow.propTypes = {
    product: PropTypes.object,
    addedProducts: PropTypes.array,
    setAddedProducts: PropTypes.func,
    setCheckOutProduct: PropTypes.func
}
export default CheckOutRow;
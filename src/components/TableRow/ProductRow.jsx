import PropTypes from 'prop-types';
import { useState } from 'react';
import UpdateProductModal from '../Modal/UpdateProductModal';
import DeleteModal from '../Modal/DeleteModal';

const ProductRow = ({ product, refetch, handleDelete }) => {

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const onCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }


    const [openModal, setOpenModal] = useState(false);
    const onCloseModal = () => {
        setOpenModal(false)
    }

    return (
        <>
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
                    <p className='text-gray-900 whitespace-no-wrap '>{product?.saleCount}</p>
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <button
                        onClick={() => setOpenDeleteModal(true)}
                        className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                    >
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                        ></span>
                        <span className='relative'>Delete</span>
                    </button>
                    {/* Delete modal */}
                    <DeleteModal
                        isOpen={openDeleteModal}
                        closeModal={onCloseDeleteModal}
                        handleDelete={handleDelete}
                        id={product?._id}
                    />
                </td>
                <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                    <span className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
                        <span
                            aria-hidden='true'
                            className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                        ></span>
                        <span onClick={() => setOpenModal(true)} className='relative'>Update</span>
                    </span>
                    {
                        <UpdateProductModal openModal={openModal} onCloseModal={onCloseModal} product={product} refetch={refetch}></UpdateProductModal>
                    }
                </td>
            </tr>
        </>
    );
};


ProductRow.propTypes = {
    product: PropTypes.object,
    refetch: PropTypes.func,
    handleDelete: PropTypes.func
}
export default ProductRow;
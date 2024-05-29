import { Modal } from "flowbite-react";

const AddProductModal = ({ openModal, setOpenModal, onCloseModal }) => {
    return (
        <>

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form className="" action="">
                        <h2 className="text-3xl text-center mb-5 font-semibold">Add Product</h2>
                        <div className="flex gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Product Name</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="product-name" id="" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Quantity</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="product-quantity" id="" />
                            </div>
                        </div>
                        <div className="flex gap-5 my-3
                        ">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Production Cost</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="production-cost" id="" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Profit Margin(%)</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="profit-margin" id="" />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Product Location</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="product-location" id="" />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Description</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" name="product-description" id="" />
                            </div>
                        </div>
                        <div className="flex gap-5 my-3 items-center">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Description</label>
                                <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" name="product-description" id="" />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Image</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type='file' name="image" accept="image/*" />
                            </div>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default AddProductModal;
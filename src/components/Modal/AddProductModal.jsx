import { Modal } from "flowbite-react";
import PropTypes from 'prop-types';
import { useForm } from "react-hook-form"
import { imageUpload } from "../../api/utils";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { addProduct } from "../../api/product";
import { getStoreInfo, reduceLimit } from "../../api/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";


const AddProductModal = ({ openModal, onCloseModal }) => {

    const {user} = useAuth();
    const { register, handleSubmit } = useForm();

    const queryClient = useQueryClient();

    const deleteAndUpdate = async ({productInfo}) =>{
        await Promise.all([
            addProduct(productInfo),
            reduceLimit(productInfo?.ownerEmail)
        ])
    }
    const mutation = useMutation({
        mutationFn: deleteAndUpdate,
        onSuccess:()=>{
            queryClient.invalidateQueries(['product-list', 'productLimit','totalProduct'])
            toast.success('Product Added Successfuly');
        },
        onError: (error) =>{
            toast.error('An Error Occurred: ' + error.message)
        }   

    })

    const onSubmit = async(formInfo) => {

        try {
            const image = formInfo?.image[0];
            const imageData = await imageUpload(image);

            const storeInfo = await getStoreInfo(user?.email)

            const sellingPriceCal=()=>{
                const costWithtax = formInfo?.cost + ((formInfo?.cost * 7.5)/100);
                const sellingPrice = (costWithtax + ((costWithtax * formInfo?.profitMargin)/100));
                const sellingPriceWithDiscount = sellingPrice - ((sellingPrice * formInfo.discount)/100);
                return Math.ceil(sellingPriceWithDiscount);
            }
    
            const productInfo ={
                productName : formInfo?.name,
                quantity:formInfo?.quantity,
                description:formInfo?.description,
                location:formInfo?.location,
                productCost:formInfo?.cost,
                profitMargin:formInfo?.profitMargin,
                discount:formInfo?.discount,
                image:imageData,
                shopName:storeInfo?.storeName,
                ownerEmail:storeInfo?.ownerEmail,
                sellingPrice:sellingPriceCal(),
                saleCount: 0,
            }

            await mutation.mutateAsync({productInfo})
            // addProduct(productInfo);
            // reduceLimit(storeInfo?.ownerEmail, {limit:storeInfo?.limit})
            onCloseModal();

        } catch (error) {
            toast.error(error.message)
        }

    }
    return (
        <>

            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit(onSubmit)} className="" action="">
                        <h2 className="text-3xl text-center mb-5 font-semibold">Add Product</h2>
                        <div className="flex gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Product Name</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" {...register("name", { require: true })} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Quantity</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="number" {...register("quantity", { require: true, valueAsNumber:true})} />
                            </div>
                        </div>
                        <div className="flex gap-5 my-3
                        ">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Production Cost</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="number" {...register("cost", { require: true, valueAsNumber:true})} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Profit Margin(%)</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="number" {...register("profitMargin", { require: true, valueAsNumber:true})} />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-name">Product Location</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" {...register("location", { require: true })} />
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Description</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="text" {...register("description", { require: true })} />
                            </div>
                        </div>
                        <div className="flex gap-5 my-3 items-center">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Discount</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type="number" {...register("discount", { require: true, valueAsNumber:true })} />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900" htmlFor="product-quantity">Product Image</label>
                                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" type='file' name="image" accept="image/*" {...register("image", { require: true })} />
                            </div>
                        </div>
                        <div className="flex items-center justify-center mt-4">
                            <input className="px-4 py-2 rounded-lg bg-teal-500 text-center text-white" type="submit" value="Submit" />
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );


};

AddProductModal.propTypes = {
    openModal: PropTypes.bool,
    onCloseModal: PropTypes.func,
}

export default AddProductModal;
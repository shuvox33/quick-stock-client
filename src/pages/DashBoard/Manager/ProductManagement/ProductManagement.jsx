import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import AddProductModal from "../../../../components/Modal/AddProductModal";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import ProductList from "./ProductList";
import Loader from "../../../../components/Shared/Loader";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../../../api";


const ProductManagement = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const {data:productLimit} = useQuery({
        queryKey:['productLimit'],
        queryFn: async ()=>{
            const {data} = await axiosSecure.get(`/store-info/${user?.email}`)
            return data.limit;
        }
    });
    const {data:totalProduct, isLoading} = useQuery({
        queryKey:['totalProduct'],
        queryFn: async ()=>{
            const {data} = await axiosSecure(`/total-product/${user?.email}`)
            return data.count;
        }
    });

    const addProduct = () => {
        if(productLimit < 1){
            toast.error('Product Limit Over');
            navigate('/');
        }
        else setOpenModal(true)
    }

    const [openModal, setOpenModal] = useState(false);
    function onCloseModal() {
        setOpenModal(false);
    }

    if(isLoading) return <Loader></Loader>
    return (
        <>
            <div className="flex justify-center items-center ">
                <div >
                    <h2 className={`${!totalProduct ? 'hidden' : ''} text-3xl border-y-2  border-black py-2 px-5`}>Total {totalProduct} Product Added</h2>
                </div>
                <div className="text-center">
                    {
                        !totalProduct && <h3 className="text-2xl mb-3">No Product Added</h3>
                    }
                    <button onClick={addProduct} className="bg-cyan-400 text-white px-4 py-4 rounded-sm ">Add Product</button>
                </div>
            </div>

            {/* modal  */}
            <AddProductModal openModal={openModal} onCloseModal={onCloseModal} />
            {/* product list  */}
            <ProductList></ProductList>
        </>
    );
};

export default ProductManagement;
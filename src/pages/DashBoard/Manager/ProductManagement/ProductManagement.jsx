import { useEffect, useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import AddProductModal from "../../../../components/Modal/AddProductModal";
import { totalProduct } from "../../../../api/product";
import { getStoreInfo } from "../../../../api/auth";
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import ProductList from "./ProductList";
import Loader from "../../../../components/Shared/Loader";


const ProductManagement = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [productCount, setProductCount] = useState(0)
    const [productLimit, setProductLimit] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    
    useEffect(() => {
        setIsLoading(true)
        totalProduct(user?.email).then(data => setProductCount(data?.count))
        setIsLoading(false)
    }, [user?.email])

    useEffect(() => {
        getStoreInfo(user?.email)
            .then(data => setProductLimit(data.limit))
    }, [user?.email])

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
                    <h2 className={`${!productCount ? 'hidden' : ''} text-3xl border-y-2  border-black py-2 px-5`}>Total {productCount} Product Added</h2>
                </div>
                <div className="text-center">
                    {
                        !productCount && <h3 className="text-2xl mb-3">No Product Added</h3>
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
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import AddProductModal from "../../../components/Modal/AddProductModal";
import { totalProduct } from "../../../api/product";

const ProductManagement = () => {

    const { user } = useAuth();

    const [productCount, setProductCount] = useState({})
    useEffect(() => {
        totalProduct(user?.email).then(data => setProductCount(data.count))
    }, [user?.email])

    console.log(productCount);

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

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
                    <button onClick={() => setOpenModal(true)} className="bg-cyan-400 text-white px-4 py-4 rounded-sm ">Add Product</button>
                </div>
            </div>

            {/* modal  */}
            <AddProductModal openModal={openModal} onCloseModal={onCloseModal} />

        </ >
    );
};

export default ProductManagement;
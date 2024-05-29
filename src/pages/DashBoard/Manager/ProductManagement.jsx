import { useState } from "react";
import { isEmptyShop } from "../../../api/product";
import useAuth from "../../../hooks/useAuth";
import AddProductModal from "../../../components/Modal/AddProductModal";

const ProductManagement = () => {

    const { user } = useAuth();
    const result = isEmptyShop(user?.email);

    const [openModal, setOpenModal] = useState(false);

    function onCloseModal() {
        setOpenModal(false);
    }

    console.log(result);
    return (
        <div>
            <div>
                <h3>No Product Added</h3>
                {/* <Button onClick={() => setOpenModal(true)}>Toggle modal</Button> */}
                <button onClick={()=> setOpenModal(true)} className="bg-cyan-400 text-white px-4 py-2 rounded-lg">Add Product</button>
            </div>

            <div>

            </div>

            {/* modal  */}
            <AddProductModal  openModal={openModal} setOpenModal={setOpenModal} onCloseModal={onCloseModal}/>

        </div >
    );
};

export default ProductManagement;
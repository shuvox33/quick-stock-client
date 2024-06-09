import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SalesProductList from "./SalesProductList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SalesCollection = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('')
    const [addedProduct, setAddedProduct] = useState(() => {
        const savedProducts = localStorage.getItem("addedProduct");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });


    useEffect(() => {
        localStorage.setItem("addedProduct", JSON.stringify(addedProduct));
    }, [addedProduct])

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchQuery);
    }

    const handleCheckOut = () =>{
        if(addedProduct.length < 1 ) toast.error("No Product for Check-Out")
            else navigate('check-out') 
    }

    return (
        <div>
            <div >
                <form onSubmit={handleSearch} className="flex w-full max-w-sm items-center mx-auto space-x-2" action="">
                    <Input onChange={(e) => setSearchQuery(e.target.value)} name="searchValue" type="text" placeholder="Product Name" />
                    <Button type="submit">Search</Button>
                </form>
            </div>

            <div className='mt-10'>
                <div className="relative">
                    <h3 className="text-center text-3xl absolute left-1/2 transform -translate-x-1/2">Product List</h3>
                    <div className="dropdown dropdown-end absolute right-10">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">{addedProduct.length}</span>
                            </div>
                        </div>
                        <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                            <div className="card-body">
                                <span className="font-bold text-lg text-black">{addedProduct.length} Items</span>
                                <div className="card-actions">
                                        <button onClick={handleCheckOut} className="btn btn-primary btn-block">View cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-10">
                    <SalesProductList searchQuery={searchQuery} setAddedProduct={setAddedProduct} ></SalesProductList>
                </div>
            </div>
        </div>
    );
};

export default SalesCollection;
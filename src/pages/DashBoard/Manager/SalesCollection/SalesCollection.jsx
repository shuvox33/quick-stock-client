import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SalesProductList from "./SalesProductList";
import { useState } from "react";

const SalesCollection = () => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(searchQuery);
    }

    // onChange={(e) => setSearchQuery(e.target.value)} 
    return (
        <div>
            <div >
                <form onSubmit={handleSearch} onChange={(e) => setSearchQuery(e.target.value)} className="flex w-full max-w-sm items-center mx-auto space-x-2" action="">
                    <Input name="searchValue" type="text" placeholder="Product Name" />
                    <Button onSubmit={handleSearch} type="submit">Search</Button>
                </form>
            </div>

            <div className='mt-10'>
                <h3 className="text-center text-3xl ">Product List</h3>
                <SalesProductList></SalesProductList>
            </div>
        </div>
    );
};

export default SalesCollection;
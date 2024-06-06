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

    return (
        <div>
            <div >
                <form onSubmit={handleSearch}  className="flex w-full max-w-sm items-center mx-auto space-x-2" action="">
                    <Input onChange={(e) => setSearchQuery(e.target.value)} name="searchValue" type="text" placeholder="Product Name" />
                    <Button type="submit">Search</Button>
                </form>
            </div>

            <div className='mt-10'>
                <h3 className="text-center text-3xl ">Product List</h3>
                <SalesProductList searchQuery={searchQuery} ></SalesProductList>
            </div>
        </div>
    );
};

export default SalesCollection;
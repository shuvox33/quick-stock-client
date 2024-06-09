
import CheckOutRow from "@/components/TableRow/CheckOutRow";
import { Button } from "@/components/ui/button";
import useUpdateProductAndSales from "@/hooks/useUpdateProductAndSales";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const CheckOutList = () => {

    const navigate = useNavigate();

    const [addedProducts, setAddedProducts] = useState(() => {
        const savedProducts = localStorage.getItem("addedProduct");
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [checkOutProduct, setCheckOutProduct] = useState(() => {
        const savedProduct = localStorage.getItem("addedProduct");
        return savedProduct ? JSON.parse(savedProduct) : [];
    })

    useEffect(() => {
        localStorage.setItem("addedProduct", JSON.stringify(addedProducts));
    }, [addedProducts])

    const handleClear = () => {
        localStorage.removeItem('addedProduct');
        setAddedProducts([]);
    }

    const mutation = useUpdateProductAndSales();
    const handleCheckOut = async () => {
        try {

            await mutation.mutateAsync(checkOutProduct)
            setAddedProducts([]);
        } catch (error) {
            console.error(error);
            setAddedProducts([]);

        }
    }

    if (addedProducts.length < 1) {
        return <h2 className="text-center text-2xl">No Product Added</h2>
    }
    return (
        <div className='container mx-auto px-4 sm:px-8'>
            <div className='py-8'>
                <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table className='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-normal'
                                    >
                                        Name
                                    </th>
                                    {/* <th
                                    scope='col'
                                    className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                >
                                    Image
                                </th> */}
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Total Price
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Remove
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* product row data */}
                                {
                                    (addedProducts?.map(product => (
                                        <CheckOutRow addedProducts={addedProducts} setAddedProducts={setAddedProducts} key={product._id} product={product} checkOutProduct={checkOutProduct} setCheckOutProduct={setCheckOutProduct} />
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-row gap-3">
                    <Button onClick={() => navigate(-1)}>Continue Shoping</Button>
                    <Button onClick={handleClear}>Clear Cart</Button>
                </div>
                <Button onClick={handleCheckOut} className='bg-red-400'>Check-Out</Button>
            </div>
        </div>
    );
};

export default CheckOutList;
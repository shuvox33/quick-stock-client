import useAuth from "../../../../hooks/useAuth";
import ProductRow from "../../../../components/TableRow/ProductRow";
import { useMutation, useQuery } from "@tanstack/react-query";
import Loader from '../../../../components/Shared/Loader'
import axiosSecure from "../../../../api";
import toast from "react-hot-toast";
import { increaseLimit } from "../../../../api/product";

const ProductList = () => {

    const { user } = useAuth();

    const {data:products=[], isLoading, refetch} = useQuery({
        queryKey:['product-list', user?.email],
        queryFn: async ()=> {
            const {data} = await axiosSecure.get(`/added-product/${user?.email}`)
            // const {data} = await allAddedProduct(user?.email)
            return data;
        },
        onSuccess: (data) => {
            console.log('Query success:', data); // Debugging line
        }
    })

    //delete
    const {mutateAsync} = useMutation({
        mutationFn: async id =>{
            const {data} = await axiosSecure.delete(`/delete-product/${id}`);
            const {data2} = await increaseLimit(user?.email);
            return {data, data2}
        },
        onSuccess: data =>{
            console.log(data);
            refetch();
            toast.success('Successfully Deleted')
        }
    })

    //handle delete
    const handleDelete = async id =>{
        try {
            await mutateAsync(id)
        } catch (error) {
            console.log(error);
        }
    }

    if(isLoading) return <Loader/>
    return (
        <>
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
                                            Quantity
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Sales Count
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                        >
                                            Update
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* product row data */}
                                    {
                                        (products?.map(product => (
                                        <ProductRow key={product._id} product={product} refetch={refetch} handleDelete={handleDelete}/>
                                    )))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
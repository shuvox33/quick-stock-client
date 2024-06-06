import axiosSecure from "@/api";
import Loader from "@/components/Shared/Loader";
import SalesProductRow from "@/components/TableRow/SalesProductRow";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import PropTypes from 'prop-types';

const SalesProductList = ({searchQuery}) => {
    const { user } = useAuth()

    const { data: products, isLoading } = useQuery({
        queryKey: ['sales-products'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/added-product/${user?.email}`)
            return data;
        }
    })

    const filteredProducts = searchQuery ? 
    products.filter(product => product.productName.toLowerCase().includes(searchQuery.toLowerCase()))
    : products;

    if (isLoading) return <Loader></Loader>
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
                                        Quantity
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Discount
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Selling Price
                                    </th>
                                    <th
                                        scope='col'
                                        className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Add For Checkout
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* product row data */}
                                {
                                    (filteredProducts?.map(product => (
                                        <SalesProductRow key={product._id} product={product} />
                                    )))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};
SalesProductList.propTypes = {
    searchQuery: PropTypes.string,
}
export default SalesProductList;
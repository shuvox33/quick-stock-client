import { updateProduct } from "@/api/product";
import { addSalesRecord } from "@/api/sales";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProductAndSales = () => {
    return useMutation({
        mutationFn: async (products) => {

            console.log(products);

            const updatePromis = products.map(async (product) => {
                await updateProduct(product?._id, product);
                await addSalesRecord( product);
            });
            await Promise.all(updatePromis);
        },
        onSuccess: () => {
            toast.success('Products and sales updated successfully');
        },
        onError: (error) => {
            toast.error(`Update failed: ${error.message}`);
        }
    });
};

export default useUpdateProductAndSales;
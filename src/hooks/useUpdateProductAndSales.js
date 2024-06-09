import { updateProduct } from "@/api/product";
import { addSalesRecord } from "@/api/sales";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUpdateProductAndSales = () => {
    return useMutation({
    mutationFn: async (products) => {

            const updatePromis = products.map(async (product) => {
                const salesHistry = {
                    name: product?.productName,
                    profit:(product?.saleCount - product?.prevSales) * (product?.sellingPrice - product?.productCost)
                }
                await updateProduct(product?._id, product);
                await addSalesRecord( salesHistry);
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
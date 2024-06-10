import { updateProduct } from "@/api/product";
import { addSalesRecord } from "@/api/sales";
import { useMutation } from "@tanstack/react-query";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

const useUpdateProductAndSales = () => {
    const doc = new jsPDF();
    return useMutation({
        mutationFn: async (products) => {
            const updatePromis = products.map(async (product, index) => {
                const salesHistry = {
                    name: product?.productName,
                    quantity: (product?.saleCount - product?.prevSales),
                    profit: (product?.saleCount - product?.prevSales) * (product?.sellingPrice - product?.productCost)
                }
                console.log(salesHistry);
                await updateProduct(product?._id, product);
                await addSalesRecord( salesHistry);
                const yOffset = 10 + index * 40; // Adjust yOffset to prevent text overlap

                // Add text to PDF, converting numbers to strings
                doc.text(`Name: ${salesHistry?.name || ''}`, 10, yOffset);
                doc.text(`Quantity: ${salesHistry?.quantity || 0}`, 10, yOffset + 10);
                doc.text(`Profit: ${salesHistry?.profit || 0}`, 10, yOffset + 20);
                });
                await Promise.all(updatePromis);
                },
                onSuccess: () => {
                    toast.success('Products and sales updated successfully');
                    doc.save('sales.pdf');
                    
                    // doc.text(salesHistry?.name || '', 10, 10)
                    // doc.text(salesHistry?.qunatity || '', 10, 10)
                    // doc.text(salesHistry?.profit || '', 10, 10)
        },
        onError: (error) => {
            toast.error(`Update failed: ${error.message}`);

        }
    });
};

export default useUpdateProductAndSales;
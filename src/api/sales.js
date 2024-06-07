import axiosSecure from ".";


export const addSalesRecord = async (product)=>{
    const {data} = await axiosSecure.post('/sales', {...product, saleDate: new Date().toISOString()})
    return data;

}
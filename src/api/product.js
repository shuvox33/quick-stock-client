import axiosSecure from "."

export const totalProduct = async (email) =>{
    const {data} = await axiosSecure(`/total-product/${email}`);
    return data;
}

export const addProduct = async(productInfo)=>{
    const {data} = await axiosSecure.post('/add-product', productInfo);
    return data;
}

export const reduceLimit = async(email,limit)=>{
    const {data} = await axiosSecure.patch(`/reduce-limit/${email}`, limit);
    return data;
}
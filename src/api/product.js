import axiosSecure from "."

export const totalProduct = async (email) =>{
    const {data} = await axiosSecure(`/total-product/${email}`);
    return data.count;
}

export const addProduct = async(productInfo)=>{
    const {data} = await axiosSecure.post('/add-product', productInfo);
    return data;
}

export const allAddedProduct = async(email)=>{
    const {data} = await axiosSecure.get(`/added-product/${email}`);
    return data;
}

export const updateProduct = async(id, product)=>{
    const {data} = await axiosSecure.patch(`/update-product/${id}`,product);
    return data;
}
import axiosSecure from "."

export const isEmptyShop = async (email) =>{
    const {data} = await axiosSecure(`/is-empty/${email}`);
    return data;
}
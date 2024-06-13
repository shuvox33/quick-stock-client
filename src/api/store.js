import axiosSecure from ".";

export const createStore = async (storeInfo) => {
    const { data } = await axiosSecure.post('/create-store', storeInfo)
    return data;
}
export const getStoreInfo = async(email)=>{
    const {data} = await axiosSecure.get(`/store-info/${email}`);
    return data;

}
export const getStoreLimit = async(email)=>{
    try {
        const {data} = await axiosSecure.get(`/store-info/${email}`);
        return data.limit;          
    } catch (error) {
        console.error("Error  limit:", error);
        throw error;
    }

}
export const reduceLimit = async(email)=>{
    const {data} = await axiosSecure.patch(`/reduce-limit/${email}`);
    return data;
}
export const increaseLimit = async(email)=>{
    const {data} = await axiosSecure.patch(`/increase-limit/${email}`);
    return data;
}

export const subscriptionLimit = async (email, limit)=>{
    console.log(limit);
    const {data} = await axiosSecure.patch(`/apply-subscription/${email}`, {limit})
    return data;
}
import api from "./authService/AxiosConfig"

const baseURL = "/v1/lendings"

const AddLendingData = async (lending: any) => {
    try{
        const response = await api.post(
            baseURL, 
            lending
        );
        return response.data;
    }catch(error){
        console.error("Error adding data:", error);
        throw error;
    }
}

const DeleteLending = async (lendingId: string) => {
    try{
        const response = await api.delete(
            `${baseURL}?lendingId=${lendingId}`
        );
        return response.data;
    }catch(error){
        console.error("Error deleting data:", error);
        throw error;
    }
}

const GetLendings = async () => {
    try{
        const response = await api.get(`${baseURL}/getalllendings`);
        return response.data;
    }catch(error){
        console.error("Error fetching lendings:", error);
        throw error;
    }
}

const UpdateLending = async (lending: any) => {
    try{
        const response = await api.patch(
            `${baseURL}?lendingId=${lending.lendingId}`, 
            lending
        );
        return response.data;
    }catch(error){
        console.error("Error updating data:", error);
        throw error;
    }
}

export { AddLendingData, GetLendings, DeleteLending, UpdateLending };
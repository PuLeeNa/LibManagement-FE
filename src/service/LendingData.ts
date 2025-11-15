import axios from "axios"

const baseURL = "http://localhost:8081/booklib/api/v1/lendings"

const AddLendingData = async (lending: any) => {
    try{
        const response = await axios.post(
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
        const response = await axios.delete(
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
        const response = await axios.get(`${baseURL}/getalllendings`);
        return response.data;
    }catch(error){
        console.error("Error fetching lendings:", error);
        throw error;
    }
}

const UpdateLending = async (lending: any) => {
    try{
        const response = await axios.patch(
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
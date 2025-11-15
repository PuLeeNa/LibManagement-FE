import api from "./authService/AxiosConfig"

const baseURL = "/v1/staffs"

const AddStaffData = async (staff: any) => {
    try{
        const response = await api.post(
            baseURL, 
            staff
        );
        return response.data;
    }catch(error){
        console.error("Error adding data:", error);
        throw error;
    }
}

const DeleteStaff = async (staffId: string) => {
    try{
        const response = await api.delete(
            `${baseURL}?staffId=${staffId}`
        );
        return response.data;
    }catch(error){
        console.error("Error deleting data:", error);
        throw error;
    }
}

const GetStaffs = async () => {
    try{
        const response = await api.get(`${baseURL}/getallstaffs`);
        return response.data;
    }catch(error){
        console.error("Error fetching staffs:", error);
        throw error;
    }
}

const UpdateStaff = async (staff: any) => {
    try{
        const response = await api.patch(
            `${baseURL}?staffId=${staff.staffId}`, 
            staff
        );
        return response.data;
    }catch(error){
        console.error("Error updating data:", error);
        throw error;
    }
}

export { AddStaffData, GetStaffs, DeleteStaff, UpdateStaff };
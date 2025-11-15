import api from "./authService/AxiosConfig"

const baseURL = "/v1/members"

const AddMemberData = async (member: any) => {
    try{
        const response = await api.post(
            baseURL, 
            member
        );
        return response.data;
    }catch(error){
        console.error("Error adding data:", error);
        throw error;
    }
}

const DeleteMember = async (memberId: string) => {
    try{
        const response = await api.delete(
            `${baseURL}?memberId=${memberId}`
        );
        return response.data;
    }catch(error){
        console.error("Error deleting data:", error);
        throw error;
    }
}

const GetMembers = async () => {
    try{
        const response = await api.get(`${baseURL}/getallmembers`);
        return response.data;
    }catch(error){
        console.error("Error fetching members:", error);
        throw error;
    }
}

const UpdateMember = async (member: any) => {
    try{
        const response = await api.patch(
            `${baseURL}?memberId=${member.memberId}`, 
            member
        );
        return response.data;
    }catch(error){
        console.error("Error updating data:", error);
        throw error;
    }
}

export { AddMemberData, GetMembers, DeleteMember, UpdateMember };
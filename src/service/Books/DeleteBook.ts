import axios from "axios"

const deleteURL = "http://localhost:8081/booklib/api/v1/books"

export const DeleteBook = async (bookId: string) => {

    try{
        const response = await axios.delete(
            `${deleteURL}?bookId=${bookId}`
        );
        return response.data;
    }catch(error){
        console.error("Error deleting data:", error);
        throw error;
    }
}

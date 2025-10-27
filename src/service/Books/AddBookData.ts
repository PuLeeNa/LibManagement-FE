import axios from "axios"

const addURL = "http://localhost:8081/booklib/api/v1/books"

export const AddBookData = async (book: any) => {

    try{
        const response = await axios.post(
            addURL, 
            book
        );
        return response.data;
    }catch(error){
        console.error("Error adding data:", error);
        throw error;
    }
}
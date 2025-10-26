import axios from "axios"

const updateURL = "http://localhost:8081/booklib/api/v1/books"

export const UpdateBook = async (book: any) => {

    try{
        const response = await axios.patch(
            `${updateURL}?bookId=${book.bookId}`, 
            book
        );
        return response.data;
    }catch(error){
        console.error("Error updating data:", error);
        throw error;
    }
}
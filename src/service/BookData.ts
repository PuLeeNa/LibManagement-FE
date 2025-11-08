import axios from "axios"

const baseURL = "http://localhost:8081/booklib/api/v1/books"

const AddBookData = async (book: any) => {
    try{
        const response = await axios.post(
            baseURL, 
            book
        );
        return response.data;
    }catch(error){
        console.error("Error adding data:", error);
        throw error;
    }
}

const DeleteBook = async (bookId: string) => {
    try{
        const response = await axios.delete(
            `${baseURL}?bookId=${bookId}`
        );
        return response.data;
    }catch(error){
        console.error("Error deleting data:", error);
        throw error;
    }
}

const GetBooks = async () => {
    try{
        const response = await axios.get(`${baseURL}/getallbooks`);
        return response.data;
    }catch(error){
        console.error("Error fetching books:", error);
        throw error;
    }
}

const UpdateBook = async (book: any) => {
    try{
        const response = await axios.patch(
            `${baseURL}?bookId=${book.bookId}`, 
            book
        );
        return response.data;
    }catch(error){
        console.error("Error updating data:", error);
        throw error;
    }
}

export { AddBookData, GetBooks, DeleteBook, UpdateBook };
import axios from "axios"

const getBooksURL = "http://localhost:8081/booklib/api/v1/books/getallbooks"

export const GetBooks = async () => {

    try{
        const response = await axios.get(getBooksURL);
        console.log(response.data);
    }catch(error){
        console.error("Error fetching books:", error);
        throw error;
    }
}
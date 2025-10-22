import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/Books/GetBooks';

export function BookConsole() {

  const [bookData, setBookData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const bookDetails = await GetBooks();
            setBookData(bookDetails);
        };
        loadData();
    }, []);

    const tHeads: string[] = [
        "Book Id",
        "Name",
        "Author",
        "Edition",
        "Publisher",
        "ISBN",
        "Price",
        "Total Qty",
        "Available Qty",
        "Last Update Date",
        "Last Update Time"
    ];

    return (
        <>
        <Table striped bordered hover>
      <thead>
        <tr>
          {tHeads.map((headings) => (
            <th>{headings}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        
      </tbody>
    </Table>
        </>
    )
}
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/Books/GetBooks';

export function BookConsole() {

  interface Book {
    bookId: string;
    bookName: string;
    author: string;
    edition: string;
    publisher: string;
    isbn: string;
    price: number;
    totalQty: number;
    availableQty: number;
    lastUpdateDate: string;
    lastUpdateTime: string;
  }

  const [bookData, setBookData] = useState<Book[]>([]);

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
        {bookData.map((row)=> (
          <tr key={row.bookId}>
            {Object.values(row).map((cell, index)=> (
              <td key={index}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
        </>
    )
}
import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { GetBooks } from '../service/Books/GetBooks';

export function BookConsole() {

    useEffect(() => {
        const loadData = async () => {
            const bookDetails = await GetBooks();
            console.log(bookDetails);
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
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan={2}>Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
        </>
    )
}
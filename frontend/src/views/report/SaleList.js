import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords } from "../../Utils";

const path = "report/sale";

export default function SaleList() {
    const [allrecs, setAllrecs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => showRecords(path, setError, setAllrecs), []);

    if (error) {
        return <Error error={error} />;
    } else if (!allrecs) {
        return <p>Loading...</p>;
    } else if (allrecs.length > 0) {
        return (
            <>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Order Date</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.order_id}>
                                <td>{recref.order_id}</td>
                                <td>{recref.firstname}</td>
                                <td>{recref.lastname}</td>
                                <td>{new Date(recref.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.productname}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } else {
        return (
            <>
                <p>No Records Available</p>
            </>
        );
    }
}
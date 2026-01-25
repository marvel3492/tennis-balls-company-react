import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords, deleteRecord } from "../../Utils";

const path = "saleorder";

export default function SaleOrderAllRecordsPage() {
    const [allrecs, setAllrecs] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e, recordid) => {
        e.preventDefault(); // prevent page reload
        deleteRecord(path, recordid, setError, setAllrecs);
    };

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
                            <th>Customer ID</th>
                            <th>Sale Date</th>
                            <th>Customer Notes</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.order_id}>
                                <td>{recref.order_id}</td>
                                <td>{recref.customer_id}</td>
                                <td>{new Date(recref.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.customernotes}</td>
                                <td>{recref.paymentstatus}</td>
                                <td>
                                    <a href={`/${path}/${recref.order_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.order_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) handleSubmit(e, recref.order_id); }}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    } else {
        return (
            <>
                <p>No Records Available</p>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    }
}
    
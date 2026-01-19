import { useState, useEffect } from "react";
import Error from "../Error";

const path = "product";

export default function ProductAllRecordsPage() {
    const [allrecs, setAllrecs] = useState(null);
    const [error, setError] = useState(null);

    function showRecords() {
        fetch(`http://localhost:5000/${path}`).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAllrecs(data.allrecs);
            }
        });
    }

    const handleSubmit = async (e, recordid) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}/delete`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({recordid})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            showRecords();
        }
    };

    useEffect(() => showRecords(), []);

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
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Homepage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.product_id}>
                                <td>{recref.product_id}</td>
                                <td>{recref.productname}</td>
                                <td>{recref.prodimage}</td>
                                <td>{recref.description}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.stock}</td>
                                <td>{recref.homepage}</td>
                                <td>
                                    <a href={`/${path}/${recref.product_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.product_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) handleSubmit(e, recref.product_id); }}>Delete</a>
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
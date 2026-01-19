import { useState, useEffect } from "react";
import Error from "../Error";

const path = "promotion";

export default function PromotionAllRecordsPage() {
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
                            <th>Promotion ID</th>
                            <th>Promotion Title</th>
                            <th>Promotion Image</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Discount Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.promotion_id}>
                                <td>{recref.promotion_id}</td>
                                <td>{recref.promotitle}</td>
                                <td>{recref.promoimage}</td>
                                <td>{recref.description}</td>
                                <td>{new Date(recref.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{new Date(recref.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.discountrate + "%"}</td>
                                <td>
                                    <a href={`/${path}/${recref.promotion_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.promotion_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) handleSubmit(e, recref.promotion_id); }}>Delete</a>
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
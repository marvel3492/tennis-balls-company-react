import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords, deleteRecord } from "../../Utils";

const path = "promotion";

export default function PromotionAllRecordsPage() {
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
                            <th>Promotion ID</th>
                            <th>Image ID</th>
                            <th>Promotion Title</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Discount Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.promotion_id}>
                                <td>{recref.promotion_id}</td>
                                <td>{recref.image_id}</td>
                                <td>{recref.promotitle}</td>
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
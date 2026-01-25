import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords, deleteRecord } from "../../Utils";

const path = "image";

export default function ImageAllRecordsPage() {
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
                            <th>Image ID</th>
                            <th>Filename</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.image_id}>
                                <td>{recref.image_id}</td>
                                <td>{recref.filename}</td>
                                <td><img src={`http://localhost:5000/images/${recref.filename}`} alt={recref.description} width="100" height="100" /></td>
                                <td>{recref.description}</td>
                                <td>
                                    <a href={`/${path}/${recref.image_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.image_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) handleSubmit(e, recref.image_id); }}>Delete</a>
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
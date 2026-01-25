import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords, deleteRecord } from "../../Utils";

const path = "customer";

export default function CustomerAllRecordsPage() {
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
                            <th>Customer ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>State</th>
                            <th>Zip</th>
                            <th>Username</th>
                            <th>Admin?</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.customer_id}>
                                <td>{recref.customer_id}</td>
                                <td>{recref.firstname}</td>
                                <td>{recref.lastname}</td>
                                <td>{recref.email}</td>
                                <td>{recref.phone}</td>
                                <td>{recref.address}</td>
                                <td>{recref.city}</td>
                                <td>{recref.state}</td>
                                <td>{recref.zip}</td>
                                <td>{recref.username}</td>
                                <td>{recref.isadmin ? 'Yes' : 'No'}</td>
                                <td>
                                    <a href={`/${path}/${recref.customer_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.customer_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) handleSubmit(e, recref.customer_id); }}>Delete</a>
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
import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords } from "../../Utils";

const path = "report/customer";

export default function CustomerList() {
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
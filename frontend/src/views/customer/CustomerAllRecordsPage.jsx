import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isCustomerArray } from "shared/Data";

const path = "customer";

export default function CustomerAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isCustomerArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
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
                        {response.map((recref) => (
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
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.customer_id, setResponse); }}>Delete</a>
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
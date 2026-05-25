import { useParams } from "react-router-dom";
import { useResponseState, hasError, useEffectOneRecord } from "../../Utils";
import ErrorPage from "../ErrorPage";
import { isCustomer } from "shared/Data";

const path = "customer";

export default function CustomerOneRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useResponseState();
    useEffectOneRecord(path, setResponse, id);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isCustomer(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Details</h1>
                <table>
                    <tbody>
                        <tr><td>Customer ID: </td><td>{response.customer_id}</td></tr>
                        <tr><td>First Name: </td><td>{response.firstname}</td></tr>
                        <tr><td>Last Name: </td><td>{response.lastname}</td></tr>
                        <tr><td>Email: </td><td>{response.email}</td></tr>
                        <tr><td>Phone: </td><td>{response.phone}</td></tr>
                        <tr><td>Address: </td><td>{response.address}</td></tr>
                        <tr><td>City: </td><td>{response.city}</td></tr>
                        <tr><td>State: </td><td>{response.state}</td></tr>
                        <tr><td>Zip: </td><td>{response.zip}</td></tr>
                        <tr><td>Username: </td><td>{response.username}</td></tr>
                        <tr><td>Admin? </td><td>{response.isadmin ? 'Yes' : 'No'}</td></tr>
                    </tbody>
                </table>
            </>
        );
    }
}
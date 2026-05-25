import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { fetchDataWithCatch, useCustomerState, useResponseState, hasError, updateRecord } from "../../Utils";

const path = "customer";

export default function CustomerAddRecordPage() {
    const [record, setRecord] = useCustomerState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    const handleSubmit = (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!data || !(typeof data === "object") || !("redirect" in data) || !(typeof data.redirect === "boolean")) {
                setResponse(new Error("Unexpected data type"));
            } else if (data.redirect) {
                navigate(`/customer/login`);
            } else {
                navigate(`/${path}`);
            }
        }, setResponse, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify(record)
        });
    };

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>First Name: </td><td><input type="text" name="firstname" maxLength={20} value={record.firstname} onChange={(e) => updateRecord(setRecord, "firstname", e.target.value)} required /></td></tr>
                            <tr><td>Last Name: </td><td><input type="text" name="lastname" maxLength={20} value={record.lastname} onChange={(e) => updateRecord(setRecord, "lastname", e.target.value)} required /></td></tr>
                            <tr><td>Email: </td><td><input type="email" name="email" maxLength={25} value={record.email} onChange={(e) => updateRecord(setRecord, "email", e.target.value)} required /></td></tr>
                            <tr><td>Phone: </td><td><input type="text" name="phone" maxLength={20} value={record.phone} onChange={(e) => updateRecord(setRecord, "phone", e.target.value)} required /></td></tr>
                            <tr><td>Address: </td><td><input type="text" name="address" maxLength={50} value={record.address} onChange={(e) => updateRecord(setRecord, "address", e.target.value)} required /></td></tr>
                            <tr><td>City: </td><td><input type="text" name="city" maxLength={20} value={record.city} onChange={(e) => updateRecord(setRecord, "city", e.target.value)} required /></td></tr>
                            <tr><td>State: </td><td><input type="text" name="state" maxLength={50} value={record.state} onChange={(e) => updateRecord(setRecord, "state", e.target.value)} required /></td></tr>
                            <tr><td>Zip: </td><td><input type="text" name="zip" maxLength={10} value={record.zip} onChange={(e) => updateRecord(setRecord, "zip", e.target.value)} required /></td></tr>
                            <tr><td>Username: </td><td><input type="text" name="username" maxLength={20} value={record.username} onChange={(e) => updateRecord(setRecord, "username", e.target.value)} required /></td></tr>
                            <tr><td>Password: </td><td><input type="password" name="password" maxLength={30} value={record.password} onChange={(e) => updateRecord(setRecord, "password", e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
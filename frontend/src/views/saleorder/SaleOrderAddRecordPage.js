import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const path = "saleorder";

export default function SaleOrderAddRecordPage() {
    const [customer_id, setCustomerId] = useState("");
    const [saledate, setSaleDate] = useState("");
    const [customernotes, setCustomerNotes] = useState("");
    const [paymentstatus, setPaymentStatus] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        const res = await fetch(`http://localhost:5000/${path}`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({customer_id, saledate, customernotes, paymentstatus})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>Customer ID: </td><td><input type="number" name="customer_id" min={0} max={9223372036854775807n} value={customer_id} onChange={(e) => setCustomerId(e.target.value)} required /></td></tr>
                            <tr><td>Sale Date: </td><td><input type="date" name="saledate" value={saledate} onChange={(e) => setSaleDate(e.target.value)} required /></td></tr>
                            <tr><td>Customer Notes: </td><td><textarea name="customernotes" rows="10" cols="30" placeholder="Description" maxLength={500} value={customernotes} onChange={(e) => setCustomerNotes(e.target.value)} /></td></tr>
                            <tr><td>Payment Status: </td><td><input type="number" name="paymentstatus" min={0} max={2} value={paymentstatus} onChange={(e) => setPaymentStatus(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
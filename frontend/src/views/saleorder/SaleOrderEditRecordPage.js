import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";

const path = "saleorder";

export default function SaleOrderEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [customer_id, setCustomerId] = useState(null);
    const [saledate, setSaleDate] = useState(null);
    const [customernotes, setCustomerNotes] = useState(null);
    const [paymentstatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, customer_id, saledate, customernotes, paymentstatus})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/${path}/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setCustomerId(data.onerec.customer_id);
                    setSaleDate(data.onerec.saledate);
                    setCustomerNotes(data.onerec.customernotes);
                    setPaymentStatus(data.onerec.paymentstatus);
                    setOnerec(data.onerec);
                }
            });
    }, [id]);
    
    if (error) {
        return <Error error={error} />;
    } else if (onerec) {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="order_id" value={onerec.promotion_id} />
                    <table>
                        <tr> <td> Customer ID: </td> <td> <input type="number" name="customer_id" value={customer_id} onChange={(e) => setCustomerId(e.target.value)} required /> </td> </tr>
                        <tr> <td> Sale Date: </td> <td> <input type="date" name="saledate" value={saledate} onChange={(e) => setSaleDate(e.target.value)} required /> </td> </tr>
                        <tr> <td> Customer Notes: </td> <td> <textarea name="customernotes" rows="10" cols="30" placeholder="Description" value={customernotes} onChange={(e) => setCustomerNotes(e.target.value)} /> </td> </tr>
                        <tr> <td> Payment Status: </td> <td> <input type="number" name="paymentstatus" value={paymentstatus} onChange={(e) => setPaymentStatus(e.target.value)} required /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
}
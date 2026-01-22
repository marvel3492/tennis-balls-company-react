import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";

const path = "saleorder";

function SaleOrderOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Order ID: </td><td>{onerec.order_id}</td></tr>
                    <tr><td>Customer ID: </td><td>{onerec.customer_id}</td></tr>
                    <tr><td>Sale Date: </td><td>{new Date(onerec.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>Customer Notes: </td><td>{onerec.customernotes}</td></tr>
                    <tr><td>Payment Status: </td><td>{onerec.paymentstatus}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function SaleOrderOneRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:5000/${path}/${id}/show`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setOnerec(data.onerec);
                }
            });
    }, [id]);
    
    if (error) {
        return <Error error={error} />;
    } else if (onerec) {
        return <SaleOrderOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
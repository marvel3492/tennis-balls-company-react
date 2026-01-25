import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowRecord } from "../../Utils";
import Error from "../Error";

const path = "orderdetail";

function OrderDetailOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Order Detail ID: </td><td>{onerec.orderdetail_id}</td></tr>
                    <tr><td>Order ID: </td><td>{onerec.order_id}</td></tr>
                    <tr><td>Product ID: </td><td>{onerec.product_id}</td></tr>
                    <tr><td>Sale Price: </td><td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td></tr>
                    <tr><td>Quantity: </td><td>{onerec.qty}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function OrderDetailOneRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => fetchShowRecord(path, id, setError, setOnerec), [id]);
    
    if (error) {
        return <Error error={error} />;
    } else if (onerec) {
        return <OrderDetailOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
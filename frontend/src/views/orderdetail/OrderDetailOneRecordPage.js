import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";

const path = "orderdetail";

function OrderDetailOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tr> <td> Order Detail ID: </td> <td>{onerec.orderdetail_id}</td> </tr>
                <tr> <td> Order ID: </td> <td>{onerec.order_id}</td> </tr>
                <tr> <td> Product ID: </td> <td>{onerec.product_id}</td> </tr>
                <tr> <td> Sale Price: </td> <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td> </tr>
                <tr> <td> Quantity: </td> <td>{onerec.qty}</td> </tr>
            </table>
        </>
    );
}

export default function OrderDetailOneRecordPage() {
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
        return <OrderDetailOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
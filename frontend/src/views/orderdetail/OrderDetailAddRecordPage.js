import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const path = "orderdetail";

export default function OrderDetailAddRecordPage() {
    const [order_id, setOrderId] = useState(null);
    const [product_id, setProductId] = useState(null);
    const [saleprice, setSalePrice] = useState(null);
    const [qty, setQuantity] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order_id, product_id, saleprice, qty})
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
                        <tr> <td> Order ID: </td> <td> <input type="number" name="order_id" value={order_id} onChange={(e) => setOrderId(e.target.value)} required /> </td> </tr>
                        <tr> <td> Product ID: </td> <td> <input type="number" name="product_id" value={product_id} onChange={(e) => setProductId(e.target.value)} required /> </td> </tr>
                        <tr> <td> Sale Price: </td> <td> <input type="text" name="saleprice" value={saleprice} onChange={(e) => setSalePrice(e.target.value)} required /> </td> </tr>
                        <tr> <td> Quantity: </td> <td> <input type="number" name="qty" value={qty} onChange={(e) => setQuantity(e.target.value)} required /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";
import { isValidDecimal } from "../../Utils";

const path = "orderdetail";

export default function OrderDetailEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [order_id, setOrderId] = useState("");
    const [product_id, setProductId] = useState("");
    const [saleprice, setSalePrice] = useState("");
    const [qty, setQuantity] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (!isValidDecimal(saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
            return;
        }

        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, order_id, product_id, saleprice, qty})
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
                    setOrderId(data.onerec.order_id);
                    setProductId(data.onerec.product_id);
                    setSalePrice(data.onerec.saleprice);
                    setQuantity(data.onerec.qty);
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
                    <input type="hidden" name="orderdetail_id" value={onerec.orderdetail_id} />
                    <table>
                        <tbody>
                            <tr><td>Order ID: </td><td><input type="number" name="order_id" min={1} max={9223372036854775807n} value={order_id} onChange={(e) => setOrderId(e.target.value)} required /></td></tr>
                            <tr><td>Product ID: </td><td><input type="number" name="product_id" min={1} max={9223372036854775807n} value={product_id} onChange={(e) => setProductId(e.target.value)} required /></td></tr>
                            <tr><td>Sale Price: </td><td><input type="text" name="saleprice" value={saleprice} onChange={(e) => setSalePrice(e.target.value)} required /></td></tr>
                            <tr><td>Quantity: </td><td><input type="number" name="qty" min={0} max={9223372036854775807n} value={qty} onChange={(e) => setQuantity(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
}
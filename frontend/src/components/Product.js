import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../../src/views/Error";
import logo from "../../src/assets/logo.png"

export default function Product({recref}) {
    const [qty, setQuantity] = useState(1);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const product_id = recref.product_id;
        const res = await fetch(`http://localhost:5000/catalog/add`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({product_id, qty}),
            credentials: "include"
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/catalog/cart`);
        }
    };

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <div className="product">
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="product_id" value={recref.product_id} />
                    <table>
                        <tbody>
                            <tr><td colSpan="2"><b>{recref.productname}</b></td></tr>
                            <tr><td colSpan="2"><img src={recref.filename ? `http://localhost:5000/images/${recref.filename}` : logo} alt={recref.description} width="100" height="100" /></td></tr>
                            <tr>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td><td>Stock: {recref.stock}</td>
                                <td><a href={`/product/${recref.product_id}/show`}>Details</a></td>
                            </tr>
                            <tr>
                                <td>Quantity:
                                    <select name="qty" width="3" value={qty} onChange={(e) => setQuantity(e.target.value)} required>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </td>
                                <td><button type="submit">Add to Cart</button></td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
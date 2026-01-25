import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function showCart() {
        fetch(`http://localhost:5000/catalog/cart`, {
            method: "GET",
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCart(data);
            }
        });
    }

    const handleSubmit = async (e, product_id) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/catalog/remove`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({product_id}),
            credentials: "include"
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            showCart();
        }
    };

    function checkout(e) {
        e.preventDefault();
        fetch("http://localhost:5000/customer/credentials", {
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if (data.customer_id) {
                navigate('/catalog/checkout');
            } else {
                navigate('/customer/login');
            }
        });
    }
    
    useEffect(showCart, []);    

    if (error) {
        return <Error error={error} />;
    } else if (cart) {
        if (cart.cartitems.length > 0) {
            return (
                <>
                    <p>Here products selected in your cart:</p>
                    <table border={1}>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Line Cost</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.cartitems.map((item, index) => (
                                <tr key={item.product_id}>
                                    <td>{item.productname}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.saleprice)}</td>
                                    <td>{cart.qtys[index]}</td>
                                    <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.lineItemCosts[index])}</td>
                                    <td><form onSubmit={(e) => handleSubmit(e, item.product_id)}>
                                        <input type="hidden" name="product_id" value={item.product_id} />
                                        <button type="submit">Remove</button>
                                    </form></td>
                                </tr>
                            ))}
                            <tr bgcolor="yellow">
                                <td colSpan="2"><b>Totals</b></td>
                                <td>Quantity: {cart.totqty}</td>
                                <td>Cost: {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cart.totprice)}</td>
                                <td><button className='button1' onClick={checkout}>Checkout</button></td>
                            </tr>
                        </tbody>
                    </table>
                </>
            );
        } else {
            return <p>Cart Is Empty</p>;
        }
    } else {
        return <p>Loading...</p>;
    }
}
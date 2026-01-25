import { useState, useEffect, useRef } from "react";
import Error from "../Error";

export default function Checkout() {
    const [orderNumber, setOrderNumber] = useState(null);
    const [error, setError] = useState(null);
    const didRun = useRef(false);

    function showCheckout() {
        if (didRun.current) return;
        didRun.current = true;

        fetch(`http://localhost:5000/catalog/checkout`, {
            method: "POST",
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setOrderNumber(data.ordernum);
            }
        });
    }

    useEffect(showCheckout, []);    

    if (error) {
        return <Error error={error} />;
    } else if (orderNumber) {
        if (orderNumber === -1) {
            return <p>Add products to your cart before checking out.</p>;
        } else {
            return (
                <>
                    <p>Thank you for the order.</p>
                    <p>Your order number is: {orderNumber}</p>
                </>
            );
        }
    } else {
        return <p>Loading...</p>;
    }
}
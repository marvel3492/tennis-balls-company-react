import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ permissions, children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:5000/customer/credentials", {
            credentials: "include"
        })
        .then(res => res.json())
        .then(data => {
            setUser(data);
            setLoading(false);
        });
    }, []);
    if (loading) return null; // or a spinner
    
    let guest = false;
    let customer = false;
    let admin = false;
    if (user.isadmin) {
        admin = true;
    } else if (user.customer_id) {
        customer = true;
    } else {
        guest = true;
    }

    if ((permissions % 2 === 0 && guest) || (permissions % 2 === 1 && !guest)) {
        return <Navigate to="/" replace />;
    }
    if (((permissions >> 1) % 2 === 0 && customer) || ((permissions >> 1) % 2 === 1 && !customer)) {
        return <Navigate to="/" replace />;
    }
    if (((permissions >> 2) % 2 === 0 && admin) || ((permissions >> 2) % 2 === 1 && !admin)) {
        return <Navigate to="/" replace />;
    }
    return children;
}
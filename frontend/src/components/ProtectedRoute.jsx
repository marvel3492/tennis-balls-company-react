import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { fetchDataWithCatch, useResponseState, hasError } from "../Utils";
import ErrorPage from "../views/ErrorPage";
import { isUser } from "shared/Data";

/**
 * @param {{permissions: number, children: React.PropsWithChildren<React.ReactElement>}} props
 */
export default function ProtectedRoute({permissions, children}) {
    const [response, setResponse] = useResponseState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => fetchDataWithCatch("http://localhost:5000/customer/credentials", (data) => {
        setResponse(data);
        setLoading(false);
    }, setResponse, {credentials: "include"}), [setResponse]);

    if (loading) return null;
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isUser(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else {
        let guest = false;
        let customer = false;
        let admin = false;
        if (response.isadmin) {
            admin = true;
        } else if (response.customer_id) {
            customer = true;
        } else {
            guest = true;
        }

        if (permissions % 2 === 0 && guest) {
            return <Navigate to="/" replace />;
        } else if ((permissions >> 1) % 2 === 0 && customer) {
            return <Navigate to="/" replace />;
        } else if ((permissions >> 2) % 2 === 0 && admin) {
            return <Navigate to="/" replace />;
        }
        return children;
    }
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowRecord } from "../../Utils";
import Error from "../Error";

const path = "product";

function ProductOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Product ID: </td><td>{onerec.product_id}</td></tr>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Product Name: </td><td>{onerec.productname}</td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                    <tr><td>Sale Price: </td><td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td></tr>
                    <tr><td>Stock: </td><td>{onerec.stock}</td></tr>
                    <tr><td>Homepage: </td><td>{onerec.homepage}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function ProductOneRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => fetchShowRecord(path, id, setError, setOnerec), [id]);
    
    if (error) {
        return <Error error={error} />;
    } else if (onerec) {
        return <ProductOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
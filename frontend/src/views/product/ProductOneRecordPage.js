import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";

const path = "product";

function ProductOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tr> <td> Product ID: </td> <td>{onerec.product_id}</td> </tr>
                <tr> <td> Product Name: </td> <td>{onerec.productname}</td> </tr>
                <tr> <td> Image: </td> <td>{onerec.prodimage}</td> </tr>
                <tr> <td> Description: </td> <td>{onerec.description}</td> </tr>
                <tr> <td> Sale Price: </td> <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(onerec.saleprice)}</td> </tr>
                <tr> <td> Stock: </td> <td>{onerec.stock}</td> </tr>
                <tr> <td> Homepage: </td> <td>{onerec.homepage}</td> </tr>
            </table>
        </>
    );
}

export default function ProductOneRecordPage() {
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
        return <ProductOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
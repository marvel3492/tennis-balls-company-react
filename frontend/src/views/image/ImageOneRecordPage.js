import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Error from "../Error";

const path = "image";

function ImageOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Filename: </td><td>{onerec.filename}</td></tr>
                    <tr><td>Image: </td><td><img src={`http://localhost:5000/images/${onerec.filename}`} alt={onerec.description} width="100" height="100" /></td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                </tbody>
            </table>
        </>
    );
}

export default function ImageOneRecordPage() {
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
        return <ImageOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchShowRecord } from "../../Utils";
import Error from "../Error";

const path = "promotion";

function PromotionOneRecord({onerec}) {
    return (
        <>
            <h1>Details</h1>
            <table>
                <tbody>
                    <tr><td>Promotion ID: </td><td>{onerec.promotion_id}</td></tr>
                    <tr><td>Image ID: </td><td>{onerec.image_id}</td></tr>
                    <tr><td>Promotion Title: </td><td>{onerec.promotitle}</td></tr>
                    <tr><td>Description: </td><td>{onerec.description}</td></tr>
                    <tr><td>Start Date: </td><td>{new Date(onerec.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>End Date: </td><td>{new Date(onerec.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                    <tr><td>Discount Rate: </td><td>{onerec.discountrate + "%"}</td></tr>
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
        return <PromotionOneRecord onerec={onerec} />;
    } else {
        return <p>Loading...</p>;
    }
}
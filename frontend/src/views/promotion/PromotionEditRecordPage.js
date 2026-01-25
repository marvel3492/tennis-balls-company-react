import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";
import { isValidDecimal } from "../../Utils";

const path = "promotion";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [image_id, setImageId] = useState("");
    const [promotitle, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startdate, setStartDate] = useState("");
    const [enddate, setEndDate] = useState("");
    const [discountrate, setDiscount] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (!isValidDecimal(discountrate)) {
            alert("Discount rate must be a finite non-negative decimal with up to two decimals");
            return;
        }

        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include",
            body: JSON.stringify({id, promotitle, image_id, description, startdate, enddate, discountrate})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/${path}/${id}/edit`,
            {credentials: "include"}
        ).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setTitle(data.onerec.promotitle);
                setImageId(data.onerec.image_id);
                setDescription(data.onerec.description);
                setStartDate(data.onerec.startdate);
                setEndDate(data.onerec.enddate);
                setDiscount(data.onerec.discountrate);
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
                    <input type="hidden" name="promotion_id" value={onerec.promotion_id} />
                    <table>
                        <tbody>
                            <tr><td>Image ID: </td><td><input type="number" name="image_id" min={1} max={9223372036854775807n} value={image_id} onChange={(e) => setImageId(e.target.value)} /></td></tr>
                            <tr><td>Promotion Title: </td><td><input type="text" name="promotitle" maxLength={50} value={promotitle} onChange={(e) => setTitle(e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows="10" cols="30" placeholder="Description" maxLength={200} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                            <tr><td>Start Date: </td><td><input type="date" name="startdate" value={startdate} onChange={(e) => setStartDate(e.target.value)} required /></td></tr>
                            <tr><td>End Date: </td><td><input type="date" name="enddate" value={enddate} onChange={(e) => setEndDate(e.target.value)} /></td></tr>
                            <tr><td>Discount Rate: </td><td><input type="text" name="discountrate" value={discountrate} onChange={(e) => setDiscount(e.target.value)} /></td></tr>
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
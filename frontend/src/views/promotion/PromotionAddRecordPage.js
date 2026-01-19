import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const path = "promotion";

export default function PromotionAddRecordPage() {
    const [promotitle, setTitle] = useState(null);
    const [promoimage, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [startdate, setStartDate] = useState(null);
    const [enddate, setEndDate] = useState(null);
    const [discountrate, setDiscount] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({promotitle, promoimage, description, startdate, enddate, discountrate})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tr> <td> Promotion Title: </td> <td> <input type="text" name="promotitle" value={promotitle} onChange={(e) => setTitle(e.target.value)} required /> </td> </tr>
                        <tr> <td> Promotion Image: </td> <td> <input type="text" name="promoimage" value={promoimage} onChange={(e) => setImage(e.target.value)} required /> </td> </tr>
                        <tr> <td> Description: </td> <td> <textarea name="description" rows="10" cols="30" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /> </td> </tr>
                        <tr> <td> Start Date: </td> <td> <input type="date" name="startdate" value={startdate} onChange={(e) => setStartDate(e.target.value)} required /> </td> </tr>
                        <tr> <td> End Date: </td> <td> <input type="date" name="enddate" value={enddate} onChange={(e) => setEndDate(e.target.value)} /> </td> </tr>
                        <tr> <td> Discount Rate: </td> <td> <input type="text" name="discountrate" value={discountrate} onChange={(e) => setDiscount(e.target.value)} /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
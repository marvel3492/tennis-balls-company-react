import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const path = "image";

export default function ImageAddRecordPage() {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (image.size > 2 * 1024 * 1024) {
            alert("Image must be under 2 MB");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("description", description);

        const res = await fetch(`http://localhost:5000/${path}`, {
            method: "POST",
            credentials: "include",
            body: formData
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
                        <tbody>
                            <tr><td>Image: </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={(e) => {console.log(e.target.files[0]); setImage(e.target.files[0])}} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows="10" cols="30" placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
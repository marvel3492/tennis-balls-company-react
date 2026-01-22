import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";

const path = "image";

export default function ImageEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (image && image.size > 2 * 1024 * 1024) {
            alert("Image must be under 2 MB");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);
        formData.append("id", id);
        formData.append("description", description);

        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            body: formData
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/${path}/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setDescription(data.onerec.description);
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
                    <input type="hidden" name="image_id" value={onerec.image_id} />
                    <table>
                        <tbody>
                            <tr><td>Image (optional): </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={(e) => {console.log(e.target.files[0]); setImage(e.target.files[0])}} /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows="10" cols="30" placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
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
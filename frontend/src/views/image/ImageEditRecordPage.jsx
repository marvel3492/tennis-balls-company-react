import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { fetchDataWithCatch, useImageState, useResponseState, hasError, onImageChange, updateRecord, useEffectEditRecord } from "../../Utils";
import { isImage } from "shared/Data";
import { useCallback, useState } from "react";

const path = "image";

export default function ImageEditRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = useImageState();
    const [response, setResponse] = useResponseState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffectEditRecord(path, setResponse, useCallback((data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isImage(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setRecord({...data, image_id: data.image_id.toString(), image: null});
        }
        setLoaded(true);
    }, [setResponse, setRecord]), id);

    const handleSubmit = async (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        if (!record.image) {
            alert("Please select an image");
        } else if (record.image.size > 2 * 1024 * 1024) {
            alert("Image must be under 2 MB");
        } else if (!id) {
            alert("Id is not defined");
        } else {
            const formData = new FormData();
            formData.append("file", record.image);
            formData.append("id", id);
            formData.append("description", record.description);
            fetchDataWithCatch(`http://localhost:5000/${path}/save`, (data) => {
                if (hasError(data)) {
                    setResponse(data);
                } else {
                    navigate(`/${path}`);
                }
            }, setResponse, {
                method: "POST",
                credentials: "include",
                body: formData
            });
        }
    };

    if (!loaded) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="image_id" value={record.image_id} />
                    <table>
                        <tbody>
                            <tr><td>Image (optional): </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={onImageChange(setRecord)} /></td></tr>
                            <tr><td>Description (optional): </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={record.description} onChange={(e) => updateRecord(setRecord, "description", e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
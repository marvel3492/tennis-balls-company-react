import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { fetchDataWithCatch, useImageState, useResponseState, hasError, onImageChange, updateRecord } from "../../Utils";

const path = "image";

export default function ImageAddRecordPage() {
    const [record, setRecord] = useImageState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    const handleSubmit = (/** @type SubmitFormEvent */ e) => {
        e.preventDefault(); // prevent page reload
        if (!record.image) {
            alert("Please select an image");
        } else if (record.image.size > 2 * 1024 * 1024) {
            alert("Image must be under 2 MB");
        } else {
            const formData = new FormData();
            formData.append("file", record.image);
            formData.append("description", record.description);
            fetchDataWithCatch(`http://localhost:5000/${path}`, (data) => {
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

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr><td>Image: </td><td><input type="file" name="image" accept=".png,.jpg,.jpeg,.gif" onChange={onImageChange(setRecord)} required /></td></tr>
                            <tr><td>Description (optional): </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={record.description} onChange={(e) => updateRecord(setRecord, "description", e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useResponseState, hasError, useEffectOneRecord } from "../../Utils";
import { isImage } from "shared/Data";

const path = "image";

export default function ImageOneRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useResponseState();
    useEffectOneRecord(path, setResponse, id);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isImage(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Details</h1>
                <table>
                    <tbody>
                        <tr><td>Image ID: </td><td>{response.image_id}</td></tr>
                        <tr><td>Filename: </td><td>{response.filename}</td></tr>
                        <tr><td>Image: </td><td><img src={`http://localhost:5000/images/${response.filename}`} alt={response.description} width="100" height="100" /></td></tr>
                        <tr><td>Description: </td><td>{response.description}</td></tr>
                    </tbody>
                </table>
            </>
        );
    }
}
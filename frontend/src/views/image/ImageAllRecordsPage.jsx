import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isImageArray } from "shared/Data";

const path = "image";

export default function ImageAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isImageArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Image ID</th>
                            <th>Filename</th>
                            <th>Image</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((recref) => (
                            <tr key={recref.image_id}>
                                <td>{recref.image_id}</td>
                                <td>{recref.filename}</td>
                                <td><img src={`http://localhost:5000/images/${recref.filename}`} alt={recref.description} width="100" height="100" /></td>
                                <td>{recref.description}</td>
                                <td>
                                    <a href={`/${path}/${recref.image_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.image_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.image_id, setResponse); }}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    } else {
        return (
            <>
                <p>No Records Available</p>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    }
}
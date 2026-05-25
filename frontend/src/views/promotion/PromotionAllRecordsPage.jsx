import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isPromotionArray } from "shared/Data";

const path = "promotion";

export default function PromotionAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isPromotionArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Promotion ID</th>
                            <th>Image ID</th>
                            <th>Promotion Title</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Discount Rate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((recref) => (
                            <tr key={recref.promotion_id}>
                                <td>{recref.promotion_id}</td>
                                <td>{recref.image_id}</td>
                                <td>{recref.promotitle}</td>
                                <td>{recref.description}</td>
                                <td>{new Date(recref.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{new Date(recref.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.discountrate + "%"}</td>
                                <td>
                                    <a href={`/${path}/${recref.promotion_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.promotion_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.promotion_id, setResponse); }}>Delete</a>
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
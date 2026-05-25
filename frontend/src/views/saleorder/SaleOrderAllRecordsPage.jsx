import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isSaleOrderArray } from "shared/Data";

const path = "saleorder";

export default function SaleOrderAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isSaleOrderArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer ID</th>
                            <th>Sale Date</th>
                            <th>Customer Notes</th>
                            <th>Payment Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((recref) => (
                            <tr key={recref.order_id}>
                                <td>{recref.order_id}</td>
                                <td>{recref.customer_id}</td>
                                <td>{new Date(recref.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td>
                                <td>{recref.customernotes}</td>
                                <td>{recref.paymentstatus}</td>
                                <td>
                                    <a href={`/${path}/${recref.order_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.order_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.order_id, setResponse); }}>Delete</a>
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
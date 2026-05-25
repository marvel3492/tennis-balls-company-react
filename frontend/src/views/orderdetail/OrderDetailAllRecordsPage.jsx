import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isOrderDetailArray } from "shared/Data";

const path = "orderdetail";

export default function OrderDetailAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isOrderDetailArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Order Detail ID</th>
                            <th>Order ID</th>
                            <th>Product ID</th>
                            <th>Sale Price</th>
                            <th>Quantity</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((recref) => (
                            <tr key={recref.orderdetail_id}>
                                <td>{recref.orderdetail_id}</td>
                                <td>{recref.order_id}</td>
                                <td>{recref.product_id}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.qty}</td>
                                <td>
                                    <a href={`/${path}/${recref.orderdetail_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.orderdetail_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.orderdetail_id, setResponse); }}>Delete</a>
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
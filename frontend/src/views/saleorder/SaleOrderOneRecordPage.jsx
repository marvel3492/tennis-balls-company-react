import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useResponseState, hasError, useEffectOneRecord } from "../../Utils";
import { isSaleOrder } from "shared/Data";

const path = "saleorder";

export default function SaleOrderOneRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useResponseState();
    useEffectOneRecord(path, setResponse, id);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isSaleOrder(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Details</h1>
                <table>
                    <tbody>
                        <tr><td>Order ID: </td><td>{response.order_id}</td></tr>
                        <tr><td>Customer ID: </td><td>{response.customer_id}</td></tr>
                        <tr><td>Sale Date: </td><td>{new Date(response.saledate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                        <tr><td>Customer Notes: </td><td>{response.customernotes}</td></tr>
                        <tr><td>Payment Status: </td><td>{response.paymentstatus}</td></tr>
                    </tbody>
                </table>
            </>
        );
    }
}
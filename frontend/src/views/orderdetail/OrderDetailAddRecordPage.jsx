import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, useOrderDetailState, useResponseState, handleOrderDetailSubmit, hasError, updateRecord } from "../../Utils";

const path = "orderdetail";

export default function OrderDetailAddRecordPage() {
    const [record, setRecord] = useOrderDetailState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleOrderDetailSubmit(record, addRecord, path, {...record}, setResponse, navigate)}>
                    <table>
                        <tbody>
                            <tr><td>Order ID: </td><td><input type="number" name="order_id" min={1} max={"9223372036854775807"} value={record.order_id} onChange={(e) => updateRecord(setRecord, "order_id", e.target.value)} required /></td></tr>
                            <tr><td>Product ID: </td><td><input type="number" name="product_id" min={1} max={"9223372036854775807"} value={record.product_id} onChange={(e) => updateRecord(setRecord, "product_id", e.target.value)} required /></td></tr>
                            <tr><td>Sale Price: </td><td><input type="text" name="saleprice" value={record.saleprice} onChange={(e) => updateRecord(setRecord, "saleprice", e.target.value)} required /></td></tr>
                            <tr><td>Quantity: </td><td><input type="number" name="qty" min={1} max={"9223372036854775807"} value={record.qty} onChange={(e) => updateRecord(setRecord, "qty", e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
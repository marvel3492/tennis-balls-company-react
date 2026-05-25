import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { editRecord, useOrderDetailState, useResponseState, handleOrderDetailSubmit, hasError, updateRecord, useEffectEditRecord } from "../../Utils";
import { isOrderDetail } from "shared/Data";
import { useCallback, useState } from "react";

const path = "orderdetail";

export default function OrderDetailEditRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = useOrderDetailState();
    const [response, setResponse] = useResponseState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffectEditRecord(path, setResponse, useCallback((data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isOrderDetail(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setRecord({...data, orderdetail_id: data.orderdetail_id.toString(), order_id: data.order_id.toString(), product_id: data.product_id.toString(), saleprice: data.saleprice.toString(), qty: data.qty.toString()});
        }
        setLoaded(true);
    }, [setResponse, setRecord]), id);

    if (!loaded) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleOrderDetailSubmit(record, editRecord, path, { id, ...record }, setResponse, navigate)}>
                    <input type="hidden" name="orderdetail_id" value={record.orderdetail_id} />
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
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { editRecord, useResponseState, useSaleOrderState, handleDefaultSubmit, hasError, updateRecord, useEffectEditRecord } from "../../Utils";
import { isSaleOrder } from "shared/Data";
import { useCallback, useState } from "react";

const path = "saleorder";

export default function SaleOrderEditRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = useSaleOrderState();
    const [response, setResponse] = useResponseState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffectEditRecord(path, setResponse, useCallback((data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isSaleOrder(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setRecord({...data, order_id: data.order_id.toString(), customer_id: data.customer_id.toString(), paymentstatus: data.paymentstatus.toString()});
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
                <form onSubmit={handleDefaultSubmit(editRecord, path, { id, ...record }, setResponse, navigate)}>
                    <input type="hidden" name="order_id" value={record.order_id} />
                    <table>
                        <tbody>
                            <tr><td>Customer ID: </td><td><input type="number" name="customer_id" min={0} max={"9223372036854775807"} value={record.customer_id} onChange={(e) => updateRecord(setRecord, "customer_id", e.target.value)} required /></td></tr>
                            <tr><td>Sale Date: </td><td><input type="date" name="saledate" value={record.saledate} onChange={(e) => updateRecord(setRecord, "saledate", e.target.value)} required /></td></tr>
                            <tr><td>Customer Notes: </td><td><textarea name="customernotes" rows={10} cols={30} placeholder="Description" maxLength={500} value={record.customernotes} onChange={(e) => updateRecord(setRecord, "customernotes", e.target.value)} /></td></tr>
                            <tr><td>Payment Status: </td><td><input type="number" name="paymentstatus" min={0} max={2} value={record.paymentstatus} onChange={(e) => updateRecord(setRecord, "paymentstatus", e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
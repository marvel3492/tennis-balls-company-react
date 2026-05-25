import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, useResponseState, useSaleOrderState, handleDefaultSubmit, hasError, updateRecord } from "../../Utils";

const path = "saleorder";

export default function SaleOrderAddRecordPage() {
    const [record, setRecord] = useSaleOrderState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleDefaultSubmit(addRecord, path, {...record}, setResponse, navigate)}>
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
import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, usePromotionState, useResponseState, handlePromotionSubmit, hasError, updateRecord } from "../../Utils";

const path = "promotion";

export default function PromotionAddRecordPage() {
    const [record, setRecord] = usePromotionState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handlePromotionSubmit(record, addRecord, path, {...record}, setResponse, navigate)}>
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={"9223372036854775807"} value={record.image_id} onChange={(e) => updateRecord(setRecord, "image_id", e.target.value)} /></td></tr>
                            <tr><td>Promotion Title: </td><td><input type="text" name="promotitle" maxLength={50} value={record.promotitle} onChange={(e) => updateRecord(setRecord, "promotitle", e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={200} value={record.description} onChange={(e) => updateRecord(setRecord, "description", e.target.value)} /></td></tr>
                            <tr><td>Start Date: </td><td><input type="date" name="startdate" value={record.startdate} onChange={(e) => updateRecord(setRecord, "startdate", e.target.value)} required /></td></tr>
                            <tr><td>End Date: </td><td><input type="date" name="enddate" value={record.enddate} onChange={(e) => updateRecord(setRecord, "enddate", e.target.value)} /></td></tr>
                            <tr><td>Discount Rate (%): </td><td><input type="number" name="discountrate" min={0} max={"9223372036854775807"} value={record.discountrate} onChange={(e) => updateRecord(setRecord, "discountrate", e.target.value)} /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
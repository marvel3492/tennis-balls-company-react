import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { editRecord, usePromotionState, useResponseState, handlePromotionSubmit, hasError, updateRecord, useEffectEditRecord } from "../../Utils";
import { isPromotion } from "shared/Data";
import { useCallback, useState } from "react";

const path = "promotion";

export default function PromotionEditRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = usePromotionState();
    const [response, setResponse] = useResponseState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffectEditRecord(path, setResponse, useCallback((data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isPromotion(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setRecord({...data, image_id: data.image_id ? data.image_id.toString() : "", promotion_id: data.promotion_id.toString(), discountrate: data.discountrate.toString()});
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
                <form onSubmit={handlePromotionSubmit(record, editRecord, path, { id, ...record }, setResponse, navigate)}>
                    <input type="hidden" name="promotion_id" value={record.promotion_id} />
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
import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useResponseState, hasError, useEffectOneRecord } from "../../Utils";
import { isPromotion } from "shared/Data";

const path = "promotion";

export default function PromotionOneRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useResponseState();
    useEffectOneRecord(path, setResponse, id);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isPromotion(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Details</h1>
                <table>
                    <tbody>
                        <tr><td>Promotion ID: </td><td>{response.promotion_id}</td></tr>
                        <tr><td>Image ID: </td><td>{response.image_id}</td></tr>
                        <tr><td>Promotion Title: </td><td>{response.promotitle}</td></tr>
                        <tr><td>Description: </td><td>{response.description}</td></tr>
                        <tr><td>Start Date: </td><td>{new Date(response.startdate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                        <tr><td>End Date: </td><td>{new Date(response.enddate).toLocaleDateString('en-US', { timeZone: 'UTC' })}</td></tr>
                        <tr><td>Discount Rate: </td><td>{response.discountrate + "%"}</td></tr>
                    </tbody>
                </table>
            </>
        );
    }
}
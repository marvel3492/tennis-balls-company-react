import { useNavigate } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { addRecord, useProductState, useResponseState, handleProductSubmit, hasError, updateRecord } from "../../Utils";

const path = "product";

export default function ProductAddRecordPage() {
    const [record, setRecord] = useProductState();
    const [response, setResponse] = useResponseState();
    const navigate = useNavigate();
    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleProductSubmit(record, addRecord, path, {...record}, setResponse, navigate)}>
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={"9223372036854775807"} value={record.image_id} onChange={(e) => updateRecord(setRecord, "image_id", e.target.value)} /></td></tr>
                            <tr><td>Product Name: </td><td><input type="text" name="productname" maxLength={50} value={record.productname} onChange={(e) => updateRecord(setRecord, "productname", e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={record.description} onChange={(e) => updateRecord(setRecord, "description", e.target.value)} /></td></tr>
                            <tr><td>Price: </td><td><input type="text" name="saleprice" value={record.saleprice} onChange={(e) => updateRecord(setRecord, "saleprice", e.target.value)} required /></td></tr>
                            <tr><td>Homepage: </td><td><input type="checkbox" name="homepage" checked={record.homepage} onChange={(e) => updateRecord(setRecord, "homepage", e.target.checked)} /></td></tr>
                            <tr><td>Stock: </td><td><input type="number" name="stock" min={0} max={"9223372036854775807"} value={record.stock} onChange={(e) => updateRecord(setRecord, "stock", e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { editRecord, useProductState, useResponseState, handleProductSubmit, hasError, updateRecord, useEffectEditRecord } from "../../Utils";
import { isProduct } from "shared/Data";
import { useCallback, useState } from "react";

const path = "product";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [record, setRecord] = useProductState();
    const [response, setResponse] = useResponseState();
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffectEditRecord(path, setResponse, useCallback((data) => {
        if (hasError(data)) {
            setResponse(data);
        } else if (!isProduct(data)) {
            setResponse(new Error("Unexpected data type"));
        } else {
            setRecord({...data, image_id: data.image_id ? data.image_id.toString() : "", product_id: data.product_id.toString(), saleprice: data.saleprice.toString(), homepage: data.homepage ? true : false, stock: data.stock.toString()});
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
                <form onSubmit={handleProductSubmit(record, editRecord, path, { id, ...record }, setResponse, navigate)}>
                    <input type="hidden" name="product_id" value={record.product_id} />
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={"9223372036854775807"} value={record.image_id} onChange={(e) => updateRecord(setRecord, "image_id", e.target.value)} /></td></tr>
                            <tr><td>Product Name: </td><td><input type="text" name="productname" maxLength={50} value={record.productname} onChange={(e) => updateRecord(setRecord, "productname", e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows={10} cols={30} placeholder="Description" maxLength={500} value={record.description} onChange={(e) => updateRecord(setRecord, "description", e.target.value)} /></td></tr>
                            <tr><td>Price: </td><td><input type="text" name="saleprice" value={record.saleprice} onChange={(e) => updateRecord(setRecord, "saleprice", e.target.value)} required /></td></tr>
                            <tr><td>Homepage: </td><td><input type="checkbox" name="homepage" checked={record.homepage ? true : false} onChange={(e) => updateRecord(setRecord, "homepage", e.target.checked ? 1 : 0)} /></td></tr>
                            <tr><td>Stock: </td><td><input type="number" name="stock" min={0} max={"9223372036854775807"} value={record.stock} onChange={(e) => updateRecord(setRecord, "stock", e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
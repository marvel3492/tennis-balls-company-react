import { useParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { useResponseState, hasError, useEffectOneRecord } from "../../Utils";
import { isProduct } from "shared/Data";

const path = "product";

export default function ProductOneRecordPage() {
    const { id } = useParams();
    const [response, setResponse] = useResponseState();
    useEffectOneRecord(path, setResponse, id);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isProduct(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Details</h1>
                <table>
                    <tbody>
                        <tr><td>Product ID: </td><td>{response.product_id}</td></tr>
                        <tr><td>Image ID: </td><td>{response.image_id}</td></tr>
                        <tr><td>Product Name: </td><td>{response.productname}</td></tr>
                        <tr><td>Description: </td><td>{response.description}</td></tr>
                        <tr><td>Sale Price: </td><td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(response.saleprice)}</td></tr>
                        <tr><td>Stock: </td><td>{response.stock}</td></tr>
                        <tr><td>Homepage: </td><td>{response.homepage}</td></tr>
                    </tbody>
                </table>
            </>
        );
    }
}
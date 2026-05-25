import ErrorPage from "../ErrorPage";
import { deleteRecord, useResponseState, hasError, useEffectAllRecords } from "../../Utils";
import { isProductArray } from "shared/Data";

const path = "product";

export default function ProductAllRecordsPage() {
    const [response, setResponse] = useResponseState();
    useEffectAllRecords(path, setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isProductArray(response)) {
        return <ErrorPage error={new Error("Unknown data type")} />;
    } else if (response.length > 0) {
        return (
            <>
                <table border={1}>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Image ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Homepage</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {response.map((recref) => (
                            <tr key={recref.product_id}>
                                <td>{recref.product_id}</td>
                                <td>{recref.image_id}</td>
                                <td>{recref.productname}</td>
                                <td>{recref.description}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.stock}</td>
                                <td>{recref.homepage}</td>
                                <td>
                                    <a href={`/${path}/${recref.product_id}/show`}>Details</a>{' '}
                                    <a href={`/${path}/${recref.product_id}/edit`}>Edit</a>{' '}
                                    <a href={`/${path}`} onClick={(e) => { if (window.confirm('Are you sure you want to delete this record?')) deleteRecord(e, path, recref.product_id, setResponse); }}>Delete</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    } else {
        return (
            <>
                <p>No Records Available</p>
                <p> <a href={`/${path}/addrecord`}>Add New</a> </p>
            </>
        );
    }
}
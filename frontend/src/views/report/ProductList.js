import { useState, useEffect } from "react";
import Error from "../Error";
import { showRecords } from "../../Utils";

const path = "report/product";

export default function ProductList() {
    const [allrecs, setAllrecs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => showRecords(path, setError, setAllrecs), []);

    if (error) {
        return <Error error={error} />;
    } else if (!allrecs) {
        return <p>Loading...</p>;
    } else if (allrecs.length > 0) {
        return (
            <>
                <table border="1">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Image ID</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Homepage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allrecs.map((recref) => (
                            <tr key={recref.product_id}>
                                <td>{recref.product_id}</td>
                                <td>{recref.image_id}</td>
                                <td>{recref.productname}</td>
                                <td>{recref.description}</td>
                                <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td>
                                <td>{recref.stock}</td>
                                <td>{recref.homepage}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    } else {
        return (
            <>
                <p>No Records Available</p>
            </>
        );
    }
}
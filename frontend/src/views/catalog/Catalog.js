import { useState, useEffect } from "react";
import Error from "../Error";
import Product from "../../components/Product";

export default function Catalog() {
    const [allrecs, setAllrecs] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/catalog`).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAllrecs(data.allrecs);
            }
        });
    }, []);

    if (error) {
        return <Error error={error} />;
    } else if (!allrecs) {
        return <p>Loading...</p>;
    } else {
        return (
            <>
                <h1>Catalog</h1>
                {allrecs.length > 0 && allrecs.map((recref) => (
                    recref.stock > 0 && // Not all of the products will show, since some products are out of stock.
                    <Product recref={recref} key={recref.product_id} />
                ))}
            </>
        );
    }
}
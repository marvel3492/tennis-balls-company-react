import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Error from "./Error";
import Product from "../components/Product";

export default function Search() {
    const [allrecs, setAllrecs] = useState(null);
    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [searchParams] = useSearchParams();
    const searchcriteria = searchParams.get("searchcriteria");

    useEffect(() => {
        fetch(`http://localhost:5000/search?searchcriteria=${searchcriteria}`).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAllrecs(data.allrecs);
                setProducts(data.products);
            }
        });
    }, [searchcriteria]);

    if (error) {
        return <Error error={error} />;
    } else if (!allrecs) {
        return <p>Loading...</p>;
    } else {
        return (
            <>
                <h1>Search</h1>
                <p>{products} Product(s)</p>
                {allrecs.map((recref) => (
                    <Product recref={recref} key={recref.product_id} />
                ))}
            </>
        );
    }
}
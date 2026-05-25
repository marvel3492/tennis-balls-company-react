import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Product from "../components/Product";
import { fetchDataWithCatch, useResponseState, hasError } from "../Utils";
import ErrorPage from "./ErrorPage";
import { isSearch } from "shared/Data";

export default function Search() {
    const [response, setResponse] = useResponseState();
    const [searchParams] = useSearchParams();
    const searchcriteria = searchParams.get("searchcriteria");

    useEffect(() => fetchDataWithCatch(`http://localhost:5000/search?searchcriteria=${searchcriteria}`, (data) => setResponse(data), setResponse), [searchcriteria, setResponse]);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isSearch(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <h1>Search</h1>
                <p>{response.length} Product(s)</p>
                {response.map((recref) => (
                    <Product recref={recref} key={recref.product_id} />
                ))}
            </>
        );
    }
}
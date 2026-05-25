import ErrorPage from "../ErrorPage";
import Product from "../../components/Product";
import { useResponseState, hasError, useEffectDefault } from "../../Utils";
import { isCatalogArray } from "shared/Data";

export default function Catalog() {
    const [response, setResponse] = useResponseState();
    useEffectDefault("http://localhost:5000/catalog", setResponse);
    if (response === null) {
        return <p>Loading...</p>;
    } else if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isCatalogArray(response)) {
        return <ErrorPage error={new Error("Unexpected data type")} />;
    } else {
        return (
            <>
                <h1>Catalog</h1>
                {response.length > 0 && response.map((recref) => (
                    recref.stock > 0 && // Not all of the products will show, since some products are out of stock.
                    <Product recref={recref} key={recref.product_id} />
                ))}
            </>
        );
    }
}
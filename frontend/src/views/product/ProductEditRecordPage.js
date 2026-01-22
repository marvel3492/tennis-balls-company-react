import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";
import { isValidDecimal } from "../../Utils";

const path = "product";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [productname, setProductName] = useState("");
    const [image_id, setImageId] = useState("");
    const [description, setDescription] = useState("");
    const [saleprice, setPrice] = useState("");
    const [homepage, setHomepage] = useState(false);
    const [stock, setStock] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload

        if (!isValidDecimal(saleprice)) {
            alert("Sale price must be a finite non-negative decimal with up to two decimals");
            return;
        }

        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, productname, image_id, description, saleprice, homepage, stock})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    useEffect(() => {
        fetch(`http://localhost:5000/${path}/${id}/edit`)
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setProductName(data.onerec.productname);
                    setImageId(data.onerec.image_id);
                    setDescription(data.onerec.description);
                    setPrice(data.onerec.saleprice);
                    setHomepage(data.onerec.homepage);
                    setStock(data.onerec.stock);
                    setOnerec(data.onerec);
                }
            });
    }, [id]);
    
    if (error) {
        return <Error error={error} />;
    } else if (onerec) {
        return (
            <>
                <h1>Edit Record</h1>
                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="product_id" value={onerec.product_id} />
                    <table>
                        <tbody>
                            <tr><td>Image ID (optional): </td><td><input type="number" name="image_id" min={1} max={9223372036854775807n} value={image_id} onChange={(e) => setImageId(e.target.value)} /></td></tr>
                            <tr><td>Product Name: </td><td><input type="text" name="productname" maxLength={50} value={productname} onChange={(e) => setProductName(e.target.value)} required /></td></tr>
                            <tr><td>Description: </td><td><textarea name="description" rows="10" cols="30" placeholder="Description" maxLength={500} value={description} onChange={(e) => setDescription(e.target.value)} /></td></tr>
                            <tr><td>Price: </td><td><input type="text" name="saleprice" value={saleprice} onChange={(e) => setPrice(e.target.value)} required /></td></tr>
                            <tr><td>Homepage: </td><td><input type="checkbox" name="homepage" checked={homepage} onChange={(e) => setHomepage(e.target.checked)} /></td></tr>
                            <tr><td>Stock: </td><td><input type="number" name="stock" min={0} max={9223372036854775807n} value={stock} onChange={(e) => setStock(e.target.value)} required /></td></tr>
                        </tbody>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
}
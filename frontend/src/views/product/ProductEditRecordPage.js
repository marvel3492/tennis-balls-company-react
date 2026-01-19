import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";

const path = "product";

export default function ProductEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [productname, setProductName] = useState(null);
    const [prodimage, setImage] = useState(null);
    const [description, setDescription] = useState(null);
    const [saleprice, setPrice] = useState(null);
    const [homepage, setHomepage] = useState(null);
    const [stock, setStock] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, productname, prodimage, description, saleprice, homepage, stock})
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
                    setImage(data.onerec.prodimage);
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
                        <tr> <td> Product Name: </td> <td> <input type="text" name="productname" value={productname} onChange={(e) => setProductName(e.target.value)} required /> </td> </tr>
                        <tr> <td> Image: </td> <td> <input type="text" name="prodimage" value={prodimage} onChange={(e) => setImage(e.target.value)} required /> </td> </tr>
                        <tr> <td> Description: </td> <td> <textarea name="description" rows="10" cols="30" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} /> </td> </tr>
                        <tr> <td> Price: </td> <td> <input type="text" name="saleprice" value={saleprice} onChange={(e) => setPrice(e.target.value)} required /> </td> </tr>
                        <tr> <td> Homepage: </td> <td> <input type="checkbox" name="homepage" checked={homepage} onChange={(e) => setHomepage(e.target.checked)} /> </td> </tr>
                        <tr> <td> Stock: </td> <td> <input type="number" name="stock" value={stock} onChange={(e) => setStock(e.target.value)} required /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
}
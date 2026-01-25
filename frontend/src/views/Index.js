import { useState, useEffect } from "react";
import logo from "../../src/assets/logo.png"
import Error from "./Error";
import Product from "../components/Product";

export default function Index() {
    const [allrecs, setAllrecs] = useState(null);
    const [promos, setPromos] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/`).then(res => res.json()).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setAllrecs(data.allrecs);
                setPromos(data.promos);
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
                <h1>Home</h1>
                <table border="1" width="100%">
                    <tbody>
                        <tr>
                            <td width="80%">
                                <p>Welcome to Tennis Balls Company</p>
                                <hr />
                                {allrecs.length > 0 && allrecs.map((recref) => (
                                    <Product recref={recref} key={recref.product_id} />
                                ))}
                            </td>
                            <td width="20%">
                                {promos.length > 0 && promos.map((recref) => (
                                    <p key={recref.promotion_id}><a href={`/promotion/${recref.promotion_id}/show`}><img src={recref.filename ? `http://localhost:5000/images/${recref.filename}` : logo} alt={recref.description} width="100" height="100" /></a></p>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }
}
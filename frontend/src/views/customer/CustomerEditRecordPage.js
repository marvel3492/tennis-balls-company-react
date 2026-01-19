import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Error from "../Error";

const path = "customer";

export default function CustomerEditRecordPage() {
    const { id } = useParams();
    const [onerec, setOnerec] = useState(null);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}/save`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, firstname, lastname, email, phone, address, city, state, zip, username, password})
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
                    setFirstName(data.onerec.firstname);
                    setLastName(data.onerec.lastname);
                    setEmail(data.onerec.email);
                    setPhone(data.onerec.phone);
                    setAddress(data.onerec.address);
                    setCity(data.onerec.city);
                    setState(data.onerec.state);
                    setZip(data.onerec.zip);
                    setUsername(data.onerec.username);
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
                    <input type="hidden" name="customer_id" value={onerec.customer_id} />
                    <table>
                        <tr> <td> First Name: </td> <td> <input type="text" name="firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} required /> </td> </tr>
                        <tr> <td> Last Name: </td> <td> <input type="text" name="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} required /> </td> </tr>
                        <tr> <td> Email: </td> <td> <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required /> </td> </tr>
                        <tr> <td> Phone: </td> <td> <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required /> </td> </tr>
                        <tr> <td> Address: </td> <td> <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} required /> </td> </tr>
                        <tr> <td> City: </td> <td> <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} required /> </td> </tr>
                        <tr> <td> State: </td> <td> <input type="text" name="state" value={state} onChange={(e) => setState(e.target.value)} required /> </td> </tr>
                        <tr> <td> Zip: </td> <td> <input type="text" name="zip" value={zip} onChange={(e) => setZip(e.target.value)} required /> </td> </tr>
                        <tr> <td> Username: </td> <td> <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required /> </td> </tr>
                        <tr> <td> Password (optional): </td> <td> <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    } else {
        return <p>Loading...</p>;
    }
}
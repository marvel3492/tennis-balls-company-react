import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

const path = "customer";

export default function CustomerAddRecordPage() {
    const [firstname, setFirstName] = useState(null);
    const [lastname, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [city, setCity] = useState(null);
    const [state, setState] = useState(null);
    const [zip, setZip] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({firstname, lastname, email, phone, address, city, state, zip, username, password})
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(`/${path}`);
        }
    };

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <>
                <h1>New Record</h1>
                <form onSubmit={handleSubmit}>
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
                        <tr> <td> Password: </td> <td> <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required /> </td> </tr>
                    </table>
                    <button type="submit">Save</button>
                </form>
            </>
        );
    }
}
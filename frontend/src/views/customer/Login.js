import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../Error";

export default function Login() {
    const [message, setMessage] = useState("Please Login");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/customer/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password}),
            credentials: "include"
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else if (data.success) {
            navigate(0);
        } else {
            setMessage(data.message);
        }
    };

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <>
                <p>{message}</p>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id="username" name="username" maxLength={20} value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </p>
                        <p>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" maxLength={30} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </p>
                        <p>
                            <input type="submit" value="Submit" />
                        </p>
                    </form>
                </div>
            </>
        );
    }
}
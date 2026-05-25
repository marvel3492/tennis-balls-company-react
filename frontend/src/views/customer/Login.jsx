import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogin } from "shared/Data";
import { fetchDataWithCatch, hasError, updateRecord } from "../../Utils";
import ErrorPage from "../ErrorPage";

export default function Login() {
    const [record, setRecord] = useState({username: "", password: ""});
    const [response, setResponse] = useState(/** @type {unknown} */ ({success: false, message: "Please Login"}));
    const navigate = useNavigate();
    const handleSubmit = async (/** @type {SubmitFormEvent} */ e) => {
        e.preventDefault(); // prevent page reload
        fetchDataWithCatch("http://localhost:5000/customer/login", (data) => {
            if (hasError(data)) {
                setResponse(data);
            } else if (!isLogin(data)) {
                setResponse(new Error("Unexpected data type"));
            } else if (data.success) {
                navigate(0);
            } else {
                setResponse(data);
            }
        }, setResponse, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(record),
            credentials: "include"
        });
    };

    if (hasError(response)) {
        return <ErrorPage error={response} />;
    } else if (!isLogin(response)) {
        return <ErrorPage error={Error("Unknown data type")} />;
    } else {
        return (
            <>
                <p>{response.message}</p>
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <p>
                            <label htmlFor="username">Username: </label>
                            <input type="text" id="username" name="username" maxLength={20} value={record.username} onChange={(e) => updateRecord(setRecord, "username", e.target.value)} required />
                        </p>
                        <p>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" maxLength={30} value={record.password} onChange={(e) => updateRecord(setRecord, "password", e.target.value)} required />
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
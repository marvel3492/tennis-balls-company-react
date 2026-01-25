import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Error from "../views/Error";
import logo from "../assets/logo.png";


export default function Header() {
    const [search, setSearch] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page reload
        navigate(`/search?searchcriteria=${search}`);
    };

    const logout = async (e) => {
        e.preventDefault(); // prevent page reload
        const res = await fetch(`http://localhost:5000/customer/logout`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            credentials: "include"
        });

        const data = await res.json(); // receive response JSON
        if (data.error) {
            setError(data.error);
        } else {
            navigate(0);
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/customer/credentials", {
            credentials: "include"
        }).then(res => res.json()).then(data => {
            if (data.customer_id) {
                setUser(data);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
    }, []);

    if (error) {
        return <Error error={error} />;
    } else {
        return (
            <>
                <table bgcolor='white' width='100%'>
                    <tbody>
                        <tr>
                            <td width='20%' align='left'>
                                <a href="/"><img src={logo} width="50%" height="50%" alt="A yellow tennis ball." /></a>
                            </td>
                            <td width='60%' align='center'><h1>Tennis Balls Company</h1></td>
                            <td width='10%' align='center'>
                                {!loading && (user ?
                                    <>
                                        <b>Hello <b>{user.custname}</b></b>
                                        <br />
                                        <a href='/' onClick={logout}>Logout</a>
                                    </>
                                    :
                                    <>
                                        <a href='/customer/register'>New Customer</a>
                                        <br />
                                        <a href='/customer/login'>Login</a>
                                    </>
                                )}
                            </td>
                            <td width='10%' align='center'><a href="/catalog/cart">Cart</a></td>
                        </tr>
                    </tbody>
                </table>
                <br />
                <form onSubmit={handleSubmit}>
                    Search: <input type="text" name="searchcriteria" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <input type="submit" value="Go" />
                </form>
                <br />
                <ul>
                    <li> <a href="/">Home</a> </li>
                    <li> <a href="/catalog">Catalog</a> </li>
                    <li> <a href="/about">About Us</a> </li>
                    <li> <a href="/contact">Contact Us</a> </li>
                    
                    {user && user.isadmin && <>
                        <li> <a href="/customer">Customers</a> </li>
                        <li> <a href="/product">Products</a> </li>
                        <li> <a href="/saleorder">Sale Orders</a> </li>
                        <li> <a href="/orderdetail">Order Details</a> </li>
                        <li> <a href="/promotion">Promotions</a> </li>
                        <li> <a href="/image">Images</a> </li>
                        <li> <a href="/report">Reports</a> </li>
                    </>
                    }
                </ul>
            </>
        );
    }
}
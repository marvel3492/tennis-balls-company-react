import logo from "../assets/logo.png";

export default function Header() {
    return (
        <>
            <table bgcolor='white' width='100%'> <tr>
                <td width='20%' align='left'>
                    <a href="/"><img src={logo} width="50%" height="50%" alt="A yellow tennis ball." /></a>
                </td>
                <td width='60%' align='center'><h1>Tennis Balls Company</h1></td>
                <td width='10%' align='center'>
                    <a href='/customer/register'>New Customer</a>
                    <br />
                    <a href='/customer/login'>Login</a>
                </td>
                <td width='10%' align='center'><a href="/catalog/cart">Cart</a></td>
            </tr></table>
            <p><form action="/search" method="get">
                Search: <input type="text" name="searchcriteria" />
                <input type="submit" value="Go" />
            </form></p>
            <ul>
                <li> <a href="/">Home</a> </li>
                <li> <a href="/catalog">Catalog</a> </li>
                <li> <a href="/about">About Us</a> </li>
                <li> <a href="/contact">Contact Us</a> </li>
            </ul>
        </>
    );
}
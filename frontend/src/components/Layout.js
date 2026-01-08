import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
    return (
        <table style={{backgroundColor: "white"}} width='95%'>
            <tr><td><Header /></td></tr>
            <tr><td height='300' valign='top'><Outlet /></td></tr>
            <tr><td><Footer /></td></tr>
        </table>
    );
}
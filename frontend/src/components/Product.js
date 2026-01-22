import logo from "../../src/assets/logo.png"

export default function Product({ recref }) {
    return (
        <div className="product">
            <form action="/catalog/add" method="post" >
                <input type="hidden" name="product_id" value={recref.product_id} />
                <table>
                    <tbody>
                        <tr><td colSpan="2"><b>{recref.productname}</b></td></tr>
                        <tr><td colSpan="2"><img src={recref.filename ? `http://localhost:5000/images/${recref.filename}` : logo} alt={recref.description} width="100" height="100" /></td></tr>
                        <tr>
                            <td>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(recref.saleprice)}</td><td>Stock: {recref.stock}</td>
                            <td><a href={`/product/${recref.product_id}/show`}>Details</a></td>
                        </tr>
                        <tr>
                            <td>Quantity: <select name="qty" required width="3">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select></td>
                            <td><button type="submit">Add to Cart</button></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    );
}
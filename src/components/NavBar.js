import { useSelector } from "react-redux";
import { CartIcon } from "../icons";


function NavBar() {

    let { amount } = useSelector((state) => state.cart);

    return (
        <nav>
            <div className="nav-center">
                <h3>nooutidev cart</h3>
                <div className="nav-container">
                    <CartIcon />
                    <div className="amount-container">
                        <p className="total-amount">{amount}</p>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;

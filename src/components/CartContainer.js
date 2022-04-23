import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { openModal } from "../features/modal/modalSlice";
import { useEffect } from "react";
import { calculateTotals, getCartItems } from "../features/cart/cartSlice";

const CartContainer = () => {

    const dispatch = useDispatch();
    const { cartItems, amount, total, isLoading } = useSelector((store) => store.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, []);

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems]);


    if (isLoading) {
        return (
            <div className="loading">
                <h1>Loading...</h1>
            </div>
        );
    }

    if (amount < 1) {
        return (
            <section className="cart">
                <header>
                    <h2>Your cart</h2>
                    <h4 className="empty-cart">is currently empty </h4>
                </header>
            </section>
        );
    }

    return (
        <section className="cart">
            <header>
                <h2>Your cart</h2>
            </header>
            <div>
                {cartItems.map((item) => <CartItem key={item.id} {...item} />)}
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>Total <span>${total.toFixed(2)}</span></h4>
                </div>
                <button className="btn clear-btn" onClick={() => dispatch(openModal())}>Clear cart</button>
            </footer>
        </section>
    );
};

export default CartContainer;
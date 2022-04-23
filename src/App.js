import {useSelector } from "react-redux";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import NavBar from "./components/NavBar";

function App() {

  const { isOpen } = useSelector((store) => store.modal);

  return (
    <main>
      {isOpen ? <Modal /> : " "}
      <NavBar />
      <CartContainer />
    </main>
  );
}
export default App;

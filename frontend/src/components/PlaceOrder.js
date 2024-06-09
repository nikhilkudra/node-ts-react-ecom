import { useState } from "react";
import { useNavigate } from "react-router-dom";
const PlaceOrder = ({ setPlaceOrder, cardUi }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("");
    const [steps, setsteps] = useState(1);
    const cartData = localStorage.getItem("cartData");
    const userData = localStorage.getItem("user");
    const auth = localStorage.getItem("token");
    const navigate = useNavigate();
    const payload = {
        orders: JSON.parse(cartData),
        users: JSON.parse(userData),
        details: { name, phone, address, pincode },
    };
    const backHandler = () => {
        if (steps === 1) {
            setPlaceOrder(false);
        } else setsteps(steps - 1);
    };
    if (steps === 4) {
        navigate("/");
    }
    const continueHandle = async () => {
        if (steps === 2) {
            try {
                let result = await fetch(`http://localhost:3000/api/placeOrder`, {
                    method: "Post",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "Application/json",
                        Authorization: JSON.parse(auth),
                    },
                });
                setsteps(steps + 1);
            } catch (e) {
            }

        } else {
            setsteps(steps + 1);
        }
    };
    return (
        <div className="place_order_modal_container">
            <div className="modal_backGround"></div>
            <div className="place_order_modal">
                {steps === 1 ? (
                    <div className="card_ui">{cardUi}</div>
                ) : steps === 2 ? (
                    <div>
                        <h1>Deleviry Address</h1>
                        <input
                            type="text"
                            placeholder="Name"
                            className="inputBox"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="inputBox"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Address"
                            className="inputBox"
                            value={address}
                            onChange={(e) => {
                                setAddress(e.target.value);
                            }}
                        />
                        <input
                            type="text"
                            placeholder="Pincode"
                            className="inputBox"
                            value={pincode}
                            onChange={(e) => {
                                setPincode(e.target.value);
                            }}
                        />
                    </div>
                ) : (
                    <div className="card_ui">success</div>
                )}
                <div>{steps === 3 ? "Order Successfully placed" : ""}</div>
                <button onClick={backHandler}>{steps === 1 ? "Cancel" : "Back"}</button>
                <button onClick={continueHandle}> Continue</button>
                <button onClick={() => setPlaceOrder(false)} className="close_modal">
                    X
                </button>
            </div>
        </div>
    );
};
export default PlaceOrder;

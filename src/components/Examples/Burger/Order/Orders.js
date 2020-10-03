import React from "react";
import Order from "./Order";
import { useDispatch, useSelector} from "react-redux";
import * as actionTypes from "./../../../store/orderSlice";

const Orders = (props) => {
    const orders = useSelector((state) => state.order.orders);
    const dispatch = useDispatch();

    return (
        <>
        <br/>
        <div style={{ margin: "10px", display: "block" }}>
            {orders.map((o) => (
                <Order
                    key={o.id}
                    name={o.orderData?.name}
                    address={ o.orderData?.street}
                    time={o.time}
                    price={o.price}
                    ingredients={o.ingredients}
                    delete={() => dispatch(actionTypes.deleteOrder(o))}
                />
            ))}
        </div>
        </>
    );
};

export default Orders;

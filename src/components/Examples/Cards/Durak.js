import React from "react";
import Card from "./components/display/Card";

const Durak = (props) => {
    return (
        <>
            <div>
                <Card style={{ display: "inline", float: "left" }} rank="K" suit="SPADES"  />
                <Card style={{ display: "inline", float: "left" }} rank="5" suit="HEARTS"  />
                <Card style={{ display: "inline", float: "left" }} rank="J" suit="HEARTS"  />
                <Card style={{ display: "inline", float: "left" }} rank="Q" suit="DIAMONDS"  />
                <Card style={{ display: "inline", float: "left" }} rank="6" suit="DIAMONDS"  />
                <Card style={{ display: "inline", float: "left" }} rank="A" suit="CLUBS"  />
            </div>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/><br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
            <div>
                <Card style={{ display: "inline", float: "right" }} rank="K" suit="SPADES" upturned />
                <Card style={{ display: "inline", float: "right" }} rank="5" suit="HEARTS" upturned />
                <Card style={{ display: "inline", float: "right" }} rank="J" suit="HEARTS" upturned />
                <Card style={{ display: "inline", float: "right" }} rank="Q" suit="DIAMONDS" upturned />
                <Card style={{ display: "inline", float: "right" }} rank="6" suit="DIAMONDS" upturned />
                <Card style={{ display: "inline", float: "right" }} rank="A" suit="CLUBS" upturned />
            </div>
        </>
    );
};

export default Durak;

import React from "react";
import "../ButtonStyle/style.css";
import "./style.css";

function RequestButton(props) {
    return (
        <button className="btn btn-success" {...props}>
        Request Nutrition</button>
    );
}

export default RequestButton;
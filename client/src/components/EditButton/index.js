import React from "react";
import "../ButtonStyle/style.css";
import "./style.css";

function EditButton(props) {
    return (
        <button className="btn btn-success" {...props}>
        Edit Information</button>
    );
}

export default EditButton;
import React from "react";
import "../ButtonStyle/style.css";

function SaveButton(props) {
    return (
        <button className="btn btn-success" {...props}>
        Save Recipe</button>
    );
}

export default SaveButton;
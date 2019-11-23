import React from "react";

function DeleteButton(props) {
    return (
        <button className="btn btn-alert" {...props}>
        Delete {props.children}</button>
    );
}

export default DeleteButton;
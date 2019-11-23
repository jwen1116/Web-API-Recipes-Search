import React from "react";
import "../ButtonStyle/style.css";
import "./style.css";

function Card({
    placeholder="https://via.placeholder.com/100",
    title,
    //authors,
    ingredients,
    //expectedCalories,
    //actualCalories,
    source,
    image,
    link
    }) {
    return (
    <div className="card">
        <img className="card-img-top" src={image ? image : placeholder} alt={title} />
        <div className="card-body">
            <h5 className="card-title"><i>{title}</i></h5>
            <p className="card-text"><strong>Source: </strong>{source ? source : "Unknown"}</p>
            <a href={link} className="btn btn-primary" rel="noopener noreferrer" target="_blank"> Read more about {title}</a>
        </div>
    </div>
    );
};

export default Card;
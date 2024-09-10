import React from "react"

export default function(props){
    return(
        <header>
            <h1>Quizzical</h1>
            <button className="start-btn" onClick={props.startGame}>Start quiz</button>
        </header>
    )
}
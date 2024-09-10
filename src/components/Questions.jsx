import React from "react";

export default function(props){
    return(
        <form className="questions-container" onSubmit={e => {e.preventDefault(); if(!props.gameEnded)props.checkAnswers(); else props.startGame()}}> 
            {props.questions}
            <div className="form-footer">
                {props.gameEnded && <p>You scored {props.score}/5 correct answers</p>}
                <button className="check-btn">{props.gameEnded ? "Play again" : "Check answers"}</button>
            </div>
        </form>
    )
}
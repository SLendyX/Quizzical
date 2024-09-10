import React from "react"
import Answers from "./Answers"

export default function(props){
    return(
        <div id={`question-${props.id}}`} className="question-container">
            <h3 className="question">{props.question}</h3>

            <Answers 
                key={props.id} 
                id={props.id} 
                answers={props.answers} 
                changeAnswer={props.changeAnswer} 
                isChecked={props.isCheckedArray}
                correctAnswerIndex={props.correctAnswerIndex}
                gameEnded={props.gameEnded}
            />
        </div>
    )
}
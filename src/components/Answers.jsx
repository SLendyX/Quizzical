import React from "react";
import { nanoid } from "nanoid";
import he from "he"

export default function(props){
    const answerArray = props.answers.map((answer, index) => {
        const id = nanoid()
        const isChecked = props?.isChecked[props.id][index]
        const isCorrect = props.correctAnswerIndex === index

        const styleObject = {
            backgroundColor:"none",
            opacity: 1,
            border: isChecked ? "none" : "1px solid #4D5B9E",
            pointerEvents: "all"
        }

        if(!props.gameEnded){
            if(isChecked)
                styleObject.backgroundColor = "#D6DBF5"
        }else{
            if(isChecked){
                if(!isCorrect){
                    styleObject.backgroundColor= "#F8BCBC"
                    styleObject.pointerEvents = "none"
                }
            }else{
                styleObject.pointerEvents = "none"
            }

            if(isCorrect){
                styleObject.backgroundColor = "#94D7A2"
                styleObject.border = "none"
            }
            else
                styleObject.opacity = "0.5"
        }

        


        return(
            <label key={id}>
                <div  className="answer" 
                style={styleObject}>

                    <label 
                    htmlFor={`${props.id}-${index}`}
                    className="answer-label"
                    >
                        {he.decode(answer)}
                    </label>

                    <input 
                    className="hide-radio" 
                    onChange={() => {if(!props.gameEnded)props.changeAnswer(props.id, index)}} 
                    type="radio" 
                    name={props.id} 
                    id={`${props.id}-${index}`} 
                    checked={isChecked} 
                    required/>
                </div>
            </label>
        )})
    return (
        <div className="answer-container">
            {answerArray}
        </div>
    )
}
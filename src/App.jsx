import React, { useEffect } from "react"
import { nanoid } from "nanoid"
import he from "he"
import Intro from "./components/Intro.jsx"
import Questions from "./components/Questions.jsx"
import Question from "./components/Question.jsx"
export default function(){
    const [gameStarted, setGameStarted] = React.useState(false)
    const [questionArray, setQuestionArray] = React.useState([])
    const [questionElements, setQuestionElements] = React.useState([])
    const [answerList, setAnswerList] =  React.useState([])
    const [gameEnded, setGameEnded] = React.useState(false)
    const [score, setScore] = React.useState(0)


    function changeAnswer(id, index){
        setAnswerList(oldAnswerList => {
            const answerGroup = oldAnswerList.find(answer => Object.keys(answer)[0] === id)
            return oldAnswerList.map(answer => Object.keys(answer)[0] === id ? {[id]: answerGroup[id].map((answer, position) => position === index ? true : false)} : answer)
        })

    }

    function checkAnswers(){
        setScore(oldScore => {
            questionArray.forEach((question, index) =>{
                if(answerList[index][question.id][question.correctAnswerIndex])
                    oldScore++
            })
            return oldScore
        })

        setGameEnded(true)
    }


    function startGame(){
        setGameStarted(true)
        setGameEnded(false)
        setScore(0)
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res => res.json())
        .then(data => { 
            let newAnswerList = []

            const newQuestionArray = data.results.map(result => {
                const id = nanoid()
                const answerArray = result.incorrect_answers
                
                answerArray.splice(Math.floor(Math.random()*answerArray.length), 0, 
                    result.correct_answer)

                let answerObject = {[id]: []}
                answerArray.forEach(() => {
                    answerObject[id].push(false)
                });

                newAnswerList.push(answerObject)

                return ({
                    id: id,
                    answers: answerArray,
                    correctAnswerIndex: answerArray.indexOf(result.correct_answer),
                    question: he.decode(result.question)
                })

            })
            
            setAnswerList(newAnswerList)
            setQuestionArray(newQuestionArray)
            
        })       
    }

    React.useEffect(() => { 
        setQuestionElements(questionArray.map((question, index) => 
            <Question 
                key={question.id} 
                id={question.id}
                question={question.question}
                answers={question.answers}
                changeAnswer={changeAnswer}
                correctAnswerIndex={question.correctAnswerIndex}
                isCheckedArray={answerList[index]}
                gameEnded = {gameEnded}
            />)
        )
    }, [questionArray, answerList, gameEnded])
    
    console.log(score)

    return(
        <main style={{alignItems: gameStarted ? "start" : "center"}}>
            {!gameStarted && <Intro startGame={startGame}/>}
            {gameStarted && 
            <Questions 
            questions={questionElements} 
            score={score}
            checkAnswers={checkAnswers} 
            startGame={startGame} 
            gameEnded={gameEnded}/>}
        </main>
    )
}
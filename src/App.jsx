import React from "react"
import Intro from "./Intro.jsx"
import Questions from "./Questions.jsx"
export default function(){
    const [gameStarted, setGameStarted] = React.useState(false)


    function startGame(){
        setGameStarted(true)
    }


    return(
        <main>
            {!gameStarted && <Intro startGame={startGame}/>}
            {gameStarted && <Questions />}
        </main>
    )
}
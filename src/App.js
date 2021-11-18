import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import SingleCrad from './components/SingleCrad';

const cardImages = [
  {"src": "/img/helmet-1.png",  matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png",    matched: false},
  {"src": "/img/scroll-1.png",  matched: false},
  {"src": "/img/shield-1.png",  matched: false},
  {"src": "/img/sword-1.png",   matched: false}
]
function App() {
  const [cards,setCards] = useState([])
  const [turns,setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
 
  const shufleCards = () =>{
    const shufledCards = [...cardImages, ...cardImages]
    .sort( () => Math.random() -  0.5)
    .map ( (card) => ({...card, id: Math.random()}))
    
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shufledCards)
    setTurns(0)
  }
  
  //handle a Choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card): setChoiceOne (card)
    
  }
  useEffect (() =>{
    
    if (choiceOne && choiceTwo){
      setDisabled(true)
      if( choiceOne.src === choiceTwo.src ){
        setCards( prevCards =>{
          return  prevCards.map( card => {
            if (card.src === choiceTwo.src){
              return{...card, matched: true}
            }else{
              return card
            }
          })
        })
          resetTrun()
      }else{
        setTimeout(() => resetTrun(),1000)
      }
    }},[ choiceOne,choiceTwo ])

    console.log(cards)

  //reset choices and increase turn
  const resetTrun = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurns(prevTurns => prevTurns +1)
  }
  // start a new game automatically
  useEffect( () =>{
     shufleCards()
  }, [])
 
  return (
    <div className="App">
    <h1> Match Master</h1>
    <p> Match two shapes by clicking any of the two cards provided;</p>
      <button onClick = {shufleCards}> New Game</button>

      <div className = "card-grid">
        {cards.map(card =>( 
          <SingleCrad 
          key = {card.id} 
          card = {card}
          handleChoice ={handleChoice}
          flipped = { card === choiceOne || card === choiceTwo || card.matched} 
          disabled = {disabled}/>
          
        ))}
        </div>
        <p> Turns:{turns}</p>

    </div>
  );
}

export default App;

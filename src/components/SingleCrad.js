
import'./SingleCard.css'

export default function SingleCrad({card, handleChoice, disabled, flipped}) {
  const handleClick = () =>{
    if(!disabled){
      handleChoice(card)
    }
    
  }

    return (
        <div className = "card">
        <div className = {flipped ? "flipped" :""}>
          <img className = "front" src = {card.src} alt ="card-front"/>
          <img className = "back" 
          src = "img/cover.png" 
          alt ="card-back"
          onClick = {handleClick}/>
        </div>
      </div>
        
    )
}


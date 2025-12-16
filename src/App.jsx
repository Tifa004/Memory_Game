import { useState,useEffect } from 'react'
import './App.css'

async function getCharacters() {
  const response= await fetch('https://api.disneyapi.dev/character?tvShows=Hercules',{mode:'cors'})
  const characters= await response.json();
  return characters.data.map(character => ({
    ...character,
    clicked: false,
  }));
}

export default function App() {
  const [characters,setCharacters]=useState([]);
  const [score,setScore]=useState(0);
  const [best,setBest]=useState(0);
  const [reset,setReset]=useState(0);
  const handleClick=(id)=>{
    if(characters[characters.findIndex(c=>c._id===id)].clicked===true){
      if(best<score){
        setBest(score);
      } 
      setReset(prev=>prev+1)
      setScore(0);
    } 
    else{
      setCharacters(prevCharacters => {
      return prevCharacters.map(character =>
        character._id === id
          ? { ...character, clicked: true }
          : character
      );
    });

    setScore(prev=>prev+1);
    setCharacters(prev=>[...prev].sort(()=>Math.random()-0.5))

    }
  }
  useEffect(() => {
    getCharacters().then(data => {
      setCharacters(data.sort(() => Math.random() - 0.5).slice(0,15))
  });
  }, [reset]);
  return (
    <div className="app-container">
      <div className="top">
        <div className="title">Memorize</div>
        <div className='board'>
          Score: {score} <br></br>
          HighScore: {best}
        </div>
      </div>
      <div className="warning">Get points by clicking on an image but don't click on any more than once!</div>
      <div className='characters'>
        {characters.map(character => (
          <div className='character' key={character._id} onClick={()=>handleClick(character._id)}>
            <div className='pic'><img src={character.imageUrl} alt={character.name}/></div>
            <div className='name'>{character.name}</div>
          </div>
        ))}
      </div> 

      </div>
  )
}


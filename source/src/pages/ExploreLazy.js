import React, { useState, useMemo, useEffect, createRef } from "react";
import TinderCard from "react-tinder-card";
import { Button } from '@mui/material';

const list = [
    {
        'name': 'Name One'
    },
    {
        'name': 'Name Two'
    },
    {
        'name': 'Name Three'
    },
    {
        'name': 'Name Four'
    },
    {
        'name': 'Name Five'
    }
];

function ExploreLazy() {
  const [db, setDb] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [startCharacter, setStartCharacter] = useState(0);
  const [lastDirection, setLastDirection] = useState();

  useEffect(() => {
    setDb(list);
    setCharacters(list.slice(startCharacter, startCharacter + 1));
  }, []);

  const childRefs = useMemo(
    () =>
      Array(1).fill(0).map(i => createRef()),
    []
  );

  const swiped = (direction, index) => {
    setLastDirection(direction);
  };

  const handleSwitchFriend = async (direction) => {
    await childRefs[0].current.swipe(direction);
  };

  const outOfFrame = () => {
    setStartCharacter(startCharacter + 1);
    setCharacters(db.slice(startCharacter + 1, startCharacter + 2));
  };

  return (
    <div className="container">
      <div style={{ 
        textAlign: "center",
        maxWidth: "300px",
        margin: "0 auto"
       }}>
        <div className="cardContainer">
            {characters.map((character, index) => {
                return (
                <TinderCard
                    ref={childRefs[index]}
                    className="swipe"
                    key={character.name}
                    onSwipe={dir => swiped(dir, index)}
                    onCardLeftScreen={() => outOfFrame()}
                >
                    <div className="card" style={{ 
                        width: "18rem",
                        padding: "30px",
                        background: "#ccc"
                     }}>
                        <div className="card-body">
                            <h5 className="card-title">{character.name}</h5>
                        </div>
                    </div>
                </TinderCard>
                );
            })}
            </div>
      </div>
      <p>
        <Button onClick={() => handleSwitchFriend('left')}>Dislike</Button>
        <Button onClick={() => handleSwitchFriend('right')}>Like</Button>
      </p>
    </div>
  );
}

export default ExploreLazy;
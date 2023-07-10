import { Button, Grid, Stack, BottomNavigation, BottomNavigationAction } from '@mui/material';
//import { RestoreIcon, FavoriteIcon, LocationOnIcon } from '@mui/icons-material';
import TinderCard from "react-tinder-card";//https://www.npmjs.com/package/react-tinder-card (Bắt buộc cài đặt đúng phiên bản)
import config from '../configs/config';
import { createRef, useMemo, useRef, useState } from 'react';

function Explore() {
    //Navigation bottom
    const [active, setActive] = useState(0);

    //Tinder card
    const itemCount = 3;

    const [currentIndex, setCurrentIndex] = useState(itemCount - 1);
    const [lastDirection, setLastDirection] = useState();

    const currentIndexRef = useRef(currentIndex);

    const childRefs = useMemo(
        () => Array(itemCount).fill(0).map((index) => createRef()),
        []
    );
    
    const updateCurrentIndex = (value) => {
        setCurrentIndex(value);
        
        currentIndexRef.current = value;
    };

    const handleSwipeFriend = (direction, index) => {
        setLastDirection(direction);
        updateCurrentIndex(index - 1);
    };

    const handleSwitchFriend = async (dir) => {
        if (currentIndex >= 0 && currentIndex < itemCount) {
            await childRefs[currentIndex].current.swipe(dir);
        }
    };
    
    //Return
    return (
        <div className="explore">
            <div className="appbar">
                <div className="brand">Explore</div>
                <div className="meta">Meta</div>
                <div className="setting">Setting</div>
            </div>
            <div className="body">
                <div className="friend">
                    <TinderCard className="friend-item"
                                key={1}
                                ref={childRefs[0]}
                                onSwipe={(dir) => handleSwipeFriend(dir, 0)}>
                        <div className="photo">Photo 0</div>
                        <div className="content">
                            <h3>Tinder Card 0</h3>
                        </div>
                    </TinderCard>
                    <TinderCard className="friend-item"
                                key={2}
                                ref={childRefs[1]}
                                onSwipe={(dir) => handleSwipeFriend(dir, 1)}>
                        <div className="photo">Photo 1</div>
                        <div className="content">
                            <h3>Tinder Card 1</h3>
                        </div>
                    </TinderCard>
                    <TinderCard className="friend-item"
                                key={3}
                                ref={childRefs[2]}
                                onSwipe={(dir) => handleSwipeFriend(dir, 2)}>
                        <div className="photo">Photo 2</div>
                        <div className="content">
                            <h3>Tinder Card 2</h3>
                        </div>
                    </TinderCard>
                </div>
                <div className="corner top left">
                    <div className="corner-inner"></div>
                </div>
                <div className="corner top right"></div>
            </div>
            <div className="action"
                 style={{
                     display: 'flex',
                     justifyContent: 'space-between'
                 }}>
                <Button>Undo</Button>
                <Button onClick={() => handleSwitchFriend('left')}>Dislike</Button>
                <Button onClick={() => handleSwitchFriend('right')}>Like</Button>
                <Button>Chat</Button>
            </div>
            <div className="navigation">
                <BottomNavigation showLabels
                                    value={active}
                                    onChange={(event, newActive) => {
                                        setActive(newActive);
                                    }}>
                    <BottomNavigationAction className="recents" label="Recents" />
                    <BottomNavigationAction className="ravorites" label="Favorites" />
                    <BottomNavigationAction className="nearby" label="Nearby" />
                </BottomNavigation>
            </div>
        </div>
    );
}

export default Explore;
import { Button, Grid, Stack, BottomNavigation, BottomNavigationAction } from '@mui/material';
//import { RestoreIcon, FavoriteIcon, LocationOnIcon } from '@mui/icons-material';
import TinderCard from "react-tinder-card";//https://www.npmjs.com/package/react-tinder-card (Bắt buộc cài đặt đúng phiên bản)
import { Fancybox } from "@fancyapps/ui";//https://fancyapps.com/fancybox
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import config from '../configs/config';
import { createRef, useMemo, useRef, useState } from 'react';

function Explore() {
    //Fancybox
    const img1 = 'https://images.unsplash.com/photo-1564086539698-2c4d0e640d7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1800&h=1200&dpi=2&fit=crop&crop=entropy';
    const img1Thumb = 'https://lipsum.app/id/31/300x200';
    const img2 = 'https://images.unsplash.com/photo-1563985336376-568060942b80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1800&h=1200&dpi=2&fit=crop&crop=entropy';
    const img2Thumb = 'https://lipsum.app/id/35/300x200';

    Fancybox.bind('[data-fancybox]', {});

    //Get latitude, longitude
    if (navigator.geolocation) {
        /*
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
        });
        */
    }
    //Get browser info
    console.log(navigator.userAgent);

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
                        <div className="photo">
                            <a href={img1} data-fancybox>
                                <img src={img1Thumb} />
                            </a>
                        </div>
                        <div className="content">
                            <h3>Tinder Card 1</h3>
                        </div>
                    </TinderCard>
                    <TinderCard className="friend-item"
                                key={3}
                                ref={childRefs[2]}
                                onSwipe={(dir) => handleSwipeFriend(dir, 2)}>
                        <div className="photo">
                            <a href={img2} data-fancybox>
                                <img src={img2Thumb} />
                            </a>
                        </div>
                        <div className="content">
                            <h3>Tinder Card 2</h3>
                        </div>
                    </TinderCard>
                </div>
                <div className="corner top-left" />
                <div className="corner top-right" />
                <div className="corner bottom-left" />
                <div className="corner bottom-right" />
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
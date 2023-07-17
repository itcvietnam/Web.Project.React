import { Button, Chip, Divider, Grid, List, ListItem, ListItemText, Stack, BottomNavigation, BottomNavigationAction } from '@mui/material';
//import { RestoreIcon, FavoriteIcon, LocationOnIcon } from '@mui/icons-material';
import TinderCard from "react-tinder-card";//https://www.npmjs.com/package/react-tinder-card (Bắt buộc cài đặt đúng phiên bản)

import { Fancybox } from "@fancyapps/ui";//https://fancyapps.com/fancybox
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import config from '../configs/config';
import { createRef, useEffect, useMemo, useRef, useState } from 'react';

//Carousel: https://www.npmjs.com/package/react-responsive-carousel

const tinderList = [
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

//https://stackblitz.com/edit/reactjs-tinder-card?file=src%2FPerson.js

function Explore() {
    //Fancybox
    const img1 = 'https://images.unsplash.com/photo-1564086539698-2c4d0e640d7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1800&h=1200&dpi=2&fit=crop&crop=entropy';
    const img1Thumb = 'https://lipsum.app/id/31/300x200';
    const img2 = 'https://images.unsplash.com/photo-1563985336376-568060942b80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1800&h=1200&dpi=2&fit=crop&crop=entropy';
    const img2Thumb = 'https://lipsum.app/id/35/300x200';

    //Fancybox
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
    //console.log(navigator.userAgent);

    //Navigation bottom
    //activeNavigation
    const [active, setActive] = useState(0);

    //Tinder card
    //currentTinderIndex
    //lastTinderDirection
    const [currentIndex, setCurrentIndex] = useState(0);
    const [lastDirection, setLastDirection] = useState();

    //Tinder items states
    const [tinderItemCount, setTinterItemCount] = useState(1);
    const [tinderItems, setTinderItems] = useState([]);

    const [lazyTinderItems, setLazyTinderItems] = useState([]);

    //currentTinderIndexRef
    const currentIndexRef = useRef(currentIndex);

    //childTinderRefs
    const childRefs = useMemo(
        () => Array(tinderItemCount).fill(0).map((index) => createRef()),
        []
    );
    
    //Use effect
    useEffect(() => {
        const tmpLazyTinderItems = tinderList.slice(0, 1);
        const tmpLazyTinderItemCount = tmpLazyTinderItems.length;

        //setTinterItemCount(tmpLazyTinderItemCount);
        //setCurrentIndex(tmpLazyTinderItemCount - 1);
        setLazyTinderItems(tmpLazyTinderItems);

        setTinderItems(tinderList);
    }, []);
    
    //updateCurrentTinderIndex
    const updateCurrentIndex = (value) => {
        setCurrentIndex(value);
        
        currentIndexRef.current = value;
    };
    
    //handleSwipeTinder
    const handleSwipeFriend = (direction, index) => {
        setLastDirection(direction);
        //updateCurrentIndex(index - 1);
    };

    //handleSwitchTinder
    const handleSwitchFriend = async (direction) => {
        if (currentIndex >= 0 && currentIndex < tinderItemCount) {
            await childRefs[currentIndex].current.swipe(direction);
        }
    };

    const handleOutOfFrame = () => {
        //Lazy tinder
        const tmpLazyTinderItems = tinderItems.slice(1, 2);
        const tmpLazyTinderItemCount = tmpLazyTinderItems.length;
        
        //setTinterItemCount(tmpLazyTinderItemCount);
        //setCurrentIndex(tmpLazyTinderItemCount - 1);
        setLazyTinderItems(tmpLazyTinderItems);
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
                    {lazyTinderItems.map((tinder, index) => {
                        return (
                            <TinderCard className="friend-item"
                                        key={index}
                                        ref={childRefs[index]}
                                        onCardLeftScreen={() => handleOutOfFrame()}
                                        onSwipe={(dir) => handleSwipeFriend(dir, index)}>
                                <div className="intro">
                                    <h3 className="name verified">{tinder.name}</h3>
                                    <div className="photo">
                                        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
                                            <div>
                                                <img src={img1Thumb} />
                                            </div>
                                            <div>
                                                <img src={img2Thumb} />
                                            </div>
                                        </Carousel>
                                        <Button href={img1} data-fancybox="0">FULLSCREEN</Button>
                                    </div>
                                </div>
                                <div className="content">
                                    <h4>Tôi ở đây vì</h4>
                                    <div className="reason">Muốn đi chơi</div>
                                    <h4>Về tôi</h4>
                                    <div className="about">...</div>
                                    <h4>Thông tin</h4>
                                    <div className="info">
                                        <Chip className="chip bmi" label="168cm - 56kg" variant="outlined" />
                                        <Chip className="chip bwh" label="90-80-60" variant="outlined" />
                                    </div>
                                    <div className="photo-list">
                                        <div className="photo">
                                            <a href="https://www.albertjuhe.com/images/01.jpg" data-fancybox="0">
                                                <LazyLoadImage src="https://www.albertjuhe.com/images/01.jpg" style={{
                                                    maxWidth: '100%'
                                                }} effect="blur" />
                                            </a>
                                        </div>
                                        <div className="photo">
                                            <a href="https://www.albertjuhe.com/images/02.jpg" data-fancybox="0">
                                                <LazyLoadImage src="https://www.albertjuhe.com/images/02.jpg" style={{
                                                    maxWidth: '100%'
                                                }} effect="blur" />
                                            </a>
                                        </div>
                                        <div className="photo">
                                            <a href="https://www.albertjuhe.com/images/04.jpg" data-fancybox="0">
                                                <LazyLoadImage src="https://www.albertjuhe.com/images/04.jpg" style={{
                                                    maxWidth: '100%'
                                                }} effect="blur"/>
                                            </a>
                                        </div>
                                        <div className="photo">
                                            <a href="https://www.albertjuhe.com/images/05.jpg" data-fancybox="0">
                                                <LazyLoadImage src="https://www.albertjuhe.com/images/05.jpg" style={{
                                                    maxWidth: '100%'
                                                }} effect="blur" />
                                            </a>
                                        </div>
                                        <div className="photo thumbnail">...1</div>
                                        <div className="photo thumbnail">...2</div>
                                        <div className="photo thumbnail">
                                            ...3
                                            <div className="more">+5</div>
                                        </div>
                                    </div>
                                    <h4>Sở thích</h4>
                                    <div className="passion">
                                        <Chip className="chip color-1" label="Art" />
                                    </div>
                                    <h4>Vị trí</h4>
                                    <div className="address">...</div>
                                    <h4>Xác thực</h4>
                                    <div className="verify">
                                        <span className="verified">....</span>
                                    </div>
                                    <List className="task" component="nav">
                                        <ListItem className="report">
                                            <ListItemText primary="Report ..." />
                                        </ListItem>
                                        <Divider />
                                        <ListItem className="block">
                                            <ListItemText primary="Block ..." />
                                        </ListItem>
                                    </List>
                                </div>
                            </TinderCard>
                        );
                    })}
                </div>
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
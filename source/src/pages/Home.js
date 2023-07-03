import React, { useEffect, useState } from 'react';
import { Button, Grid, Autocomplete, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import configs from '../configs/config';
import setting from '../configs/setting';
import axios from 'axios';

function Home() {
    const options = [
        { label: 'Option 1', id: 1 },
        { label: 'Option 2', id: 2 },
    ];

    const [detail, setDetail] = useState({
        uid: 123,
        accessToken: 'accessToken',
        name: 'No Name'
    });

    const signinHandle = () => {
        const firebaseConfig = {
            apiKey: configs.apiKey,
            authDomain: 'elemental-leaf-303801.firebaseapp.com',
            databaseURL: 'https://elemental-leaf-303801-default-rtdb.asia-southeast1.firebasedatabase.app',
            projectId: 'elemental-leaf-303801',
            storageBucket: 'elemental-leaf-303801.appspot.com',
            messagingSenderId: '1063714170045',
            measurementId: 'G-EG7DPSTYEV',
            appId: '1:1063714170045:web:50bfb4884288fa96c483d4'
        };

        const phoneNumber = '+84902824547';//+84902824547
        const code = '123456';

        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        const auth = getAuth(app);

        sessionStorage.setItem('sessionStorageKey', 'session storage value');
        
        auth.settings.appVerificationDisabledForTesting = true;
        
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            size: 'normal',//invisible
            callback: function(response) {
                const appVerifier = window.recaptchaVerifier;
                
                signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
                    window.confirmationResult = confirmationResult;
                    
                    window.confirmationResult.confirm(code).then((result) => {
                        const user = result.user;
                        const accessToken = user.accessToken;
                        const at = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImY5N2U3ZWVlY2YwMWM4MDhiZjRhYjkzOTczNDBiZmIyOTgyZTg0NzUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vb2xhY2hhdC1mZDg4OSIsImF1ZCI6Im9sYWNoYXQtZmQ4ODkiLCJhdXRoX3RpbWUiOjE2ODgzNTE4OTMsInVzZXJfaWQiOiJuMGlySkFmdGZ5WHlFTWpFM2R0bmdSWWJDVmUyIiwic3ViIjoibjBpckpBZnRmeVh5RU1qRTNkdG5nUlliQ1ZlMiIsImlhdCI6MTY4ODM1MTg5NSwiZXhwIjoxNjg4MzU1NDk1LCJwaG9uZV9udW1iZXIiOiIrODQ5MDI4MjQ1NDciLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7InBob25lIjpbIis4NDkwMjgyNDU0NyJdfSwic2lnbl9pbl9wcm92aWRlciI6InBob25lIn19.hUGHdoC5xbyRTU1-4MvMpQyeFjxZhRrdAyHgruxbrBWASPKUkJyZF4YfqqJamr5p3kXEsRwXsyJsmc9hl3jnAy-kUXq6tqigB2jQO5rr-ePwPqv5wEDXpVFlMCUTDyMKiI6xYlCBmCH35BUKyEi9aPtXf2nEtZqg8xb9q-ICbwrS_c-6kYLIcEIcx5OMtHPXPs1PcJtjN40F46YCClzqSk6P892SQOgAzXCtvbPYMQUnBn124hNKhhKx2kw6VBmWwIfJqBy0psORLXOCdEkvf5WHVD7djKJkKxj5U2-l9jU-VKjNAPzKphKVMfbULvSYZ7J3AUCoY9GHKZLWi5faBQ';
                        axios.post(
                            'https://dev.olachat.me/api/user/signin?firebase_id_token=' + accessToken + '&device_name=Firefox&device_uid=Firefox',
                            {}
                        ).then(response => {
                            setDetail({
                                uid: 789,
                                accessToken: response.data.access_token,
                                name: response.data.user.name
                            });

                            console.log(response);
                        });
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;

                        console.log(errorCode, errorMessage);
                    });
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode, errorMessage);
                });
            }
        }, auth);
        
        window.recaptchaVerifier.render().then(function(widgetId) {
            //window.grecaptcha.reset(widgetId);
        });
    };
    
    return (
        <div>
            <h1>Home</h1>
            <hr />
            <h2>{detail.uid}: {detail.name}</h2>
            <h4>{setting.key1} + {setting.key3.key31}</h4>
            <div id="recaptcha-container"></div>
            <Button id="signin-button" variant="contained" onClick={signinHandle}>Sigin</Button>
            <hr />
            <Grid container spacing={0}>
                <Grid xs={3} item={true}>
                    <Button variant="contained">Button</Button>
                </Grid>
                <Grid xs={3} item={true}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Options" />} />
                </Grid>
                <Grid xs={3} item={true}>
                    <Link to="/user">User</Link>
                </Grid>
            </Grid>
        </div>
    );
}

export default Home;
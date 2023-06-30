import React from "react";

function Content() {
    
    console.log(sessionStorage.getItem('sessionStorageKey'));

    return (
        <div>
            <h1>Content</h1>
            <hr />
            <h2>...</h2>
        </div>
    );
}

export default Content;
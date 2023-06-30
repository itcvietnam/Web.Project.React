import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from '@mui/material';

function Layout() {
    return (
        <Container>
            <h1>Header</h1>
            <hr />
            <main>
                <Outlet />
            </main>
            <hr />
            <h1>Footer</h1>
        </Container>
    );
}

export default Layout;
import React from 'react';
import { Container } from 'react-bootstrap';
import MainNav from './MainNav';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Layout(props) {
    return (
        <>
            <MainNav />
            <br />
            <Container>
                {props.children}
                <SpeedInsights />
            </Container>
            <br />
        </>
    );
}
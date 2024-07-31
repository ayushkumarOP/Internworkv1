import React from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import Stack from '@mui/material/Stack';

const linkStyle = {
    color: 'inherit'
};

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Home = () => {
    return (
        <Container>
            <Box>
                <Stack spacing={2} alignItems="center">
                    <Button variant="contained" size="medium">
                        <Link to="/Login" style={linkStyle}>Log in</Link>
                    </Button>
                    <Button variant="contained" size="medium">
                        <Link to="/admin" style={linkStyle}>Admin Site</Link>
                    </Button>
                    <Button variant="contained" size="medium">
                        <Link to="/user/category" style={linkStyle}>Product Search</Link>
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}

export default Home;

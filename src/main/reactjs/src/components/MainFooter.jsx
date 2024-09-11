import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';

function Footer() {
    return (
        <Box
            sx={{
                width: '100%',
                backgroundColor: '#E9F5FF',
                color: '#1F4976',
                padding: '20px 0',
                marginTop: 'auto',
            }}
        >
            <Container maxWidth="lg">
                <Grid container className={"space-x-44"}>
                    <Grid item >
                        <Typography variant="h6" gutterBottom>
                            <img src="/logooo.png" alt="quizverse" style={{height: "72px"}}/>
                        </Typography>
                    </Grid>
                    <Grid item  className={"flex space-x-8"}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <div className={"space-y-4"}>
                            <Link href="#" color="inherit" variant="body2">
                                Home
                            </Link>
                            <br/>
                            <Link href="#" color="inherit" variant="body2">
                                About
                            </Link>
                            <br/>
                            <Link href="#" color="inherit" variant="body2">
                                Contact Us
                            </Link>
                        </div>
                    </Grid>
                    <Grid item className={"flex space-x-8"}>
                        <Typography variant="h6" gutterBottom>
                            SNS
                        </Typography>
                        <div className={"space-y-4"}>
                            <Link href="#" color="inherit" variant="body2">
                                Facebook
                            </Link>
                            <br/>
                            <Link href="#" color="inherit" variant="body2">
                                Twitter
                            </Link>
                            <br/>
                            <Link href="#" color="inherit" variant="body2">
                                Instagram
                            </Link>
                        </div>
                    </Grid>
                </Grid>
                <Box
                    textAlign="center"
                    sx={{ borderTop: '1px solid #1F4976', marginTop: '20px', paddingTop: '10px' }}
                >
                    <Typography variant="body2">
                        © {new Date().getFullYear()} QuizVerse. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;

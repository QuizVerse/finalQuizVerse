import React from 'react';
import { Box, Container, Typography, Grid, Link } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import BookIcon from '@mui/icons-material/Book';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { GithubIcon } from "lucide-react";

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
                <Grid container spacing={4}>
                    {/* 로고 섹션 */}
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h6" gutterBottom>
                            <img src="/logooo.png" alt="Quizverse" style={{ height: "72px", marginBottom: "16px" }} />
                        </Typography>
                    </Grid>

                    {/* 회사 정보 섹션 */}
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' }, lineHeight: 1.6 }}>
                        <Typography variant="h6" gutterBottom>
                            About Us
                        </Typography>
                        <Typography variant="body2">
                            상호 : QUIZVERSE | 팀명 : First Class
                        </Typography>
                        <Typography variant="body2"> 팀원 :
                            <a href="https://github.com/hyuck9409" className="pr-2">정상혁 |</a>
                            <a href="https://github.com/taehyoung809" className="pr-2">우태형 |</a>
                            <a href="https://github.com/kimdohun1108" className="pr-2">김도훈 |</a>
                            <a href="https://github.com/ynnotun" className="pr-2">시바타유니 |</a>
                            <a href="https://github.com/hayooniiiiii" className="pr-2">강하윤 |</a>
                            <a href="https://github.com/alswl11">박민지</a>
                        </Typography>
                        <Typography variant="body2">
                            주소 : 서울특별시 강남구 강남대로94길 20, 7층(역삼동)
                        </Typography>
                    </Grid>

                    {/* 링크 섹션 */}
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h6" gutterBottom>
                            Quick Links
                        </Typography>
                        <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
                            <Link href="https://www.youtube.com/@ncamp_Bitcamp_Gangnam" color="inherit" underline="hover">
                                <YouTubeIcon sx={{ fontSize: 32 }} />
                            </Link>
                            <Link href="https://github.com/QuizVerse/finalQuizVerse.git" color="inherit" underline="hover">
                                <GithubIcon sx={{ fontSize: 32 }} />
                            </Link>
                            <Link href="https://www.quizverse.kro.kr/" color="inherit" underline="hover">
                                <NewspaperIcon sx={{ fontSize: 32 }} />
                            </Link>
                        </div>
                    </Grid>
                </Grid>

                {/* 저작권 정보 */}
                <Box
                    textAlign="center"
                    sx={{ borderTop: '1px solid #1F4976', marginTop: '40px', paddingTop: '20px' }}
                >
                    <Typography variant="body2">
                        Copyright © {new Date().getFullYear()} Quizverse. All rights reserved.
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;

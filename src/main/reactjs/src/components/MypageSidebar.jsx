import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import image1 from "../image/Quizverse.png";

export default function MypageSidebar() {
    const [openHistory, setOpenHistory] = useState(false);
    const [openUserInfo, setOpenUserInfo] = useState(false);

    const handleHistoryClick = () => {
        setOpenHistory(!openHistory);
    };

    const handleUserInfoClick = () => {
        setOpenUserInfo(!openUserInfo);
    };

    return (
        <aside className="w-64 p-4 border-r">
            <Link to={"/"} className={"flex items-center mb-6"}>
                <img src={image1} style={{width: "50px", borderRadius: "100%", marginRight: "10px"}}
                     alt="QuizVerse Logo"/>
                <span className="text-xl font-bold">QuizVerse</span>
            </Link>
            <nav className="space-y-4">
                <Link to={"summary"} style={{textDecoration: 'none', color: 'inherit'}}>
                    <ListItemText primary={"마이페이지"} primaryTypographyProps={{ fontSize: '19px', fontWeight: 600 }} />
            </Link>

            <h3 className="text-lg font-semibold"><ListItemButton onClick={handleHistoryClick}>
                <ListItemText primary="나의 이력" primaryTypographyProps={{ fontSize: '19px', fontWeight: 600  }} />
                {openHistory ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton></h3>
            <Collapse in={openHistory} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={"publishedbook"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="나의 출제이력" primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>
                    </Link>
                    <Link to={"solvedbook"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="나의 학습이력" primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>

            <div>
                <h3 className="text-lg font-semibold">
                    <Link to={"myclass"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 2 }}>
                                나의 클래스
                            </ListItemButton>
                    </Link>
                </h3>
            </div>
            <div>
                <h3 className="text-lg font-semibold">
                    <Link to={"bookmark"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 2 }}>
                                즐겨찾기
                            </ListItemButton>
                    </Link>
                </h3>
            </div>
            <div>
                <h3 className="text-lg font-semibold">
                    <Link to={"wrong"} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemButton sx={{ pl: 2 }}>
                                오답노트
                            </ListItemButton>
                    </Link>
                </h3>
            </div>

            <ListItemButton onClick={handleUserInfoClick}>
                <ListItemText primary="회원정보" primaryTypographyProps={{ fontSize: '19px', fontWeight: 600 }} />
                {openUserInfo ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openUserInfo} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <Link to={"updateuser"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="회원정보 수정" primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>
                    </Link>
                    <Link to={"leave"} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="회원 탈퇴" primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>
                    </Link>
                </List>
            </Collapse>
        </nav>
    </aside>
    );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import '../components/Mycss.css';

function SideBar() {
  const [openHistory, setOpenHistory] = useState(false);
  const [openUserInfo, setOpenUserInfo] = useState(false);

  const handleHistoryClick = () => {
    setOpenHistory(!openHistory);
  };

  const handleUserInfoClick = () => {
    setOpenUserInfo(!openUserInfo);
  };

  const menus = [
    { name: "나의 클래스", path: "/myclass" },
    { name: "즐겨찾기", path: "/bookmark" },
    { name: "오답노트", path: "/wrong" }
  ];

  return (
    <div className="sidebar">
       <div>퀴즈버스로고</div>
            <div>
                <input type='text' placeholder='placeholder'/>
            </div>
      <Link to="/mypage" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemText primary="마이페이지" primaryTypographyProps={{ fontSize: '14px' }} />
      </Link>
      <ListItemButton onClick={handleHistoryClick}>
        <ListItemText primary="나의 이력" primaryTypographyProps={{ fontSize: '14px' }} /> {/* 글씨 크기 조정 */}
        {openHistory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openHistory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/myexam" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="나의 출제이력" primaryTypographyProps={{ fontSize: '10px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
          <Link to="/mylearn" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="나의 학습이력" primaryTypographyProps={{ fontSize: '10px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      {menus.map((menu, index) => (
        <Link to={menu.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton>
            <ListItemText primary={menu.name} primaryTypographyProps={{ fontSize: '14px' }} /> {/* 글씨 크기 조정 */}
          </ListItemButton>
        </Link>
      ))}

      <ListItemButton onClick={handleUserInfoClick}>
        <ListItemText primary="회원정보" primaryTypographyProps={{ fontSize: '14px' }} /> {/* 글씨 크기 조정 */}
        {openUserInfo ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUserInfo} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/userinfo" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="회원정보 조회" primaryTypographyProps={{ fontSize: '10px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
          <Link to="/userleave" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="회원 탈퇴" primaryTypographyProps={{ fontSize: '10px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
    </div>
  );
}

export default SideBar;

import { useState } from "react";
import image1 from "../image/Quizverse.png";
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function MypageSidebar() {

    const [openHistory, setOpenHistory] = useState(false);
    const [openUserInfo, setOpenUserInfo] = useState(false);
  
    const handleHistoryClick = () => {
      setOpenHistory(!openHistory);
    };
  
    const handleUserInfoClick = () => {
      setOpenUserInfo(!openUserInfo);
    };
  
    const menus = [
      { name: "즐겨찾기", path: "/mypage/bookmark" },
      { name: "오답노트", path: "/mypage/wrong" }
    ];

    return (
        <aside className="w-64 p-4 border-r">
            <div className="flex items-center mb-6">
                <img
                    src={image1}
                    alt="Logo"
                    className="w-10 h-10 mr-2"
                    width="40"
                    height="40"
                />
                <span className="text-xl font-bold">Quizeverse</span>
            </div>
            <input
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-6"
                placeholder="Placeholder"
            />
            <nav className="space-y-4">
                <div>
                <Link to="/mypage" style={{ textDecoration: 'none', color: 'inherit' }}>
      <ListItemText primary="마이페이지" primaryTypographyProps={{ fontSize: '20px' }} />
      </Link>
      <ListItemButton onClick={handleHistoryClick}>
        <ListItemText primary="나의 이력" primaryTypographyProps={{ fontSize: '20px' }} /> {/* 글씨 크기 조정 */}
        {openHistory ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openHistory} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/mypage/publishedbook" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="나의 출제이력" primaryTypographyProps={{ fontSize: '15px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
          <Link to="/mypage/solvedbook" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="나의 학습이력" primaryTypographyProps={{ fontSize: '15px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
          <Link to="/mypage/myclass" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="나의 클래스" primaryTypographyProps={{ fontSize: '15px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      {menus.map((menu, index) => (
        <Link to={menu.path} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemButton>
            <ListItemText primary={menu.name} primaryTypographyProps={{ fontSize: '20px' }} /> {/* 글씨 크기 조정 */}
          </ListItemButton>
        </Link>
      ))}

      <ListItemButton onClick={handleUserInfoClick}>
        <ListItemText primary="회원정보" primaryTypographyProps={{ fontSize: '20px' }} /> {/* 글씨 크기 조정 */}
        {openUserInfo ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openUserInfo} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/mypage/updateuser" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="회원정보 수정" primaryTypographyProps={{ fontSize: '15px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
          <Link to="/mypage/leave" style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemText primary="회원 탈퇴" primaryTypographyProps={{ fontSize: '15px' }} /> {/* 글씨 크기 조정 */}
            </ListItemButton>
          </Link>
        </List>
      </Collapse>
                </div>
            </nav>
        </aside>
    );
}
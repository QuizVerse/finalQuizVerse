import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';

export default function StudyRoomCard({ image, title, description, nowMember, totalMember, status, onClick }) {

    const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/study/";

    return (
        <Box
            sx={{
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: 'background.paper',
                boxShadow: 1,
                display: 'flex',
                alignItems: 'center',
                p: 2,
                cursor: 'pointer'
            }}
            data-v0-t="card"
            onClick={onClick}
        >
            <Avatar
                src={photopath + image}
                alt={title}
                sx={{ width: 64, height: 64 }}
            />
            <Box sx={{ flex: 1, ml: 2 }}>
                <Typography variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 1 }}>
                <Typography variant="body2">
                    {nowMember}/{totalMember}
                </Typography>
                <IconButton>
                    {status === 1 ? <LockOpenIcon /> : <LockIcon />}
                </IconButton>
            </Box>
        </Box>
    );
}

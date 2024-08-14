
import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const MyPage = () => {
    return (
        <div>
            <h2>개요</h2>
      <Box sx={{ width: '100%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item>내가만든 문제집
            <br/>
            12개
         </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>나의 클래스
            <br/>
            9개
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>내가 푼 문제집
            <br/>
            37개
          </Item>
        </Grid>
        <Grid item xs={3}>
          <Item>즐겨찾기한 문제집
            <br/>
            60개
          </Item>
        </Grid>
      </Grid>
    </Box>

    <h2>내가 만든 문제집</h2>
    <Box sx={{ width: '100%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Item sx={{width : '200px', height : '200px'}}> </Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{width : '200px', height : '200px'}}></Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{width : '200px', height : '200px'}}></Item>
        </Grid>
        <Grid item xs={3}>
          <Item sx={{width : '200px', height : '200px'}}></Item>
        </Grid>
      </Grid>
    </Box>
        </div>
    );
};

export default MyPage;
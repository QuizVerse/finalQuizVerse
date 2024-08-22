import { Button, TextField, textFieldClasses } from '@mui/material';
import React from 'react';

const MakeLeave = () => {
    return (
        <div>
            <h1 className='text-center'>회원 탈퇴</h1>
        
        <div className='text-center'>
            <Button variant='outlined'>
                인증코드 발송
            </Button>
            <Button variant='outlined'>
                인증코드 발송
            </Button>
        </div>
        <div>
            <label>
                인증코드데스네
            </label>
            <br/>
        <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </div>
        <div>
            <label>
                비밀번호다냥
            </label>
            <br/>
            <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
        </div>
        <div>
            *비밀번호가 일차하지않는데!! 다시 입력하쇼
        </div>
        <div>
            탈퇴사유
            <textarea className='flex min-h-[80px] w-full rounded-md border border-input'>
                우왕ㅋ 굳ㅋ
            </textarea>
        </div>
        <div>
            <Button variant='contained'>
                이것은 확인버튼이여
            </Button>
        </div>
    </div>
    );
};

export default MakeLeave;<h1 className='text-center'>회원 탈퇴</h1>
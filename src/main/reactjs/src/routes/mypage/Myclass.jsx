// v0 by Vercel.
// https://v0.dev/t/PyQHzVi1rPb

import CustomConfirm from "../../components/modal/CustomConfirm";
import React, {useEffect, useState} from "react";
import {
  Button,
  MenuItem, Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from "@mui/material";
import NewClass from "../../components/modal/NewClass";
import axios from "axios";
import CustomAlert from "../../components/modal/CustomAlert";
import Paper from '@mui/material/Paper';
import {useNavigate} from "react-router-dom";

const conditions = [
  {
    value: 'popular',
    label: '인기순',
  },
  {
    value: 'recent',
    label: '최신순',
  },
  {
    value: 'old',
    label: '오래된순',
  },
  {
    value: 'title',
    label: '제목순',
  },
];

const ITEMS_PER_PAGE = 10;
const SPACING = 2;

export default function Myclass() {

  const navi=useNavigate();

  const [alertVisible, setAlertVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [className, setClassName] = useState("");
  const [classDescription, setClassDescription] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [classList,setClassList]=useState([]);
  const onSetClassName = (className) => {
    setClassName(className);
  }

  const onSetClassDescription = (classDescription) => {
    setClassDescription(classDescription);
  }

  //처음 딱 한번 목록 가져오기
  useEffect(()=>{
    getDataList();
  },[]);

  const getDataList=()=>{
      axios({
        method:'get',
        url:'/myclass/index',
      }).then(res=>{
        console.log(res);
        setClassList(res.data);
      })
  }

  const classClick=(classId)=>{
    navi(`/mypage/myclass/detail/${classId}`);
  };

  /**
   * @description : Confirm창 열릴 때
   * */
  const openConfirm = () => {
    setConfirmVisible(true);
  };

  /**
   * @description : Alert창 열릴 때
   * */
  const openAlert = () => {
    setAlertVisible(true);
  };

  /**
   * @description : Alert창 닫힐 때
   * */
  const closeAlert = () => {
    setAlertVisible(false);
  };

  /**
   * @description : 취소 버튼 클릭시 실행되는 로직
   * */
  const clickBtn1 = () => {
    setConfirmVisible(false);
  };

  /**
   * @description : 확인 버튼 클릭시 실행되는 로직
   * */
  const clickBtn2 = () => {
    if(className==''){
      setAlertTitle("클래스 이름을 입력해주세요.");
      openAlert();
      return;
    }
    if(classDescription==''){
      setAlertTitle("클래스 설명을 입력해주세요.");
      openAlert();
      return;
    }
    axios({
      method:'post',
      url:'/myclass/newclass',
      data:{
        "className": className,
        "classDescription": classDescription,
      },
    }).then(res=>{
      console.log(res);
      setClassName('');
      setClassDescription('');
      setAlertTitle("클래스 생성이 완료되었습니다.");
      openAlert();
      getDataList(); // 생성하고나면 리스트 재출력
    })
    setConfirmVisible(false);
  };

  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = classList.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(classList.length / ITEMS_PER_PAGE);


  return (
      <main className="flex-1 py-12 px-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">나의 클래스</h1>
        </div>
        <div className="flex items-center space-x-4 justify-end">
          <Button
              onClick={openConfirm}
              variant="contained"
              className="whitespace-nowrap">
            클래스 생성
          </Button>
        </div>
        <div className="flex items-center mb-4 space-x-4 justify-between">
          <CustomConfirm
              id={9} // CustomConfirm에서 id 확인하여 입력
              // props으로도 입력 가능 (title, content, btn1Text,  btn2Text)
              content={
                <NewClass
                    label={"Class name"}
                    placeholder={""}
                    updateClassName={onSetClassName}
                    updateClassDescription={onSetClassDescription}
                />
              }
              openConfirm={confirmVisible}
              clickBtn1={clickBtn1}
              clickBtn2={clickBtn2}
          />
          <CustomAlert
              //id={5} // CustomAlert id 확인하여 입력
              // props으로도 입력 가능 (title, content, btnText)
              title={alertTitle}
              openAlert={alertVisible}
              closeAlert={closeAlert}
          />
        </div>
        <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
        >
          <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>구성원수</TableCell>
                  <TableCell>가입일시</TableCell>
                  <TableCell>생성일시</TableCell>
                  <TableCell>상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>

                {currentItems &&
                    currentItems.map((row) => (

                        <TableRow
                            key={row.classId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            onClick={() => classClick(row.classId)}
                            style={{cursor: "pointer"}}
                        >
                          <TableCell component="th" scope="row">
                            {row.className}
                          </TableCell>
                          <TableCell>{row.memberCount}</TableCell>
                          <TableCell>{row.joinDate ? new Date(row.joinDate).toLocaleString() : '-'}</TableCell>
                          <TableCell>{new Date(row.formattedDate).toLocaleString()}</TableCell>
                          <TableCell>  {row.memberRole === 1 ? '방장' : '멤버'}</TableCell>
                        </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className={"flex justify-center mt-4"}>
          <Stack spacing={SPACING}>
            <Pagination
                count={pageCount}
                page={page}
                onChange={handleChange}
                showFirstButton
                showLastButton
            />
          </Stack>
        </div>
      </main>
  );
}

// v0 by Vercel.
// https://v0.dev/t/AIdkA9Pm9Pa

import {Link} from "react-router-dom";
import {Button, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard";


const ITEMS_PER_PAGE = 10;
const SPACING = 2;

export default function Summary() {
  const [classList,setClassList]=useState([]);
  const [page, setPage] = useState(1);

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = classList.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(classList.length / ITEMS_PER_PAGE);
  
  //처음 딱 한번 목록 가져오기
  useEffect(()=>{
    getDataList();
  },[]);

  const getDataList=()=>{
      axios({
        method:'get',
        url:'/myclass/list',
      }).then(res=>{
        console.log(res);
        setClassList(res.data);
      })
  }
  
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  }

  return (
      <main className="flex-1 p-8">
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">개요</h2>
          <div className="grid grid-cols-4 gap-4">
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">내가 만든 문제집</h3>
                <div className="text-3xl font-bold">12개</div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">나의 클래스</h3>
                <div className="text-3xl font-bold">9개</div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">내가 푼 문제집</h3>
                <div className="text-3xl font-bold">37개</div>
              </div>
            </div>
            <div
                className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                data-v0-t="card"
            >
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">즐겨찾기한 문제집</h3>
                <div className="text-3xl font-bold">60개</div>
              </div>
            </div>
          </div>
        </section>
        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-bold">내가 만든 문제집</h2>
          <div className="grid grid-cols-4 gap-4">
            <Button
                className="rounded-lg border bg-card text-card-foreground shadow-sm flex items-center justify-center space-x-4"
                data-v0-t="card" variant={"outlined"}
            >
              <Link to={"/book/new"} className={"flex justify-center items-center w-full h-full"}>
              <div className="p-6 flex-1 flex flex-col items-center">
                  <div className="text-lg font-semibold">문제집 추가</div>
                  <div className="text-3xl font-bold">+</div>
              </div>
              </Link>
            </Button>
            <BookCard cardType="B" className={"flex-1"} 
            photo={""}
            createDate={"2024-08-17"} nickname={"닉네임"} 
            title={"제목이랍니다"} category={"취업 / 자격증"}
             />
             <BookCard cardType="B" className={"flex-1"} 
             photo={""}
             createDate={"2024-08-18"} nickname={"쿠킹호일"} 
             title={"제목일걸요"} category={"여기는 카테고리"}
              />
              <BookCard cardType="B" className={"flex-1"} 
              photo={""}
              createDate={"2000-05-16"} nickname={"이시연"} 
              title={"R"} category={" 보컬 / 서브기타"}
               />
          </div>
        </section>
        <section>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>이름</TableCell>
                  <TableCell>구성원수</TableCell>
                  <TableCell>가입일시</TableCell>
                  <TableCell>생성일시</TableCell>
                  <TableCell>상태</
                  TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentItems &&
                    currentItems.map((row) => (
                        <TableRow
                            key={row.classId}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                          <TableCell component="th" scope="row">
                            {row.className}
                          </TableCell>
                          <TableCell>{row.classDescription}</TableCell>
                          <TableCell>{row.classCreatedate}</TableCell>
                          <TableCell>{row.carbs}</TableCell>
                          <TableCell>{row.protein}</TableCell>
                        </TableRow>
                    ))
                }
              </TableBody>
            </Table>
          </TableContainer>
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
          {/* <h2 className="mb-4 text-2xl font-bold">나의 클래스</h2>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  클래스 이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  등록일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  구성원 수
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  상태
                </th>
              </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  정치기 스터디
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-23
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  10
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  자바 함께해요
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-20
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  3
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  영어스터디
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-19
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  5
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">
                  언어교환
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  2024-07-17
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  9
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  멤버
                </td>
              </tr>
              </tbody>
            </table>
          </div> */}
        </section>
      </main>
  );
}

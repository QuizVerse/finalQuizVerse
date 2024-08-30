// v0 by Vercel.
// https://v0.dev/t/QGcuOmSrS3M

import BookCard from "../../components/BookCard";
import {useEffect, useState} from "react";
import AddClassMember from "../../components/modal/AddClassMember";
import {useParams} from "react-router-dom";
import axios from "axios";

export default function MyclassDetail() {
  const { classId } = useParams();
  const [openAdd, setOpenAdd]=useState(false);
  const [members,setMembers]=useState([]);


  const memberAdd=()=>{
    setOpenAdd(true);
  }
  const handleClose=()=>{
    setOpenAdd(false);
  }

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`/myclass/${classId}/members`);
        setMembers(response.data);
      } catch (e) {
        console.error("Failed to fetch members", e);
      }
    };

    fetchMembers(); // fetchMembers 함수를 호출하여 멤버 데이터를 가져옵니다.
  }, [classId]); // classId가 변경될 때마다 데이터를 다시 가져옵니다.


  return (
      <main className="flex-1 p-6">
        <h1 className="mb-6 text-2xl font-bold">정치기 실기 스터디</h1>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <input
                className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
                placeholder="Name, email, etc..."
              />
              <button
                type="button"
                role="combobox"
                aria-controls="radix-:R9alufnnkr:"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                data-placeholder=""
                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>등록일순</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-chevron-down h-4 w-4 opacity-50"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              </button>
              <select
                aria-hidden="true"
                tabindex="-1"
              >
                <option value=""></option>
              </select>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-4 h-4"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
              </button>
            </div>
            <div className="space-x-2">
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              onClick={memberAdd}>
                구성원 추가
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
             /* onClick={memberDelete}*/>
                구성원 삭제
              </button>
              <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
             /* onClick={leaveClass}*/>
                클래스 나가기
              </button>
            </div>
          </div>
          {openAdd && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-md shadow-lg relative w-full max-w-md">
                  <AddClassMember onClose={handleClose} />

                </div>
              </div>
          )}




          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-10">
                  <button
                      type="button"
                      role="checkbox"
                      aria-checked="false"
                      data-state="unchecked"
                      value="on"
                      className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                  ></button>
                  <input
                      type="checkbox"
                      aria-hidden="true"
                      tabindex="-1"
                      value="on"
                  />
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  이름
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  프로필사진
                </th>

                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  이메일
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  등록일시
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                  상태
                </th>
              </tr>
              </thead>
              <tbody>
              {members.map((member) => (
                  <tr key={member.classmemberId}
                      className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <td className="p-4 align-middle">{member.user.userNickname}</td>
                    <td className="p-4 align-middle">{member.user.userEmail}</td>
                    <td className="p-4 align-middle">{new Date(member.classmemberDate).toLocaleString()}</td>
                    <td className="p-4 align-middle">
                      <div
                          className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
                        {member.classmemberRole === 2 ? "멤버" : "관리자"}
                      </div>
                    </td>
                  {/*  <td className="p-4 align-middle">
                      {member.user.userImage ? (
                          <img src={member.user.userImage} alt={member.user.userNickname}
                               className="w-10 h-10 rounded-full"/>
                      ) : (
                          <span>No Image</span>
                      )}
                    </td>*/}
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">클래스 공개 문제집</h2>
          <a className="text-sm text-muted-foreground" href="#">
            전체보기
          </a>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <BookCard cardType="A"
                    nickname="합격률 80%"
                    createDate="2024-08-23"
                    title="2024 정보처리기사 실기"
                    category="문제집/자격증"
                    viewCount="10"
                    questionCount="20"
                    sectionCoune="4"
                    status="여긴status"/>
          <BookCard cardType="A"
                    nickname="합격률 80%"
                    createDate="2024-08-23"
                    title="2024 정보처리기사 실기"
                    category="문제집/자격증"
                    viewCount="10"
                    questionCount="20"
                    sectionCoune="4"
                    status="여긴status"/>
          <BookCard cardType="A"
                    nickname="합격률 80%"
                    createDate="2024-08-23"
                    title="2024 정보처리기사 실기"
                    category="문제집/자격증"
                    viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/>
        <BookCard cardType="A"
        nickname="합격률 80%"
        createDate="2024-08-23"
        title="2024 정보처리기사 실기"
        category="문제집/자격증"
        viewCount="10"
        questionCount="20"
        sectionCoune="4"
        status="여긴status"/> 
        </div>
      </main>
  );
}

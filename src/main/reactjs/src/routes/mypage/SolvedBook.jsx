import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ITEMS_PER_PAGE = 10;

export default function SolvedBook() {
  const generateRandomData = () => {
    const getRandomDate = () => {
      const start = new Date(2022, 0, 1);
      const end = new Date();
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
    };

    const getRandomProgress = () => {
      const progress = Math.floor(Math.random() * 101);
      return progress === 100 ? '완료' : `진행중(${progress}%)`;
    };

    const getRandomScore = () => {
      const score = Math.floor(Math.random() * 21);
      return `${score}/20`;
    };

    const titles = [
      "정보처리기사 실기", "sqld 기출 1", "sqld 기출 2", "sqld 기출 3", "sqld 기출 4",
      "데이터베이스 설계", "웹 개발 기초", "프로그래밍 기초", "알고리즘 기초", "운영체제 기초",
      "시스템 분석 기초", "네트워크 기초", "클라우드 컴퓨팅", "소프트웨어 공학", "데이터베이스 관리",
      "Java 프로그래밍", "Python 프로그래밍", "SQL 기초", "데이터 분석", "인공지능 기초",
      "기계 학습", "딥 러닝", "자바스크립트 기초", "React.js 기초", "Vue.js 기초", "Node.js 기초",
      "HTML/CSS 기초", "웹 디자인 기초", "시스템 프로그래밍", "안드로이드 개발", "iOS 개발",
      "보안 기초", "운영체제 심화", "네트워크 심화", "프로그래밍 심화", "데이터베이스 심화",
      "클라우드 관리", "소프트웨어 아키텍처", "경량 프로그래밍", "웹 애플리케이션 개발", "데이터 시각화",
      "API 설계", "소프트웨어 테스트", "버전 관리", "개발 도구", "시스템 보안", "네트워크 보안",
      "클라우드 보안", "기술 면접 준비", "알고리즘 문제 풀이", "프로그래밍 챌린지", "오픈 소스 기여",
      "기술 블로그 작성", "IT 컨설팅", "프로젝트 관리", "팀 협업", "기술 문서 작성", "시스템 모니터링",
      "데이터 마이닝", "웹 크롤링", "인공지능 모델 학습", "API 통합", "소프트웨어 유지보수", "UI/UX 디자인"
    ];

    return Array.from({ length: 60 }, (_, index) => ({
      name: `${index + 1} ${titles[index % titles.length]}`,
      learningDate: getRandomDate(),
      submissionDate: getRandomDate(),
      score: getRandomScore(),
      progress: getRandomProgress(),
      buttonLabel: Math.random() > 0.5 ? '성적확인' : '이어서 학습하기'
    }));
  };

  const data = generateRandomData();
  const [page, setPage] = useState(1);
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = data.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(data.length / ITEMS_PER_PAGE);

  return (
    <main className="flex-1 p-8">
      <h1 className="mb-8 text-2xl font-bold text-center">나의 학습이력</h1>
      <div className="flex items-center justify-end mb-4 space-x-4">
        <input
          className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-64"
          placeholder="Name, email, etc..."
        />
        <button
          type="button"
          role="combobox"
          aria-controls="radix-:Rilufnnkr:"
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
        <select aria-hidden="true" tabindex="-1">
          <option value=""></option>
        </select>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
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
            className="w-5 h-5"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
      </div>
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                문제집 이름
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                학습일시
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                제출일시
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                정답수/문항수
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0"></th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            {currentItems.map((item, index) => (
              <tr key={index} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  {item.name}
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  {item.learningDate}
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  {item.submissionDate}
                </td>
                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                  {item.score}
                </td>
                <td className="p-4 align-middle text-right [&amp;:has([role=checkbox])]:pr-0">
                  <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
                    {item.buttonLabel}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center pt-4"> {/* 변경된 부분 */}
        <p className="text-sm text-muted-foreground mr-4">총 {data.length}개 항목</p>
        <Stack spacing={2}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={handlePageChange}
            showFirstButton
            showLastButton
          />
        </Stack>
      </div>
    </main>
  );
}

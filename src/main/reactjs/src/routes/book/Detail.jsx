// v0 by Vercel.
// https://v0.dev/t/MH9WmcxxRpC

import { useState } from "react";

export default function Detail() {
  //Review More
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const toggleReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };
  return (
    <div className="flex flex-col items-center w-full min-h-screen p-4">
      <header className="flex items-center justify-between w-full px-4 py-2 border-b">
        <h1 className="text-xl font-bold">QuizVerse</h1>
        <nav className="flex items-center space-x-4">
          <a className="text-sm text-muted-foreground" href="#" rel="ugc">
            문제집 목록
          </a>
          <a className="text-sm text-muted-foreground" href="#" rel="ugc">
            화상스터디
          </a>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            로그인
          </button>
          <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <img
              className="aspect-square h-full w-full"
              alt="User Avatar"
              src="/placeholder-user.jpg"
            />
          </span>
        </nav>
      </header>
      <main className="flex flex-col items-center w-full max-w-4xl mt-8 space-y-8">
        <div className="flex flex-col items-center w-full space-y-4">
          <img
            src="/placeholder.svg"
            alt="Main Image"
            className="w-full max-w-md"
            width="400"
            height="300"
          />
          <div className="flex flex-col w-full space-y-2">
            <h2 className="text-lg font-bold">[카테고리]</h2>
            <h3 className="text-2xl font-semibold">
              문제집 제목 어쩌고 저쩌고 조금 여유있게 작성하시면 될 듯 합니다
              아주 크게요
            </h3>
            <p className="text-sm text-muted-foreground">
              출제자 박민지 | 조회수 180 | 출제일자 2024.07.18
            </p>
            <div className="p-4 border rounded-md">
              <p className="text-sm">
                문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠
                문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠
                문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠
                문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠
              </p>
            </div>
            <div className="flex flex-wrap items-center space-x-2">
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300"
                data-v0-t="badge"
              >
                문항수
              </div>
              <span>100 문항</span>
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300"
                data-v0-t="badge"
              >
                섹션수
              </div>
              <span>10 섹션</span>
              <div
                className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-blue-200 text-blue-800 hover:bg-blue-300"
                data-v0-t="badge"
              >
                응시 제한시간
              </div>
              <span>60분(없을 경우 없음으로 표시)</span>
            </div>
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-blue-500 text-white hover:bg-blue-600/90 h-10 px-4 py-2 mt-4">
              시험 응시
            </button>
          </div>
        </div>
        <div className="w-full space-y-4">
          <h4 className="text-lg font-semibold">
            리뷰 (3) <span className="text-yellow-500">★ 2.5</span>
          </h4>
          <div className="space-y-4">
            {/* Always visible reviews */}
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center space-x-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Reviewer Avatar"
                    src="/placeholder-user.jpg"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">리뷰어1</span>
                  <span className="text-xs text-muted-foreground">
                    2024.06.19
                  </span>
                </div>
                <div className="flex items-center ml-auto space-x-1">
                  {/* Star Rating */}
                  {/* Add your star SVGs here */}
                </div>
              </div>
              <p className="mt-2 text-sm">
                리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!!
              </p>
            </div>
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
              data-v0-t="card"
            >
              <div className="flex items-center space-x-2">
                <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                  <img
                    className="aspect-square h-full w-full"
                    alt="Reviewer Avatar"
                    src="/placeholder-user.jpg"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">리뷰어2</span>
                  <span className="text-xs text-muted-foreground">
                    2024.06.19
                  </span>
                </div>
                <div className="flex items-center ml-auto space-x-1">
                  {/* Star Rating */}
                  {/* Add your star SVGs here */}
                </div>
              </div>
              <p className="mt-2 text-sm">
                리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!!
              </p>
            </div>

            {/* Conditionally visible reviews */}
            {showMoreReviews && (
              <>
                <div
                  className="rounded-lg border bg-card text-card-foreground shadow-sm p-4"
                  data-v0-t="card"
                >
                  <div className="flex items-center space-x-2">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                      <img
                        className="aspect-square h-full w-full"
                        alt="Reviewer Avatar"
                        src="/placeholder-user.jpg"
                      />
                    </span>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">리뷰어3</span>
                      <span className="text-xs text-muted-foreground">
                        2024.06.19
                      </span>
                    </div>
                    <div className="flex items-center ml-auto space-x-1">
                      {/* Star Rating */}
                      {/* Add your star SVGs here */}
                    </div>
                  </div>
                  <p className="mt-2 text-sm">
                    리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!!
                  </p>
                </div>

                {/* Add more reviews here as needed */}
              </>
            )}
          </div>

          <button
            onClick={toggleReviews}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 hover:underline h-10 px-4 py-2 ml-auto"
          >
            {showMoreReviews ? "접기" : "더보기"}
          </button>
        </div>
      </main>
    </div>
  );
}

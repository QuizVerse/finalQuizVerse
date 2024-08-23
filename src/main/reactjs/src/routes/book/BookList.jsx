/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JJXGo0DWIQO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import BookCard from "../../components/BookCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom";
import CustomInput from "../../components/CustomInput";

export default function BookList() {
  return (
      <main className="p-16">
        <div className="flex items-center justify-center mb-8">
          <div className="w-full max-w-4xl p-16 text-center bg-gray-200 rounded">문제집 추천배너</div>
        </div>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">취업/자격증 문제집 Top 5</h2>
            <Link className="text-gray-600 flex gap-2 items-center">
              전체보기
              <ArrowForwardIosIcon fontSize={'8px'}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">초등 문제집 Top 5</h2>
            <Link className="text-gray-600 flex gap-2 items-center">
              전체보기
              <ArrowForwardIosIcon fontSize={'8px'}/>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
        </section>
      </main>
  )
}



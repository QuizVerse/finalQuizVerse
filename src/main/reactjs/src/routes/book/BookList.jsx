/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JJXGo0DWIQO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import BookCard from "../../components/BookCard";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {Link} from "react-router-dom";

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
            <BookCard cardType={'A'}/>
            <BookCard cardType={'A'}/>
            <BookCard cardType={'A'}/>
            <BookCard cardType={'A'}/>
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
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </section>
      </main>
  )
}



/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JJXGo0DWIQO
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import BookCard from "../../components/BookCard";
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
            <a href="#" className="text-gray-600">
              전체보기 &amp;gt;
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">초등 문제집 Top 5</h2>
            <a href="#" className="text-gray-600">
              전체보기 &amp;gt;
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">중고등 문제집 Top 5</h2>
            <a href="#" className="text-gray-600">
              전체보기 &amp;gt;
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <BookCard/>
            <BookCard/>
            <BookCard/>
            <BookCard/>
          </div>
        </section>
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">외국어/어학 문제집 Top 5</h2>
            <a href="#" className="text-gray-600">
              전체보기 &amp;gt;
            </a>
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



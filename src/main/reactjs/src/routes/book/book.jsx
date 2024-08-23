import MainHeader from "../../components/MainHeader";
import {Outlet} from "react-router-dom";
import CategoryHeader from "../../components/CategoryHeader";
import BookCard from "../../components/BookCard";

export default function BookList() {
    return (
        <div className="min-h-screen bg-white">
            <MainHeader/>
            <CategoryHeader/>
            <div className="p-16">
            
            <div className="flex items-center justify-center mb-8">
                <div className="w-full max-w-4xl p-16 text-center bg-gray-200 rounded">
                    문제집 추천배너
                </div>
            </div>
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-1 font-bold">취업/자격증 문제집 Top 5</h2>
                    <a className="text-gray-600 flex gap-2 items-center" href="/book">
                    "전체보기"
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSize8px css-821wyw-MuiSvgIcon-root"
                    focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon"></svg>
                    </a>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <BookCard cardType="A"/>
                    <BookCard cardType="B"/>
                    <BookCard cardType="C"/>
                    <BookCard cardType="A"/>
                </div>
            </section>
            <section className="mb-8">
                <div className="flex items-center justify-between mb-4">
                <h2 className="text-1 font-bold">초등 문제집 Top 5</h2>
                <a className="text-gray-600 flex gap-2 items-center" href="/book">
                    "전체보기"
                    <svg className="MuiSvgIcon-root MuiSvgIcon-fontSize8px css-821wyw-MuiSvgIcon-root"
                    focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon"></svg>
                    </a>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <BookCard cardType="C"/>
                    <BookCard cardType="B"/>
                    <BookCard cardType="A"/>
                    <BookCard cardType="C"/>
                </div>
            </section>
            </div>

        </div>
    )
}

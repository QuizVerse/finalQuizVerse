import BookCard from "../../components/BookCard";
import {useState} from "react";

export default function BookmarkDemo() {

    const [isBookmark, setIsBookmark] = useState(false);

    /**
     * @description : 북마크 클릭시 상태 업데이트
    * */
    const clickBookmark = () => {
        setIsBookmark(!isBookmark);
    }
    
    const emptyFunc = () => {

    }

    return (
        <div className="flex gap-12">
            <BookCard
                cardType={"A"}
                updateBookmark={clickBookmark}
                title={"정보처리기사"}
                bookUrl={"www.copy.com"}
                isBookmark={isBookmark} 
            ></BookCard>
            <BookCard
                cardType={"B"}
                title={"웹디자인기능사"}
                bookUrl={"www.copycopy.com"}
            ></BookCard>
            <BookCard
                cardType={"C"}
                title={"정보처리기사"}
                bookUrl={"www.copy.com"}
            ></BookCard>

        </div>
    );
}

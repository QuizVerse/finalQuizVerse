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

    return (
        <div style={{width:"300px"}}>
            <BookCard
                cardType={"A"}
                updateBookmark = {clickBookmark}
                isBookmark={isBookmark}
            ></BookCard>

        </div>
    );
}

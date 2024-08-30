import {
  Rating,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function Review({
  openConfirm,
  confirmVisible,
  clickBtn1,
  clickBtn2,
  bookId
}) {
  const [rating, setRating] = useState(2);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    if (reviewText === "") {
      alert("후기 내용을 입력해주세요.");
      return;
    }
    axios({
      method: "post",
      url: "",
      data: {
        rating: rating,
        review_text: reviewText,
        book_id: bookId, // 책 ID 또는 문제집 ID를 여기에 설정
      },
    })
      .then((res) => {
        console.log(res);
        setRating(2); // 기본값으로 리셋
        setReviewText("/book/review");
        clickBtn2(); // 제출 버튼 클릭 시의 행동
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Dialog open={confirmVisible} onClose={clickBtn1} fullWidth maxWidth="sm">
      <DialogTitle className="text-center font-bold text-2xl my-8 mt-12">
        시험 응시를 종료합니다
      </DialogTitle>
      <DialogContent>
        <DialogContentText className="text-center">
          문제에 대해 한줄평을 남겨주세요!
        </DialogContentText>
        <div className="p-6 space-y-4">
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <TextField
            id="standard-multiline-static"
            label="평가 내용"
            multiline
            placeholder="솔직한 후기를 적어주세요"
            variant="standard"
            fullWidth
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </div>
      </DialogContent>
      <DialogActions className="flex justify-center w-full">
        <Button onClick={clickBtn1} className="mr-2">
          다음에 하기
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          제출하기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

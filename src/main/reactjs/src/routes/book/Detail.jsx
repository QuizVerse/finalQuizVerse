import { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom"; // React Router를 사용해 URL 파라미터를 받아옴
import axios from "axios";
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Box,
  Grid,
  Avatar,
  Chip,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

export default function Detail() {
  const navigate = useNavigate();
  const { book_Id } = useParams(); // URL에서 book_Id를 가져옴
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  //사진
  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";


  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  // 평점을 별 아이콘으로 변환하는 함수
  const getStarIcons = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <>
        {Array(fullStars).fill(<StarIcon sx={{ color: "#FFD700" }} />)}
        {hasHalfStar && <StarBorderIcon sx={{ color: "#FFD700" }} />}
        {Array(emptyStars).fill(<StarBorderIcon sx={{ color: "#FFD700" }} />)}
      </>
    );
  };

  // averageReviewScore 계산 (평점 계산)
  const averageReviewScore =
    reviewData.length > 0
      ? (
          reviewData.reduce((total, review) => total + review.reviewRate, 0) /
          reviewData.length
        ).toFixed(1)
      : "0.0";



  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/book/detail/${book_Id}`); // 책 정보 엔드포인트 호출
        setBookData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching book data:", error);
      }
    };

    const fetchReviewData = async () => {
      try {
        const response = await axios.get(`/book/review/${book_Id}`); // 리뷰 엔드포인트 호출
        setReviewData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("review error", error);
      }
    };

    fetchBookData(); // 책 정보 가져오기 호출
    fetchReviewData(); // 리뷰 데이터 가져오기 호출
  }, [book_Id]);

  if (error) {
    return <div>{error}</div>; // 에러가 있을 때 표시
  }

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!bookData) {
    return <div>No data found</div>; // 데이터가 없을 때 표시
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString)
        .toLocaleDateString("ko-KR", options)
        .replace(/\./g, "-")
        .replace(/ /g, "");
    return formattedDate.endsWith("-")
        ? formattedDate.slice(0, -1)
        : formattedDate;
  };


  return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container component="main" sx={{ mt: 8, flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* 왼편 이미지 */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    image={`${photopath}/${bookData.bookImage}`} // 전체 경로를 조합하여 이미지 경로 설정
                    alt="Book Image"
                    sx={{ height: 'auto', maxHeight: 600, width: '100%', objectFit: 'contain' }}
                />
              </Card>
            </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography
                variant="h4"
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                {bookData.bookTitle}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                출제자:
                {bookData.user ? bookData.user.userNickname : "알 수 없음"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                출제일자:{" "}
                {bookData.bookCreatedate
                  ? formatDate(bookData.bookCreatedate)
                  : "알 수 없음"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                카테고리:{" "}
                {bookData.category ? bookData.category.categoryName : "기타"}
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                {bookData.bookDescription || "알 수 없음"}
              </Typography>

              <Box
                sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label="총 점수"
                    color="primary"
                    sx={{
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      padding: "5px 10px",
                    }}
                  />
                  <Typography variant="body1">
                    {bookData.bookTotalscore}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label="응시 제한시간"
                    color="primary"
                    sx={{
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      padding: "5px 10px",
                    }}
                  />
                  <Typography variant="body1">
                    {bookData.bookTimer === 0
                      ? "제한 없음"
                      : bookData.bookTimer + " 분"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label="상태"
                    color="primary"
                    sx={{
                      borderRadius: "16px",
                      fontSize: "0.875rem",
                      padding: "5px 10px",
                    }}
                  />
                  <Typography variant="body1">
                    {bookData.bookStatus === 0 ? "비공개" : "공개"}
                  </Typography>
                </Box>
              </Box>

              <Button
                  onClick={()=> navigate(`/book/test/${book_Id}`)}
                variant="contained"
                color="primary"
                sx={{ mt: 4, height: 56 }}
              >
                시험 응시
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* 리뷰 섹션 */}
        <Container component="section" sx={{ mt: 8, mb: 4 }}>
          <Typography variant="h6" component="div">
            리뷰 ({reviewData.length}){" "}
            <span style={{ color: "#FFD700" }}>★ {averageReviewScore}</span>
          </Typography>
          <Box sx={{ mt: 2 }}>
            {Array.isArray(reviewData) && reviewData.length > 0 ? (
              reviewData
                .slice(0, showMoreReviews ? undefined : 5)
                .map((review) => (
                  <Card key={review.reviewId} sx={{ mb: 2 }}>
                    <CardContent sx={{ padding: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar
                          alt={
                            review.user
                              ? review.user.userNickname
                              : "Reviewer Avatar"
                          }
                          src={
                            review.user && review.user.userImage
                              ? review.user.userImage
                              : "/placeholder-user.jpg"
                          }
                          sx={{ width: 50, height: 50 }}
                        />
                        <Box sx={{ ml: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              mt: 1,
                            }}
                          >
                            {getStarIcons(review.reviewRate)}
                          </Box>
                          <Typography variant="body2">
                            {review.user ? review.user.userNickname : "Unknown"}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        {review.reviewContent}
                      </Typography>
                      <Box
                        sx={{
                          mt: 2,
                          mr: 1,
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(review.reviewDate)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <Typography variant="main">
                아직 작성된 리뷰가 없습니다.
              </Typography>
            )}
            {reviewData.length > 5 && (
              <Button
                onClick={toggleMoreReviews}
                sx={{
                  display: "block",
                  margin: "0 auto",
                  textAlign: "center",
                  mt: 2,
                }}
                startIcon={<ExpandMore />}
              >
                {showMoreReviews ? "리뷰 접기" : "리뷰 더보기"}
              </Button>
            )}
          </Box>
        </Container>
      </Container>
    </Box>
  );
}

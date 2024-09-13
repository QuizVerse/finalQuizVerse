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
  const [error, setError] = useState(null); // 에러 상태

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
        const response = await axios.get(`/book/detail/${book_Id}`);
        setBookData(response.data);
      } catch (error) {
        setError("책 데이터를 불러오는 데 실패했습니다.");
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
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
  // 로딩 중일 때 표시할 UI
  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>; // 에러가 있을 때 표시
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
  const handleStartExam = async () => {
    try {
      // 시험 시작 요청을 백엔드로 전송
      const response = await axios.post('/book/test/start', { bookId: book_Id });

      // 서버 응답에서 solvedbookId와 wrongRepeat 값을 추출
      const { solvedbookId, wrongRepeat } = response.data;

      if (!solvedbookId) {
        throw new Error("solvedbookId가 없습니다.");
      }

      // solvedbookId와 wrongRepeat를 URL에 포함하여 네비게이션
      console.log('Exam started successfully', response.data);
      navigate(`/book/test/${book_Id}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);
    } catch (error) {
      console.error('Error starting exam:', error);
      alert('시험을 시작하는데 실패했습니다.');
    }
  };

  return (
      <Box sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #ddd", // 두께 2px의 검은색 테두리 추가
        borderRadius: "8px", // 모서리를 둥글게 설정 (선택 사항)
        padding: "16px", // 테두리 안쪽에 여백 추가
      }}>
        <Container component="main" sx={{ mt: 8, flexGrow: 1 }}>
          <div className={"flex w-full gap-16"}>
            {/* 왼편 이미지 */}
            <Grid
                item
                xs={12}
                md={4}
                sx={{
                  paddingLeft: 0,
                  display: 'flex', // Flexbox 사용
                  justifyContent: 'center', // 가로 방향으로 가운데 정렬
                  alignItems: 'center', // 세로 방향으로 가운데 정렬 (필요 시)
                }}
                className={"w-full"}
            >
              <Card>
                <CardMedia
                    component="img"
                    image={
                      bookData.bookImage
                          ? `${photopath}/${bookData.bookImage}` // 이미지가 있을 때
                          : "/quizverse-logo.png" // 이미지가 없을 때 기본 이미지
                    }
                    alt="Book Image"
                    sx={{
                      height: '100%', // 그리드 높이에 맞춤
                      width: 'auto',  // 이미지 비율에 맞게 가로 크기 자동 조정
                      objectFit: 'contain', // 이미지 비율을 유지하면서 그리드에 맞춤
                      borderRadius: 2, // 이미지에 약간의 곡선 테두리 추가
                    }}
                />
              </Card>
            </Grid>


            <Grid item xs={12} md={6} className={"w-full"}>
              <Box sx={{display: "flex", flexDirection: "column", gap: 3}}>

                <Typography
                    variant="h4"
                    component="div"
                    sx={{fontWeight: "bold"}}
                >
                  {bookData.bookTitle}
                </Typography>
                <div className={"space-y-2"}>
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
                  <Typography variant="body1" color="text.secondary">
                    카테고리:{" "}
                    {bookData.category ? bookData.category.categoryName : "기타"}
                  </Typography>
                </div>
                <div className={"p-4 bg-gray-100 rounded"}>
                  <Typography variant="body2">
                    {bookData.bookDescription || "알 수 없음"}
                  </Typography>
                </div>
                <div className={"flex flex-col gap-4"}>
                  <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Chip
                        label="총 점수"
                        color="primary"
                        variant={"outlined"}
                    />
                    <Typography variant="body1">
                      {bookData.bookTotalscore} 점
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Chip
                        label="응시 제한시간"
                        color="primary"
                        variant={"outlined"}
                    />
                    <Typography variant="body1">
                      {bookData.bookTimer === 0
                          ? "제한 없음"
                          : bookData.bookTimer + " 분"}
                    </Typography>
                  </Box>
                  <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <Chip
                        label="상태"
                        color="primary"
                        variant={"outlined"}
                    />
                    <Typography variant="body1">
                      {bookData.bookStatus === 0 ? "공개" : bookData.bookStatus === 1 ? "클래스 공개" : "비공개"}
                    </Typography>
                  </Box>
                </div>
                <div className={"w-full flex justify-end"}>
                  <Button
                      onClick={handleStartExam} // 버튼 클릭 시 시험 응시 처리
                      variant="contained"
                      color="primary"
                      size={"large"}
                      fullWidth
                  >
                    시험 응시
                  </Button>
                </div>
                </Box>
            </Grid>
          </div>

          {/* 리뷰 섹션 */}
          <Container component="section" sx={{mt: 8, mb: 4}}>
            <Typography variant="h6" component="div">
              리뷰 ({reviewData.length}){" "}
              <span style={{ color: "#FFD700" }}>★ {averageReviewScore}</span>
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Array.isArray(reviewData) && reviewData.length > 0 ? (
                  reviewData
                      .slice(0, showMoreReviews ? undefined : 3)
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
              {reviewData.length > 3 && (
                  <Button
                      onClick={toggleMoreReviews}
                      sx={{
                        display: "block",
                        margin: "0 auto",
                        textAlign: "center",
                        mt: 2,
                      }}
                      startIcon={
                        <ExpandMore
                            sx={{
                              transform: showMoreReviews ? "rotate(180deg)" : "rotate(0deg)",
                              transition: "transform 0.3s ease-in-out", // 부드러운 회전 애니메이션 추가
                            }}
                        />
                      }
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
import { useState, useEffect } from "react";
import {useParams} from "react-router-dom"; // React Router를 사용해 URL 파라미터를 받아옴
import axios from "axios";
import { Typography, Button, Container, Card, CardContent, CardMedia, Box, Grid, Avatar, Chip } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function Detail() {
  const {book_Id} = useParams(); //URL에서 book_Id를 가져옴
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [bookData, setBookData] = useState(null); // 책 데이터를 저장할 상태 추가
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  // DB에서 받아온 데이터(예시)
  const questionCount = 50;
  const sectionCount = 10;
  const timeLimit = "제한 없음";

  useEffect(() => {
    const fetchBookData = async () => {
      try {
        const response = await axios.get(`/book/${book_Id}`); // book_Id를 사용해 백엔드에서 책 정보 가져오기
        setBookData(response.data); //받아온 데이터를 bookData로 설정
        setLoading(false);
      } catch (error) {
        console.error("Error fetching book data:", error);
        setLoading(false);
      }
    };

    fetchBookData(); //데이터를 가져오는 함수 호출
  }, [book_Id]);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시
  }

  if (!bookData) {
    return <div>No data found</div>; // 데이터가 없을 때 표시
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // 날짜를 'YYYY-MM-DD' 형식으로 변환
    const formattedDate = new Date(dateString).toLocaleDateString('ko-KR', options).replace(/\./g, '-').replace(/ /g, '');
    return formattedDate.endsWith('-') ? formattedDate.slice(0, -1) : formattedDate; // 끝에 '-'가 있다면 제거
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
                    image={bookData.bookImage}
                    alt="Book Image"
                    sx={{ height: 'auto', maxHeight: 600, width: '100%', objectFit: 'contain' }} // 이미지를 버튼의 높이만큼 조정
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                  {bookData.bookTitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  출제자: {bookData.user ? bookData.user.userNickname : "알 수 없음"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  출제일자: {bookData.bookCreatedate ? formatDate(bookData.bookCreatedate) : "알 수 없음"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  카테고리: {bookData.category ? bookData.category.categoryName : "기타"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {bookData.bookDescription || "알 수 없음"}
                </Typography>


                {/* 문항 수, 섹션 수, 응시 제한시간을 세로로 배치 */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        label="총 점수"
                        color="primary"
                        sx={{ borderRadius: '16px', fontSize: '0.875rem', padding: '5px 10px' }}
                    />
                    <Typography variant="body1">{bookData.bookTotalscore}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        label="응시 제한시간"
                        color="primary"
                        sx={{ borderRadius: '16px', fontSize: '0.875rem', padding: '5px 10px' }}
                    />
                    <Typography variant="body1">{bookData.bookTimer === 0 ? "제한 없음" : bookData.bookTimer + " 분"}</Typography> {/* book_timer 필드 사용 */}
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                        label="상태"
                        color="primary"
                        sx={{ borderRadius: '16px', fontSize: '0.875rem', padding: '5px 10px' }}
                    />
                    <Typography variant="body1">{bookData.bookStatus === 0 ? "비공개" : "공개"}</Typography> {/* book_status 필드 사용 */}
                  </Box>
                </Box>

                <Button variant="contained" color="primary" sx={{ mt: 4, height: 56 }}>
                  시험 응시
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* 리뷰 섹션 */}
          <Container component="section" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h6" component="div">
              리뷰 (4) <span style={{ color: "#FFD700" }}>★ 2.5</span>
            </Typography>
            <Box>
              {[
                {
                  id: 1,
                  reviewer: "리뷰어1",
                  date: "2024.06.19",
                  content:
                      "리뷰 내용입니다. 아주 길게 적는 리뷰라면 이렇게 한참 더 길어질 수 있습니다. 예를 들어서, 이 리뷰가 여러 줄로 늘어지게 적혀있는 경우라면 사용자가 리뷰의 전체 내용을 읽기 위해서리뷰 내용입니다. 아주 길게 적는 리뷰라면 이렇게 한참 더 길어질 수 있습니다. 예를 들어서, 이 리뷰가 여러 줄로 늘어지게 적혀있는 경우라면 사용자가 리뷰의 전체 내용을 읽기 위해서리뷰 내용입니다. 아주 길게 적는 리뷰라면 이렇게 한참 더 길어질 수 있습니다. 예를 들어서, 이 리뷰가 여러 줄로 늘어지게 적혀있는 경우라면 사용자가 리뷰의 전체 내용을 읽기 위해서",
                },
                {
                  id: 2,
                  reviewer: "리뷰어2",
                  date: "2024.06.19",
                  content:
                      "리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!! 리뷰 내용이 길다면, 처음에는 요약된 부분만 보여줄 수 있습니다.",
                },
                {
                  id: 3,
                  reviewer: "리뷰어3",
                  date: "2024.06.19",
                  content:
                      "리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!!",
                },
                {
                  id: 4,
                  reviewer: "리뷰어4",
                  date: "2024.06.19",
                  content:
                      "리뷰 내용입니다. 이러쿵 저러쿵 어 어 어 어 얼렁뚱땅마!!! 여기에 더 많은 내용이 있을 수 있습니다.",
                },
              ]
                  .slice(0, showMoreReviews ? undefined : 2)
                  .map((review) => (
                      <Card key={review.id} sx={{ mb: 2 }}>
                        <CardContent sx={{ padding: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                            <Avatar
                                alt="Reviewer Avatar"
                                src="/placeholder-user.jpg"
                                sx={{ width: 40, height: 40 }}
                            />
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="body2" fontWeight="bold">
                                {review.reviewer}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {review.date}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">
                            {review.content}
                          </Typography>
                        </CardContent>
                      </Card>
                  ))}
              <Button
                  onClick={toggleMoreReviews}
                  sx={{ mt: 2 }}
                  startIcon={<ExpandMore />}
              >
                {showMoreReviews ? "접기" : "더보기"}
              </Button>
            </Box>
          </Container>
        </Container>
      </Box>
  );
}

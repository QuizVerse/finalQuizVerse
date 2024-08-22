import { useState } from "react";
import {
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Grid,
  Chip,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export default function Detail() {
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container component="main" sx={{ mt: 8, flexGrow: 1 }}>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card>
                <CardMedia
                    component="img"
                    image="/placeholder.svg"
                    alt="Main Image"
                    sx={{ height: 300 }}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    [카테고리]
                  </Typography>
                  <Typography variant="h5" component="div">
                    문제집 제목 어쩌고 저쩌고 조금 여유있게 작성하시면 될 듯 합니다
                    아주 크게요
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    출제자 박민지 | 조회수 180 | 출제일자 2024.07.18
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" component="p">
                      문제집 설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집
                      설명이 들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠 문제집 설명이 들어가겠죠 문제집 설명이
                      들어가겠죠
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Chip label="문항수" color="primary" />
                    <Typography>100 문항</Typography>
                    <Chip label="섹션수" color="primary" />
                    <Typography>10 섹션</Typography>
                    <Chip label="응시 제한시간" color="primary" />
                    <Typography>60분(없을 경우 없음으로 표시)</Typography>
                  </Box>
                  <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      fullWidth
                  >
                    시험 응시
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
        <Container component="section" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h6" component="div">
            리뷰 (4) <span style={{ color: "yellow" }}>★ 2.5</span>
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
      </Box>
  );
}

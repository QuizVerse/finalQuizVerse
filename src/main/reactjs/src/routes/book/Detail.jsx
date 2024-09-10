import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // React Router to fetch URL parameters
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
  const { book_Id, solvedbookId } = useParams(); // Fetch book_Id and solvedbookId from URL
  const [showMoreReviews, setShowMoreReviews] = useState(false);
  const [bookData, setBookData] = useState(null); // State for book data
  const [reviewData, setReviewData] = useState([]); // State for review data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Image path
  const photopath = "https://kr.object.ncloudstorage.com/bitcamp701-129/final/book";

  const toggleMoreReviews = () => {
    setShowMoreReviews(!showMoreReviews);
  };

  // Function to display stars based on rating
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

  // Calculate average review score
  const averageReviewScore =
      reviewData.length > 0
          ? (
              reviewData.reduce((total, review) => total + review.reviewRate, 0) /
              reviewData.length
          ).toFixed(1)
          : "0.0";

  // Fetch book and review data
  useEffect(() => {
    const fetchBookAndReviewData = async () => {
      try {
        let bookResponse;
        let reviewResponse;

        // Fetch book details based on solvedbookId (C-type) or book_Id (A/B-type)
        if (solvedbookId) {
          bookResponse = await axios.get(`/book/detail/${solvedbookId}`, {
            params: { wrongRepeat: true },
          });
        } else if (book_Id) {
          bookResponse = await axios.get(`/book/detail/${book_Id}`);
        }

        if (bookResponse && bookResponse.data) {
          setBookData(bookResponse.data);

          // Fetch reviews using the bookId from the book response or directly from book_Id
          const targetBookId = solvedbookId ? bookResponse.data.bookId : book_Id;
          reviewResponse = await axios.get(`/book/review/${targetBookId}`);
          setReviewData(reviewResponse.data);
        }
      } catch (error) {
        setError("Failed to fetch book or review data.");
        console.error("Error fetching book or review data:", error);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchBookAndReviewData();
  }, [book_Id, solvedbookId]);

  // Handle start exam
  const handleStartExam = async () => {
    try {
      const response = await axios.post("/book/test/start", { bookId: book_Id });
      const { solvedbookId, wrongRepeat } = response.data;

      if (!solvedbookId) {
        throw new Error("solvedbookId is missing.");
      }

      navigate(`/book/test/${book_Id}/${solvedbookId}?wrongRepeat=${wrongRepeat}`);
    } catch (error) {
      console.error("Error starting exam:", error);
      alert("Failed to start the exam.");
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const formattedDate = new Date(dateString)
        .toLocaleDateString("ko-KR", options)
        .replace(/\./g, "-")
        .replace(/ /g, "");
    return formattedDate.endsWith("-") ? formattedDate.slice(0, -1) : formattedDate;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display error if any
  }

  if (!bookData) {
    return <div>No data found</div>; // Display when no data is found
  }

  return (
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Container component="main" sx={{ mt: 8, flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            {/* Book image */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardMedia
                    component="img"
                    image={`${photopath}/${bookData.bookImage}`}
                    alt="Book Image"
                    sx={{ height: "auto", maxHeight: 600, width: "100%", objectFit: "contain" }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
                  {bookData.bookTitle}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Author: {bookData.user ? bookData.user.userNickname : "Unknown"}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Published: {bookData.bookCreatedate ? formatDate(bookData.bookCreatedate) : "Unknown"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {bookData.category ? bookData.category.categoryName : "Other"}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                  {bookData.bookDescription || "No description available"}
                </Typography>

                {/* Book metadata */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="Total Score" color="primary" />
                    <Typography variant="body1">{bookData.bookTotalscore}</Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="Time Limit" color="primary" />
                    <Typography variant="body1">
                      {bookData.bookTimer === 0 ? "No limit" : `${bookData.bookTimer} mins`}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip label="Status" color="primary" />
                    <Typography variant="body1">
                      {bookData.bookStatus === 0 ? "Private" : "Public"}
                    </Typography>
                  </Box>
                </Box>

                <Button
                    onClick={handleStartExam}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 4, height: 56 }}
                >
                  Start Exam
                </Button>
              </Box>
            </Grid>
          </Grid>

          {/* Review section */}
          <Container component="section" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h6" component="div">
              Reviews ({reviewData.length}){" "}
              <span style={{ color: "#FFD700" }}>★ {averageReviewScore}</span>
            </Typography>
            <Box sx={{ mt: 2 }}>
              {Array.isArray(reviewData) && reviewData.length > 0 ? (
                  reviewData
                      .slice(0, showMoreReviews ? undefined : 5)
                      .map((review) => (
                          <Card key={review.reviewId} sx={{ mb: 2 }}>
                            <CardContent sx={{ padding: 2 }}>
                              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                    alt={review.user ? review.user.userNickname : "Reviewer Avatar"}
                                    src={review.user && review.user.userImage ? review.user.userImage : "/placeholder-user.jpg"}
                                    sx={{ width: 50, height: 50 }}
                                />
                                <Box sx={{ ml: 3 }}>
                                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                                    {getStarIcons(review.reviewRate)}
                                  </Box>
                                  <Typography variant="body2">
                                    {review.user ? review.user.userNickname : "Unknown"}
                                  </Typography>
                                </Box>
                              </Box>
                              <Typography variant="body2">{review.reviewContent}</Typography>
                              <Box sx={{ mt: 2, mr: 1, display: "flex", justifyContent: "flex-end" }}>
                                <Typography variant="caption" color="text.secondary">
                                  {formatDate(review.reviewDate)}
                                </Typography>
                              </Box>
                            </CardContent>
                          </Card>
                      ))
              ) : (
                  <Typography variant="main">No reviews yet.</Typography>
              )}
              {reviewData.length > 5 && (
                  <Button
                      onClick={toggleMoreReviews}
                      sx={{ display: "block", margin: "0 auto", textAlign: "center", mt: 2 }}
                      startIcon={<ExpandMore />}
                  >
                    {showMoreReviews ? "Hide Reviews" : "Show More Reviews"}
                  </Button>
              )}
            </Box>
          </Container>
        </Container>
      </Box>
  );
}

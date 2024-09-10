import React, { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ReactDOM from "react-dom";
import LoadingModal from "../../components/modal/LoadingModal";
import axios from "axios";

export default function ScorePreview() {
  const navigate = useNavigate();
  const printpdfRef = useRef(null); // Ref for PdfPage component
  const [loadingVisible, setLoadingVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [bookData, setBookData] = useState(null);
  const { bookId } = useParams();

  const answers = Array.from({ length: 100 }, (_, index) => ({
    number: `${index + 1}번`,
    correct: true,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookResponse = await axios.get(`/book/scorepreview/${bookId}`);
        setBookData(bookResponse.data);

        const userResponse = await axios.get(`/book/username`);
        setUsername(userResponse.data.userNickname);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };
    fetchData();
  }, [bookId]);

  if (!bookData) {
    return <div>no data found</div>;
  }

  const downloadpdf = async () => {
    setLoadingVisible(true);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 5; // 여백 설정
    const pdfWidth = pdf.internal.pageSize.getWidth(); // PDF 페이지 너비
    const pdfHeight = pdf.internal.pageSize.getHeight(); // PDF 페이지 높이

    // 문제를 80개씩 나누어서 각 페이지에 렌더링
    const chunks = Array.from(
      { length: Math.ceil(answers.length / 80) },
      (_, i) => answers.slice(i * 80, i * 80 + 80)
    );

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.top = "-10000px";
      container.style.left = "-10000px";
      container.style.width = `${pdfWidth}mm`;
      document.body.appendChild(container);

      const startNumber = i*80+1;

      // pdfpage 컴포넌트 내용을 div(container)에 넣기, 문제 번호가 올바르게 표시되도록 시작 번호 전달
      ReactDOM.render(
        <PdfPage
          answers={chunk}
          username={username}
          bookData={bookData}
          startNumber={startNumber} // 각 페이지의 시작 번호를 전달
        />,
        container
      );

      const canvas = await html2canvas(container, {
        scale: 2, // 스케일을 2로 설정하여 해상도 조정
        useCORS: true,
      });

      const imgData = canvas.toDataURL("image/png");
      let imgWidth = pdfWidth - 2 * margin;
      let imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (imgHeight > pdfHeight - 2 * margin) {
        const scalingFactor = (pdfHeight - 2 * margin) / imgHeight;
        imgWidth *= scalingFactor;
        imgHeight = pdfHeight - 2 * margin;
      }

      imgWidth *= 0.95; // 출력시 약간의 여백을 남기도록 조정
      imgHeight *= 0.95;

      const x = (pdfWidth - imgWidth) / 2;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", x, margin, imgWidth, imgHeight);

      pdf.setFontSize(10);
      pdf.text(
        `${i + 1} / ${chunks.length}`,
        pdfWidth / 2,
        pdfHeight - margin,
        {
          align: "center",
        }
      );

      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }

    pdf.save("우태형 정보처리기사 2024 기출문제 1-2 성적표.pdf");
    setLoadingVisible(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="">
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outlined" onClick={() => navigate(`/book/score/${bookId}`)}>
            성적표로 돌아가기
          </Button>
          <Button variant="outlined" onClick={downloadpdf}>
            PDF로 출력
          </Button>
          <Button variant="contained" onClick={() => navigate("/book")}>
            메인으로
          </Button>
        </div>
        <section className="flex flex-col gap-2" ref={printpdfRef}>
          <PdfPage answers={answers} username={username} bookData={bookData} />
        </section>
      </div>
      <LoadingModal
        open={loadingVisible}
        title="PDF 생성중입니다. 잠시만 기다려주세요."
      />
    </div>
  );
}

// PdfPage 컴포넌트 정의
const PdfPage = React.forwardRef(
  ({ answers, username = "no info", bookData = {}, startNumber }, ref) => (
    <div style={{ width: "100%" }} ref={ref}>
      {/* 상단 성적표 헤더 부분 */}
      <div className="overflow-x-auto pt-5 py-8">
        <table className="min-w-full">
          <thead>
            <tr>
              <th
                rowSpan="3"
                className="text-2xl font-bold border border-gray-300 py-6 text-center"
              >
                {bookData.bookTitle || "No title"}
              </th>
            </tr>
            <tr>
              <th className="text-base font-semibold border border-gray-300 py-2 text-center">
                제출일시
              </th>
              <td className="text-base border border-gray-300 text-center">
                2024-08-01
              </td>
            </tr>
            <tr>
              <th className="text-base font-semibold border border-gray-300 py-2 text-center">
                응시자
              </th>
              <td className="text-base border border-gray-300 text-center">
                {username || "no info"}
              </td>
            </tr>
          </thead>
        </table>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">성적</h2>
        <table className="min-w-full p-4 border-2 border-gray-300">
          <tbody>
            <tr>
              <td className="w-1/4 font-semibold text-lg bg-[#F7F7F7] py-3 border border-gray-300 text-center">
                나의 점수
              </td>
              <td
                className="w-1/4 text-lg pr-5 border border-gray-300 text-end"
                colSpan={3}
              >
                50 / {bookData.bookTotalscore}점
              </td>
            </tr>
            <tr>
              <td className="w-1/4 font-semibold text-lg py-3 bg-[#F7F7F7] border border-gray-300 text-center">
                백분율 환산 점수
              </td>
              <td
                className="w-1/4 text-lg pr-5 border border-gray-300 text-end"
                colSpan={3}
              >
                50점
              </td>
            </tr>
            <tr>
              <td className="w-1/4 font-semibold text-lg py-3 bg-[#F7F7F7] border border-gray-300 text-center">
                정답 문항 수
              </td>
              <td className="w-1/4 text-lg pr-5 border border-gray-300 text-end">
                7 / 15개
              </td>
              <td className="w-1/4 font-semibold text-lg bg-[#F7F7F7] border border-gray-300 text-center">
                소요시간
              </td>
              <td className="w-1/4 text-lg pr-5 border border-gray-300 text-end">
                2분 30초
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2 pt-8">정오답 표</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white border border-gray-300">
            <tbody className="border">
              {Array.from({ length: Math.ceil(answers.length / 10) }).map(
                (_, pageIndex) => {
                  const pageAnswers = answers.slice(
                    pageIndex * 10,
                    pageIndex * 10 + 10
                  );

                  return (
                    <React.Fragment key={pageIndex}>
                      <tr>
                        {pageAnswers.map((answer, index) => (
                          <td
                            key={`number-${index}`}
                            style={{ width: "10%" }}
                            className="text-center text-base bg-[#F7F7F7] font-semibold py-3 border border-gray-300"
                          >
                            {answer.number}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        {pageAnswers.map((answer, index) => (
                          <td
                            key={`correct-${index}`}
                            style={{ width: "10%" }}
                            className="text-center py-3 border border-gray-300"
                          >
                            {answer.correct ? (
                              <CheckIcon color="success" />
                            ) : (
                              <ClearIcon color="warning" />
                            )}
                          </td>
                        ))}
                      </tr>
                    </React.Fragment>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
);
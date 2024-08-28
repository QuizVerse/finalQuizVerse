import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import LoadingModal from "../../components/modal/LoadingModal";

// 페이지 컴포넌트 정의
const PdfPage = ({ answers }) => (
  <div >
    <div className="overflow-x-auto pt-5 py-8">
      <table className="min-w-full">
        <thead>
          <tr>
            <th
              rowSpan="3"
              className="text-2xl font-bold border border-gray-300 py-6 text-center"
            >
              정보처리기사 2024 기출문제 1-2
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
              우태형
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
            <td className="w-1/4 font-semibold text-lg bg-gray-100 py-3 border border-gray-300 text-center">
              나의 점수
            </td>
            <td
              className="w-1/4 text-lg pr-5 border border-gray-300 text-end"
              colSpan={3}
            >
              50 / 100점
            </td>
          </tr>
          <tr>
            <td className="w-1/4 font-semibold text-lg py-3 bg-gray-100 border border-gray-300 text-center">
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
            <td className="w-1/4 font-semibold text-lg py-3 bg-gray-100 border border-gray-300 text-center">
              정답 문항 수
            </td>
            <td className="w-1/4 text-lg pr-5 border border-gray-300 text-end">
              7 / 15개
            </td>
            <td className="w-1/4 font-semibold text-lg bg-gray-100 border border-gray-300 text-center">
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
        <table className="min-w-full bg-white border border-gray-300">
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
                          className="text-center text-lg bg-gray-100 font-semibold py-3 border border-gray-300"
                        >
                          {answer.number}
                        </td>
                      ))}
                    </tr>
                    <tr>
                      {pageAnswers.map((answer, index) => (
                        <td
                          key={`correct-${index}`}
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
    </div>햣
  </div>
);

export default function ScorePreview() {
  const navigate = useNavigate();
  const printpdf = useRef(null);
  const [loadingVisible, setLoadingVisible] = useState(false);

  const answers = Array.from({ length: 222 }, (_, index) => ({
    number: `${index + 1}번`,
    correct: true,
  }));

  const downloadpdf = async () => {
    setLoadingVisible(true);

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const margin = 10;
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const chunks = Array.from(
      { length: Math.ceil(answers.length / 80) },
      (_, i) => answers.slice(i * 80, i * 80 + 80)
    );

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const container = document.createElement("div");

      ReactDOM.render(<PdfPage answers={chunk} />, container);
      document.body.appendChild(container);

      const canvas = await html2canvas(container, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const imgWidth = pdfWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);

      pdf.setFontSize(10);
      pdf.text(
        `${i + 1} / ${chunks.length}`,
        pdfWidth / 2,
        pdfHeight - margin,
        { align: "center" }
      );

      ReactDOM.unmountComponentAtNode(container);
      document.body.removeChild(container);
    }

    pdf.save("우태형_정보처리기사 2024 기출문제 1-2_성적표.pdf");
    setLoadingVisible(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="">
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outlined" onClick={() => navigate("/book/score")}>
            성적표로 돌아가기
          </Button>
          <Button variant="outlined" onClick={downloadpdf}>
            PDF로 출력
          </Button>
          <Button variant="contained" onClick={() => navigate("/book")}>
            메인으로
          </Button>
        </div>
        <section className="flex flex-col gap-2" ref={printpdf}>
          <PdfPage answers={answers} />
        </section>
      </div>

      <LoadingModal
        open={loadingVisible}
        title="PDF 생성중입니다. 잠시만 기다려주세요."
      />
    </div>
  );
}

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useRef } from "react";

export default function ScorePreview() {
  const navigate = useNavigate();

  const answers = Array.from({ length: 22 }, (_, index) => ({
    number: `${index + 1}번`,
    correct: true,
  }));

  const printpdf = useRef(null);

  const downloadpdf = async () => {
    const element = printpdf.current;
    if (!element) {
      return;
    }

    // 출력화면 해상도 높이기 위한 스케일링
    const canvas = await html2canvas(element, {
      scale: 2,
    });

    const imgData = canvas.toDataURL("image/png");

    // pdf 페이지를 A4 사이즈로 지정
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // PDF 페이지 크기
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    // 여백
    const margin = 5;

    // 이미지 크기 조정 (여백을 고려한 크기)
    const imgWidth = pdfWidth - 2 * margin;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = margin;

    pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight - 2 * margin;

    while (heightLeft > 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", margin, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight - 2 * margin;
    }

    pdf.save("성적표.pdf");
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
          <div>
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
                <div className="overflow-x-auto">
                  <div className="overflow-x-auto">
                    <div className="overflow-x-auto">
                      <div className="overflow-x-auto">
                        <div className="overflow-x-auto">
                          <table className="min-w-full bg-white border border-gray-300">
                            <tbody className="border">
                              {Array.from({
                                length: Math.ceil(answers.length / 10),
                              }).map((_, rowIndex) => {
                                const rowAnswers = answers.slice(
                                  rowIndex * 10,
                                  rowIndex * 10 + 10
                                );

                                return [
                                  <tr key={`numbers-${rowIndex}`}>
                                    {rowAnswers.map((answer, index) => (
                                      <td
                                        key={`number-${index}`}
                                        className="text-center text-lg bg-gray-100 font-semibold py-3 border border-gray-300"
                                      >
                                        {answer.number}
                                      </td>
                                    ))}
                                  </tr>,
                                  <tr key={`corrects-${rowIndex}`}>
                                    {rowAnswers.map((answer, index) => (
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
                                  </tr>,
                                ];
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

// v0 by Vercel.
// https://v0.dev/t/sYs3DjiaYvI

import { Button, Table } from "@mui/material";

export default function ScorePreview() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="">
        <div className="flex justify-end space-x-2 mb-4">
          <Button variant="outlined">성적표로 돌아가기</Button>
          <Button variant="outlined">PDF로 출력</Button>
          <Button variant="contained">메인으로</Button>
        </div>
        <div className="overflow-x-auto pt-5 py-8">
          <table className="min-w-full">
            <thead>
              <tr>
                <th
                  rowSpan="3"
                  className="text-2xl font-bold border border-gray-300 py-6"
                >
                  정보처리기사 2024 기출문제 1-2
                </th>
              </tr>
              <tr>
                <th className="text-sm font-semibold border border-gray-300 py-2">
                  제출일시
                </th>
                <td className="text-sm border border-gray-300 text-center">
                  2024-08-01
                </td>
              </tr>
              <tr>
                <th className="text-sm font-semibold border border-gray-300 py-2">
                  응시자
                </th>
                <td className="text-sm border border-gray-300 text-center">
                  우태형
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">성적</h2>
        {/* <div className="bg-gray-100 p-4 rounded-md border-2 border-gray-300"> */}
        <table className="min-w-full p-4 border-2 border-gray-300">
          <tbody>
            <tr>
              <td className="w-1/4  bg-gray-100 py-3 border border-gray-300 text-center">
                나의 점수
              </td>
              <td
                className="w-1/4  pr-5 border border-gray-300 text-end"
                colSpan={3}
              >
                50 / 100점
              </td>
            </tr>
            <tr>
              <td className="w-1/4 py-3 bg-gray-100 border border-gray-300 text-center">
                백분율 환산 점수
              </td>
              <td
                className="w-1/4 pr-5 border border-gray-300 text-end"
                colSpan={3}
              >
                50점
              </td>
            </tr>
            <tr>
              <td className="w-1/4  py-3 bg-gray-100 border border-gray-300 text-center">
                정답 문항 수
              </td>
              <td className="w-1/4 pr-5 border border-gray-300 text-end">
                7 / 15개
              </td>
              <td className="w-1/4 bg-gray-100 border border-gray-300 text-center">
                소요시간
              </td>
              <td className="w-1/4 pr-5 border border-gray-300 text-end">
                2분 30초
              </td>
            </tr>
          </tbody>
        </table>
        {/* </div> */}
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
                      <tbody>
                        <tr>
                          {Array.from({ length: 10 }, (_, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-center"
                              style={{ width: "100px" }}
                            >
                              {i + 1}번
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 10 }, (_, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-center"
                              style={{ width: "100px" }}
                            >
                              {
                                [
                                  "O",
                                  "X",
                                  "x",
                                  "O",
                                  "x",
                                  "O",
                                  "O",
                                  "O",
                                  "X",
                                  "X",
                                ][i]
                              }
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 10 }, (_, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-center"
                              style={{ width: "100px" }}
                            >
                              {i < 5 ? 11 + i + "번" : ""}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 10 }, (_, i) => (
                            <td
                              key={i}
                              className="px-4 py-2 text-center"
                              style={{ width: "100px" }}
                            >
                              {i < 5 ? ["O", "X", "x", "O", "x"][i] : ""}
                            </td>
                          ))}
                        </tr>
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
  );
}

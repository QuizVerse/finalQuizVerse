import React, { useState } from "react";

export default function QuestionPreview() {
    // 기본 점수를 0점으로 설정
    const [scores, setScores] = useState(Array(17).fill(0)); // 17개의 문제, 초기값은 모두 0점
    const targetTotal = 100; // 총점 목표

    // 점수 입력 핸들러
    const handleScoreInput = (index, newScore) => {
        const updatedScores = [...scores];
        const parsedScore = parseFloat(newScore) || 0.0;

        // 새로운 점수를 입력하기 전에 기존 점수를 제거하고 총점을 계산
        updatedScores[index] = parsedScore;
        const currentTotal = updatedScores.reduce((acc, curr) => acc + curr, 0);

        // 총점이 목표 점수를 초과하지 않는지 확인
        if (currentTotal <= targetTotal) {
            setScores(updatedScores);
        } else {
            // 목표 점수를 초과할 경우 경고 메시지 또는 제한
            alert("총 점수가 목표 점수를 초과할 수 없습니다.");
        }
    };

    // 총점 계산
    const totalScore = scores.reduce((acc, curr) => acc + curr, 0);

    return (
        <div className="w-full max-w-5xl mx-auto p-4">
            <header className="flex items-center justify-between py-2 border-b">
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    <span className="text-lg font-semibold">홍길동</span>
                </div>
                <div className="flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-6 h-6"
                    >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path>
                        <path d="M14 2v4a2 2 0 0 0 2 2h4"></path>
                    </svg>
                    <span className="text-lg font-semibold">
                        총 17 문항 | 총 10 섹션 | 총 {targetTotal} 점
                    </span>
                </div>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-primary/90 h-10 px-4 py-2 bg-yellow-500 text-white">
                    출제하기
                </button>
            </header>
            <main className="mt-4">
                <div className="text-center text-xl font-semibold mb-4">
                    문제 미리보기
                </div>
                {/* 가로 스크롤을 위해 overflow-x-auto 사용 */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2 sticky left-0 bg-gray-100">문항번호</th>
                            {scores.map((_, index) => (
                                <th key={index} className="border p-2">{`${index + 1}번`}</th>
                            ))}
                            <th className="border p-2 sticky right-16 bg-gray-100">현재 배점 합계</th>
                            <th className="border p-2 sticky right-0 bg-gray-100">총점</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className="border p-2 sticky left-0 bg-white">배점</td>
                            {scores.map((score, index) => (
                                <td key={index} className="border p-2">
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            value={score}
                                            onChange={(e) => handleScoreInput(index, e.target.value)}
                                            className="w-12 text-center"
                                        />
                                        <span className="ml-1">점</span>
                                    </div>
                                </td>
                            ))}
                            <td className="border p-2 text-red-500 sticky right-16 bg-white">{totalScore.toFixed(1)}점</td>
                            <td className="border p-2 text-blue-500 sticky right-0 bg-white">{targetTotal}점</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                {/* 문제 섹션 내용 */}
                <section className="mt-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">
                                1 섹션에는 귀여운 문제만 나올 예정입니다.
                            </h2>
                            <span className="text-sm text-gray-500">1 섹션 / 3 섹션</span>
                        </div>
                        <img
                            src="/placeholder.svg"
                            alt="Cute Image"
                            className="w-full max-w-sm mx-auto"
                            width="300"
                            height="200"
                        />
                        <p className="mt-4 text-gray-700">
                            이렇게 귀여운 문제가 관련된 문제로 모여 배정됩니다. 열심히
                            처리해 주세요.
                        </p>
                    </div>
                </section>
                <section className="mt-4">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center space-x-2">
                                <div
                                    className="inline-flex w-fit items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-blue-500 text-white"
                                    data-v0-t="badge"
                                >
                                    Q1
                                </div>
                                <h3 className="text-lg font-semibold">
                                    선택형 문제입니다. 문제 내용이 이렇게 어려운데 풀 수
                                    있습니까?
                                </h3>
                            </div>
                            <span className="text-sm text-gray-500">50점</span>
                        </div>
                        <p className="text-gray-700 mb-4">
                            문제 질문입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                            구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
                            이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
                            예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                            구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
                            이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
                            예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                            구구절절 길어서 이렇게 길게 보일 예정입니다. 구구절절 길어서
                            이렇게 길게 보일 예정입니다. 구구절절 길어서 이렇게 길게 보일
                            예정입니다. 구구절절 길어서 이렇게 길게 보일 예정입니다.
                            구구절절 길어서 이렇게 길게 보일 예정입니다.
                        </p>
                        <img
                            src="/placeholder.svg"
                            alt="Cute Image"
                            className="w-full max-w-sm mx-auto mb-4"
                            width="300"
                            height="200"
                        />
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="option1"
                                    className="form-radio"
                                    name="question1"
                                />
                                <label htmlFor="option1" className="text-gray-700">
                                    답안 1 입니다.
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="option2"
                                    className="form-radio"
                                    name="question1"
                                />
                                <label htmlFor="option2" className="text-gray-700">
                                    답안 2 입니다.
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    id="option3"
                                    className="form-radio"
                                    name="question1"
                                />
                                <label htmlFor="option3" className="text-gray-700">
                                    답안 3 입니다.
                                </label>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-4">
                    <div className="bg-blue-50 p-4 rounded-md">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">
                                2섹션에는 귀여운 문제만 나올 예정입니다.
                            </h2>
                            <span className="text-sm text-gray-500">2 섹션 / 3 섹션</span>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

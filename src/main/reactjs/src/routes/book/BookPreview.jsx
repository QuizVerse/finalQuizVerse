// v0 by Vercel.
// https://v0.dev/t/740lQclozuU

export default function BookPreview() {
  return (

  <main className="flex flex-col items-center w-full p-4 space-y-4">
    <div className="w-full max-w-4xl p-4 bg-white border rounded-md">
      <h1 className="text-2xl font-bold text-center">
        정보처리기사 2024 기출문제 1-2
      </h1>
      <div className="flex justify-between mt-4">
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">출제자</span>
          <span className="text-lg">박민지</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">응시자</span>
          <span className="text-lg">홍길동</span>
        </div>
      </div>
    </div>
    <div className="w-full max-w-4xl p-4 bg-white border rounded-md">
      <table className="w-full text-center border-collapse">
        <thead>
        <tr>
          <th className="p-2 border">전체 문항수</th>
          <th className="p-2 border">현재 문항수</th>
          <th className="p-2 border">총점</th>
          <th className="p-2 border">시간 제한</th>
          <th className="p-2 border">카테고리</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td className="p-2 border">20 문항</td>
          <td className="p-2 border">10 문항</td>
          <td className="p-2 border">100점</td>
          <td className="p-2 border">60분</td>
          <td className="p-2 border">취업/자격증</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div className="w-full max-w-4xl p-4 bg-white border rounded-md">
      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium">1 섹션 / 3 섹션</span>
        <span className="text-sm font-medium">50점</span>
      </div>
      <div className="p-4 bg-blue-100 rounded-md">
        <p className="mb-4">1 섹션에는 귀여운 문제를 내보았습니다.</p>
        <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-48 h-48 mx-auto"
            width="200"
            height="200"
        />
      </div>
      <div className="mt-4">
        <p className="mb-4">
          선택형 문제입니다. 문제 내용이 여기에 입력되면 좋을 수 있습니다?
        </p>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-1"/>
            <span>답변 1입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-1"/>
            <span>답변 2입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-1"/>
            <span>답변 3입니다.</span>
          </label>
        </div>
      </div>
    </div>
    <div className="w-full max-w-4xl p-4 bg-white border rounded-md">
      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium">2 섹션 / 3 섹션</span>
        <span className="text-sm font-medium">50점</span>
      </div>
      <div className="p-4 bg-blue-100 rounded-md">
        <p className="mb-4">2 섹션에는 귀여운 문제를 내보았습니다.</p>
        <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-48 h-48 mx-auto"
            width="200"
            height="200"
        />
      </div>
      <div className="mt-4">
        <p className="mb-4">
          선택형 문제입니다. 문제 내용이 여기에 입력되면 좋을 수 있습니다?
        </p>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-2"/>
            <span>답변 1입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-2"/>
            <span>답변 2입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-2"/>
            <span>답변 3입니다.</span>
          </label>
        </div>
      </div>
    </div>
    <div className="w-full max-w-4xl p-4 bg-white border rounded-md">
      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium">3 섹션 / 3 섹션</span>
        <span className="text-sm font-medium">50점</span>
      </div>
      <div className="p-4 bg-blue-100 rounded-md">
        <p className="mb-4">3 섹션에는 귀여운 문제를 내보았습니다.</p>
        <img
            src="/placeholder.svg"
            alt="Placeholder"
            className="w-48 h-48 mx-auto"
            width="200"
            height="200"
        />
      </div>
      <div className="mt-4">
        <p className="mb-4">
          선택형 문제입니다. 문제 내용이 여기에 입력되면 좋을 수 있습니다?
        </p>
        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-3"/>
            <span>답변 1입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-3"/>
            <span>답변 2입니다.</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="radio" name="question-3"/>
            <span>답변 3입니다.</span>
          </label>
        </div>
      </div>
    </div>
  </main>

)
  ;
}

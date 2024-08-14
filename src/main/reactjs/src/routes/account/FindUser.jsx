// v0 by Vercel.
// https://v0.dev/t/Um0kKeG105U

export default function FindUser() {
    return (
        <main className="flex flex-col items-center justify-center flex-1 w-full px-4 py-8">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6 text-center">
              <h3 className="whitespace-nowrap tracking-tight text-lg font-bold">회원정보 조회</h3>
              <p className="text-sm text-muted-foreground">이메일을 입력하여 가입여부가 있는 회원인지 조회할 수 있습니다.</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                >
                  Email
                </label>
                <input
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    id="email"
                    placeholder="이메일을 입력해주세요."
                />
              </div>
            </div>
            <div className="flex items-center p-6">
              <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                조회
              </button>
            </div>
          </div>
        </main>
    );
}
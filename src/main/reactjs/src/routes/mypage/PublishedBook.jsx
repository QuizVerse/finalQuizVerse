// v0 by Vercel.
// https://v0.dev/t/dHZziAi3ddS

import BookCard from "../../components/BookCard";
import Q from "../../image/Q.jpg";
import W from "../../image/W.jpg";
import E from "../../image/E.jpg";
import R from "../../image/R.jpg";

export default function PublishedBook() {
  return (
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">나의 출제이력</h1>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            문제집 출제하기
          </button>
        </div>
        <div className="flex items-center mb-6 space-x-4">
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
            placeholder="Name, email, etc..."
          />
          <button
            type="button"
            role="combobox"
            aria-controls="radix-:Rilufnnkr:"
            aria-expanded="false"
            aria-autocomplete="none"
            dir="ltr"
            data-state="closed"
            data-placeholder=""
            className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span>등록일순</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-chevron-down h-4 w-4 opacity-50"
              aria-hidden="true"
            >
              <path d="m6 9 6 6 6-6"></path>
            </svg>
          </button>
          <select
            aria-hidden="true"
            tabindex="-1"
          >
            <option value=""></option>
          </select>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <BookCard cardType="B" className={"flex-1"} 
              photo={Q}
              createDate={"1998-11-01"} nickname={"홍지혜"} 
              title={"Q"} category={" 드럼 / 리다"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={W}
              createDate={"1997-06-02"} nickname={"이아희"} 
              title={"W"} category={" 베이스 / 4줄기타"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={E}
              createDate={"2001-01-30"} nickname={"장나영"} 
              title={"E"} category={" 기타 / 메인기타"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={R}
              createDate={"2000-05-16"} nickname={"이시연"} 
              title={"R"} category={" 보컬 / 서브기타"}
               />
               <BookCard cardType="B" className={"flex-1"} 
              photo={R}
              createDate={"2000-05-16"} nickname={"이시연"} 
              title={"R"} category={" 보컬 / 서브기타"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={E}
              createDate={"2001-01-30"} nickname={"장나영"} 
              title={"E"} category={" 기타 / 메인기타"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={W}
              createDate={"1997-06-02"} nickname={"이아희"} 
              title={"W"} category={" 베이스 / 4줄기타"}
               />
              <BookCard cardType="B" className={"flex-1"} 
              photo={Q}
              createDate={"1998-11-01"} nickname={"홍지혜"} 
              title={"Q"} category={" 드럼 / 리다"}
               />
          </div>
        <div className="flex justify-center mt-6 space-x-2">
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            1
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            2
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            3
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            4
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            5
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            6
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            7
          </button>
          <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-5 h-5"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </main>
  );
}

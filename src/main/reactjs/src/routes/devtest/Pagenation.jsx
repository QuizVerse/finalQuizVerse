// Pagination.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ITEMS_PER_PAGE = 10;
const SPACING = 2;

// pagenation할 자료
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

const Pagenation = () => {
  // pagenation에 필요한 변수
  const [page, setPage] = useState(1);
  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  /**
   * @description : pagenation에 필요한 함수
  * */
  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* pagenation 적용할 리스트 */}
      {currentItems &&
          currentItems.map((item, index) => (
              <article key={index} className="item">
                <h3>{item}</h3>
              </article>
      ))}

      {/* pagenation 버튼 */}
      <div className={"flex justify-center mt-4"}>
        <Stack spacing={SPACING}>
          <Pagination
              count={pageCount}
              page={page}
              onChange={handleChange}
              showFirstButton
              showLastButton
          />
        </Stack>
      </div>
    </div>
  );
};

export default Pagenation;

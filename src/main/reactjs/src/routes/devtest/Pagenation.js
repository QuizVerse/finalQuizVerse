// Pagination.js

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ITEMS_PER_PAGE = 10;
const SPACING = 2;

const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

function Items({ currentItems }) {
  return (
    <div className="items-list">
      {currentItems &&
        currentItems.map((item, index) => (
          <article key={index} className="item">
            <h3>{item}</h3>
          </article>
        ))}
    </div>
  );
}

const Pagenation = () => {
  const [page, setPage] = useState(1);

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo(0, 0);
  };

  const itemOffset = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = items.slice(itemOffset, itemOffset + ITEMS_PER_PAGE);
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);

  return (
    <div>
      <Items currentItems={currentItems} />
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
  );
};

export default Pagenation;

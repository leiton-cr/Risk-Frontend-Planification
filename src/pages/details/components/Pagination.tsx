import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

interface PaginationCustomProps {
  totalResult: number;
  maxButtons?: number;
  onPageChange: (pageNumber: number) => void;
  activePage: number;
}

export default function PaginationCustom({
  totalResult,
  maxButtons = 5,
  onPageChange,
  activePage,
}: PaginationCustomProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  let startPage: number, endPage: number, records: number;
  const [defaultStyle] = useState("btn btn-secondary border border-0 btn-sm me-1");
  records = totalResult;

  totalResult = Math.ceil(totalResult / 10);

  useEffect(() => {
    setCurrentPage(activePage);
  }, [activePage]);

  if (totalResult <= maxButtons) {
    startPage = 1;
    endPage = totalResult;
  } else {
    const middle = Math.floor(maxButtons / 2);
    if (currentPage <= middle) {
      startPage = 1;
      endPage = maxButtons;
    } else if (currentPage + middle >= totalResult) {
      startPage = totalResult - maxButtons + 1;
      endPage = totalResult;
    } else {
      startPage = currentPage - middle;
      endPage = currentPage + middle;
    }
  }

  const pages =
    endPage >= startPage
      ? [...Array(endPage - startPage + 1)].map((_, i) => startPage + i)
      : [];

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  }

  const activeButtonStyle: React.CSSProperties = {
    backgroundColor: "#f8403d",
    color: "white",
  };


  return (
    <>
      {totalResult > 1 && (
        <div style={{ marginTop: "10px", marginBottom: "10px" }}>
          <p style={{ margin: "10px 10px 10px 10px" }}>
            {records ? "Showing " + records + " records" : "No results"}
          </p>
          {currentPage > 1 && (
            <button
              className={defaultStyle}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;&lt;
            </button>
          )}
          {startPage > 1 && (
            <button  className={defaultStyle} onClick={() => handlePageChange(1)}>1</button>
          )}
          {startPage > 2 && <button  className={defaultStyle} disabled>...</button>}
          {pages.map((page) => (
            <button
              className={defaultStyle}
              key={page}
              style={currentPage === page ? activeButtonStyle : {}}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          {endPage < totalResult - 1 && <button   className={defaultStyle} disabled>...</button>}
          {endPage < totalResult && (
            <button
              className={defaultStyle}
              onClick={() => handlePageChange(totalResult)}
            >
              {totalResult}
            </button>
          )}
          {currentPage < totalResult && (
            <button
              className={defaultStyle}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;&gt;
            </button>
          )}
        </div>
      )}
    </>
  );
}

PaginationCustom.defaultProps = {
  maxButtons: 5,
};

PaginationCustom.propTypes = {
  totalResult: PropTypes.number.isRequired,
  maxButtons: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  activePage: PropTypes.number.isRequired,
};

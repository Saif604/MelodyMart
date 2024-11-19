import React from "react";
import { Pagination as BsPagination, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updatePage } from "../features/AllProducts/productsSlice";
const Pagination = () => {
  const dispatch = useDispatch();
  const { pages,page } = useSelector((state) => state.products);
  const handlePageChange = (currPage) => {
    if (currPage >= 1 && page <= pages) {
      dispatch(updatePage(currPage));
    }
  };
  return (
    <Row>
      <Col className="d-flex justify-content-center">
        {/* Pagination */}
        <BsPagination>
          <BsPagination.Prev
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          />

          {/* Render initial page */}
          <BsPagination.Item
            onClick={() => handlePageChange(1)}
            active={page === 1}
          >
            {1}
          </BsPagination.Item>

          {/* Ellipsis if more than 3 pages away */}
          {page > 3 && <BsPagination.Ellipsis />}

          {/* Middle page numbers, only showing range around current page */}
          {Array.from({ length: 3 }, (_, i) => {
            const pageNumber = page - 1 + i;
            if (pageNumber > 1 && pageNumber < pages) {
              return (
                <BsPagination.Item
                  key={pageNumber}
                  active={pageNumber === page}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </BsPagination.Item>
              );
            }
            return null;
          })}

          {/* Ellipsis if more than 3 pages remaining */}
          {page < pages - 2 && <BsPagination.Ellipsis />}

          {/* Render final page */}
          {pages !== 1 && (
            <BsPagination.Item
              onClick={() => handlePageChange(pages)}
              active={page === pages}
            >
              {pages}
            </BsPagination.Item>
          )}

          <BsPagination.Next
            onClick={() => handlePageChange(page + 1)}
            disabled={page === pages}
          />
        </BsPagination>
      </Col>
    </Row>
  );
};
export default Pagination;

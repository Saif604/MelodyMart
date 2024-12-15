import { styled } from "styled-components";
import { Table } from "react-bootstrap";
import React, { useState } from "react";

const DataTable = ({ columns, data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState(null);
  const handleSort = (field) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.field === field &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    const sortedArray = [...sortedData].sort((a, b) => {
      if (a[field] < b[field]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sortedArray);
    setSortConfig({ field, direction });
  };
  return (
    <Wrapper>
      <Table striped hover responsive>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} onClick={() => handleSort(col.field)}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => {
                if (col.field === "image") {
                  return (
                    <td key={colIndex}>
                      <img src={row[col.field]} alt="img" className="table-img"/>
                    </td>
                  );
                }
                return <td key={colIndex}>{row[col.field]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </Wrapper>
  );
};

export default DataTable;

const Wrapper = styled.div`
  .table-img {
    width: 36px;
    height: 36px;
    display: block;
    object-fit: cover;
    border-radius: 4px;
  }
  .ibtn {
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border: 4px;
    color: var(--dark);
    transition: var(--transition);
    background: transparent;
    border: 1px solid var(--gray-400);
    opacity: 0;
  }
  .ibtn:hover{
    color:var(--primary-dark-500);
    background: var(--primary-dark-100);
  }
  .dbtn:hover {
    color: var(--primary-light-500);
    background: var(--primary-light-100);
  }
  thead tr th {
    background: var(--primary-dark-600);
    color: var(--light);
    cursor: pointer;
  }
  th,
  td {
    padding: 15px;
    text-align: left;
    text-transform: capitalize;
    vertical-align: middle;
  }
  tbody tr:nth-child(even) {
    background: #f2f2f2;
  }
  tbody tr:hover {
    background: #e9e9e9;
    .ibtn {
      opacity: 1;
    }
  }
`;

import React, { useState } from 'react';
import '../styles/Table.scss'; // Import your CSS file

const TableWithPagination = ({ data, itemsPerPage, modTable, remove }) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  
  const currentPageData = data.slice(startIndex, endIndex);
  
  const goToPage = (page) => {
    setCurrentPage(page);
  };
  const removeEmp = e=>{
    modTable(prev=> prev.filter(i=> i.employeeId !== e))
  }

  return (
    <div className="table-container"> {/* Apply a container class */}
      <table>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Employee Id</th>
            <th>Department</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Designation</th>
            <th>Date of join</th>
            <th>Salary</th>
            <th>Action</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {/* Render rows for the current page */}
          {currentPageData.map((item, index) => (
            <tr key={index}>
              <td>{item.employeeName}</td>
              <td>{item.employeeId}</td>
              <td>{item.department}</td>
              <td>{item.dob}</td>
              <td>{item.gender}</td>
              <td>{item.designation}</td>
              <td>{item.joinDate}</td>
              <td>{item.salary}</td>
              <td><button onClick={()=>{
                removeEmp(item.employeeId)
                remove(p=>[...p, item.employeeId])
                }}>Remove</button></td>
              {/* Render more columns as needed */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="pagination"> {/* Apply a class for pagination */} 
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default TableWithPagination;

// Example usage:
// const data = [
//   { column1: 'Data 1-1', column2: 'Data 1-2' },
//   { column1: 'Data 2-1', column2: 'Data 2-2' },
//   // Add more data objects as needed
// ];

// const App = () => {
//   return (
//     <div>
//       <h1>Table with Pagination</h1>
//       <TableWithPagination data={data} itemsPerPage={5} />
//     </div>
//   );
// };

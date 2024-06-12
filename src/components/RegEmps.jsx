import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/styles.scss"
import "../styles/formStyle.scss"
import ValidDateRange from './ValidDateRange';
import TableWithPagination from './EmpTable2'; // RegEmps should only use EmpTable2.jsx not EmpTable.jsx

const FormComponent = () => {
  const [formData, modFormData] = useState({
    employeeName: '',
    employeeId: '',
    department: '',
    dob: '',
    gender: '',
    designation: '',
    salary: '',
  });
  let [table, modTable]= useState([])
  const handleChange = (e) => {
    const { name, value } = e.target;
    modFormData({ ...formData, [name]: value });
  };
  var [mnInpDt, mxInpDt] = ValidDateRange()
  useEffect(()=>{
    mnInpDt= ValidDateRange()[0]
    mxInpDt= ValidDateRange()[1]
  },[])
  
  const addEmp = async (e) => {
    e.preventDefault();
    let c1= formData.employeeId ==="" || formData.employeeName ==="" || formData.dob===""||formData.gender===""||formData.designation===""||formData.salary===""||formData.department==="",
    c2= formData.employeeName.length <3 || formData.employeeName.length >50,
    c3= Number(formData.salary) > 10000000 || Number(formData.salary<0),
    c4= /^[0-9]+$/.test(formData.employeeId),
    c5= /^[a-zA-Z\s]+$/.test(formData.employeeName)
    if (c1) alert("all form fields are mandatory")
    else if (c2) alert("employee name must be within range of 4 - 50 characters")
    else if (!/^[0-9]+$/.test(formData.salary)) alert("salary must be only in positive numerals")
    else if (c3) alert("salary out of bounds")
    else if (!c4) alert("employee id can only be numeral")
    else if (!c5) alert("No numerals or special chars allowed")
    else{
  modTable(prev=> [...prev, formData])
    modFormData({
      employeeName: '',
      employeeId: '',
      department: '',
      dob: '',
      gender: '',
      designation: '',
      salary: '',
    })
  }
    
  };
  
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('https://employee-mgmt-bkend-1.onrender.com/register-emps/', table);
      modTable([])
      alert("Successfully registered in database")
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  return (<>
    <form onSubmit={addEmp}>
      <div className='form-group'>
        <label className="label">Employee name:</label>
        <input className="input" type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label className="label">Employee id:</label>
        <input className="input" type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label className="label">Department:</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="department1">Department1</option>
          <option value="department2">Department2</option>
          <option value="department3">Department3</option>
        </select>
      </div>
      <div className='form-group'>
        <label className="label">DoB:</label>
        <input className="input" type="date" min={mnInpDt} max={mxInpDt} name="dob" value={formData.dob} onChange={handleChange} />
      </div>
      <div className='form-group'>
        <label className="label">Gender:</label>
        <label>
          <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
          Female
        </label>
      </div>
      <div className='form-group'>
        <label className='label'>Designation:</label>
        <select name="designation" value={formData.designation} onChange={handleChange}>
          <option value="">Select Designation</option>
          <option value="Software engineer">Software engineer</option>
          <option value="Mobile app development">Mobile app development</option>
          <option value="Web developer">Web developer</option>
          <option value="ML analyst">ML analyst</option>
          <option value="System admin">System admin</option>
        </select>
        {/* <input className="input" type="text" name="designation" value={formData.designation} onChange={handleChange} /> */}
      </div>
      <div className='form-group'>
        <label>Salary:</label>
        <input className="input" type="text" name="salary" value={formData.salary} onChange={handleChange} />
      </div>
      <button className="submit-button" type="submit">Add</button>
    </form>
    <br />
    <div className="table">
      <TableWithPagination data={table} itemsPerPage={5} modTable={modTable}/>
      
          </div> 
          <br />
          <button onClick={sendDataToBackend}>Submit</button>
    
    </>);
};

export default FormComponent;
/* <table>
        <tr>
          <th>Employee id</th>
          <th>Employee name</th>
          <th>Department</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Designation</th>
          <th>Salary</th>
        </tr>
        {table.map(i=>{
      let {employeeId, employeeName, department, dob, gender, designation, salary}= i
      return(<tr className='emp'key={employeeId}>
        <td>{employeeId}</td>
        <td>{employeeName}</td>
        <td>{department}</td>
        <td>{dob}</td>
        <td>{gender}</td>
        <td>{designation}</td>
        <td>{salary}</td>
        <td><button onClick={()=>removeEmp(employeeId)}>Remove</button></td>
      </tr>)
    })}
      </table>*/
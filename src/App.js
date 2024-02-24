import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles.scss"
import "./formStyle.scss"
import TableWithPagination from './Table';
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

  const addEmp = async (e) => {
    e.preventDefault();
    let c1= formData.employeeId ==="" || formData.employeeName ==="" || formData.dob===""||formData.gender===""||formData.designation===""||formData.salary==="",
    c2= formData.employeeName.length <8,
    c3= Number(formData.salary) > 10000000
    if (c1) alert("all form fields are mandatory")
    else if (c2) alert("minimum 8 characters needed for employee name")
    else if (c3) alert("salaryout of bounds")
    else{
  modTable(prev=> [...prev, formData])
    modFormData({
      employeeName: '',
      employeeId: '',
      department: 'Department1',
      dob: '',
      gender: '',
      designation: '',
      salary: '',
    })
  }
    
  };
  
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/target/', table);
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
          <option value="department1">Department 1</option>
          <option value="department2">Department 2</option>
          <option value="department3">Department 3</option>
        </select>
      </div>
      <div className='form-group'>
        <label className="label">DoB:</label>
        <input className="input" type="date" name="dob" value={formData.dob} onChange={handleChange} />
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
        <label>Designation:</label>
        <input className="input" type="text" name="designation" value={formData.designation} onChange={handleChange} />
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
      {/* <table>
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
      </table>*/}
          </div> 
          <br />
          <button onClick={sendDataToBackend}>Submit</button>
    
    </>);
};

export default FormComponent;

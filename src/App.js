import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./styles.scss"

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
    try {
      // // Send post request to server
      // let res= await axios.post('http://localhost:8000/target/', formData);
      // // Redirect to dashboard on success
      // console.log(res)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const removeEmp = e=>{
    modTable(prev=> prev.filter(i=> i.employeeId != e))
  }
  const sendDataToBackend = async () => {
    try {
      const response = await axios.post('http://localhost:8000/target/', table);
      modTable([])
      console.log(response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };
  return (<>
    <form onSubmit={addEmp}>
      <div>
        <label>Employee name:</label>
        <input type="text" name="employeeName" value={formData.employeeName} onChange={handleChange} />
      </div>
      <div>
        <label>Employee id:</label>
        <input type="text" name="employeeId" value={formData.employeeId} onChange={handleChange} />
      </div>
      <div>
        <label>Department:</label>
        <select name="department" value={formData.department} onChange={handleChange}>
          <option value="department1">Department 1</option>
          <option value="department2">Department 2</option>
          <option value="department3">Department 3</option>
        </select>
      </div>
      <div>
        <label>DoB:</label>
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </div>
      <div>
        <label>Gender:</label>
        <label>
          <input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
          Female
        </label>
      </div>
      <div>
        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
      </div>
      <div>
        <label>Salary:</label>
        <input type="text" name="salary" value={formData.salary} onChange={handleChange} />
      </div>
      <button type="submit">Add</button>
    </form>
    <div className="table">
      <table>
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
      </table>
          </div>
          <button onClick={sendDataToBackend}>Submit</button>
    
    </>);
};

export default FormComponent;

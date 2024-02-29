import axios from "axios";
import React, { useEffect, useState } from "react";
import EmpTable from "./EmpTable" // ManageEmps should only use EmpTable.jsx not EmpTable2.jsx
import empFilter from "./empFilter";

export default function(){
    let [dbData, setDbData]= useState([])
    let [filtered, filterEmps]= useState([])
    let [removed, remove]= useState([])
    const [formData, modFormData] = useState({
        employeeName: '',
        department: '',
        dob:'',
        gender: '',
        designation: '',
        salary: '',
        fromJoin:'',
        toJoin:''
    })
    useEffect(()=>{
        const getEmps = async ()=>{
            const response= await axios.get("http://localhost:8000/get-emps")
            setDbData(response.data)
        }
        getEmps()
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        modFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        empFilter(formData, filterEmps)
    };
    
    const alterEmps = async ()=>{
        if (removed.length==0) alert("Nothing is set to remove")
        else{
          const response = await axios.post("http://localhost:8000/alter-emps/", {rmList: removed})
          setDbData(response.data) 
          alert("Employees successfully removed from DB")
        }
        
    }
    // useEffect(()=>{console.log(dbData)}, [dbData])
return<>
    <form className="my-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">By Name (regex):</label>
        <input type="text" id="name" name="employeeName" value={formData.name} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="department">By Department:</label>
        <select id="department" name="department" value={formData.department} onChange={handleChange}>
          <option value="">Select Department</option>
          <option value="department1">Department1</option>
          <option value="department2">Department2</option>
          <option value="department3">Department3</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="dob">Date of birth</label>
        <input type="text" id="dob" name="dob" value={formData.dob} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor="fromDate">From Join Date:</label>
        <input type="date" id="fromDate" name="fromJoin" value={formData.fromJoin} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="toDate">To Join Date:</label>
        <input type="date" id="toDate" name="toJoin" value={formData.toJoin} onChange={handleChange} />
      </div>
      <div className="form-group">
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
      <div className="form-group">
        <label htmlFor="designation">Designation:</label>
        <select id="designation" name="designation" value={formData.designation} onChange={handleChange}>
          <option value="">Select Designation</option>
          <option value="Software engineer">Software engineer</option>
          <option value="Mobile app development">Mobile app development</option>
          <option value="Web developer">Web developer</option>
          <option value="ML analyst">ML analyst</option>
          <option value="System admin">System admin</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="salary">Salary:</label>
        <input type="text" id="salary" name="salary" value={formData.salary} onChange={handleChange} />
      </div>
      <button type="submit">Filter</button> <button type="button" onClick={()=>filterEmps(dbData)}>All employees</button>
    </form>
    <br /><br />
    <EmpTable data={filtered} itemsPerPage={4} modTable={filterEmps} remove={remove}/>
    <button type="button" onClick={alterEmps}>Remove in DB</button>
</>
}
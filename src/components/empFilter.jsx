import React from "react";
export default function(formData, filterEmps){
    filterEmps(emps =>emps.filter(emp=>{
        let b1= ()=> emp.gender.toLowerCase() === formData.gender.toLowerCase(),
        b2= ()=> emp.department.toLowerCase() === formData.department.toLowerCase(),
        b3= ()=> emp.designation.toLowerCase() === formData.designation.toLowerCase()

        let b4= ()=>{
            let fdt= new Date(formData.fromDate), tdt= new Date(formData.toDate)
            return emp.dob >= fdt && emp.dob <= tdt
        }
        let b5= ()=> {
            return (new RegExp(formData.employeeName.toLowerCase()).test(emp.employeeName.toLowerCase()))
        }
        if (formData.gender){
            if (!b1()) return false
        }
        if (formData.department){
            if (!b2()) return false
        }
        if (formData.designation){
            if (!b3()) return false
        }
        if (formData.fromDate && formData.toDate){
            if (!b4()) return false
        }
        if (formData.employeeName){
            if (!b5()) return false
        }
        return true
    }))
}
/*
filterEmps is a setState function
is this function logic ok:
export default function(formData, filterEmps){
    filterEmps(emp =>{
        let b1= ()=> emp.gender.toLowerCase() === formData.gender.toLowerCase(),
        b2= ()=> emp.department.toLowerCase() === formData.department.toLowerCase(),
        b3= ()=> emp.designation.toLowerCase() === formData.designation.toLowerCase()

        let b4= ()=>{
            let fdt= new Date(formData.fromDate), tdt= new Date(formData.toDate)
            return emp.dob >= fdt && emp.dob <= tdt
        }
        let b5= emp.employeeName.toLowerCase().includes(formData.employeeName)
        if (formData.gender){
            if (!b1()) return false
        }
        if (formData.department){
            if (!b2()) return false
        }
        if (formData.designation){
            if (!b3()) return false
        }
        if (formData.fromDate && formData.toDate){
            if (!b4()) return false
        }
        if (formData.employeeName){
            if (!b5()) return false
        }
        return true
    })
}

*/
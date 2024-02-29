import React from "react";
export default function(formData, filterEmps){
    filterEmps(emps =>emps.filter(emp=>{
        const checkRange = (val)=> /^[0-9]+-[0-9]+/.test(val)
        let b1= ()=> emp.gender.toLowerCase() === formData.gender.toLowerCase(),
        b2= ()=> emp.department.toLowerCase() === formData.department.toLowerCase(),
        b3= ()=> emp.designation.toLowerCase() === formData.designation.toLowerCase()

        let b4= ()=>{
            let fdt= new Date(formData.fromJoin), tdt= new Date(formData.toJoin)
            return new Date(emp.joinDate) >= fdt && new Date(emp.joinDate) <= tdt
        }
        let b5= ()=>{
            if (checkRange(formData.dob)){
                let [to, from]= formData.dob.split("-").map(i=>+i)
                let fdt= new Date(), tdt= new Date()
                fdt.setFullYear(fdt.getFullYear()-from)
                tdt.setFullYear(tdt.getFullYear()-to)
                return new Date(emp.dob) >=fdt && new Date(emp.dob) <= tdt
            }
        }
        let b6= ()=>{
            if (checkRange(formData.salary)){
                let [from, to]= formData.salary.split("-").map(i=>+i)
                return +emp.salary >= from && +emp.salary <= to
            }
        }
        let b7= ()=> {
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
        if (formData.fromJoin && formData.toJoin){
            if (!b4()) return false
        }
        if (formData.dob){
            if (!b5()) return false
        }
        if (formData.salary){
            if (!b6()) return false
        }
        if (formData.employeeName){
            if (!b7()) return false
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
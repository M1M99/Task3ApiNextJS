'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

function GetById() {
    let { id } = useParams();
    const [student, setStudent] = useState(null);
    useEffect(() => {
        fetch(`/api/students/${id}`).then(res => res.json())
            .then(data => { setStudent(data); console.log(data) })
    }, [id])
    if (!student) return <p>Loading...</p>;
    return (
        <div>
            <h2>{student.firstname} {student.lastname}</h2>
            <p>Grade: {student.Grade}</p>
            <p>Percentage: {student.percentage}%</p>
        </div>
    )
}

export default GetById

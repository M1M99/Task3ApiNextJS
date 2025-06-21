'use client'
import { useEffect, useState } from "react"
import styles from "../styles/main.module.css"
import Link from "next/link";

export default function Students() {
    const [students, setStudents] = useState([])
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [grade, setGrade] = useState("");
    const [percentage, setPercentage] = useState("");
    const [formVisible, setFormVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    //#region PUT
    async function handlePut(data) {
        try {
            const res = await fetch(`/api/students/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const result = await res.json();
            console.log("PUT res:", result);
            await getAllData();  
        } catch (err) {
            console.error("Error:", err);
        }
    }

    //#endregion 

    //#region GET All Students
    async function getAllData() {
        try {
            const res = await fetch("/api/students");
            const data = await res.json();
            console.log(data);
            setStudents(data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAllData()
    }, [])
    //#endregion

    //#region DELETE
    async function handleDelete(id) {
        await fetch(`/api/students?id=${id}`, { method: "DELETE" });
        getAllData();
    }
    //#endregion

    //#region POST
    async function handlePost(data) {
        await fetch("/api/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(result => { console.log("POST Error:", result); getAllData() })
            .catch(err => console.error("Error:", err));
    }

    //#endregion
    async function handleSubmit(e) {
        e.preventDefault();
        const payload = { firstname, lastname, Grade: grade, percentage: Number(percentage) };

        if (isEditing) {
            await handlePut(payload);
            setIsEditing(false);
            setEditId(null);
        } else {
            await handlePost(payload);
        }

        setFirstname("");
        setLastname("");
        setGrade("");
        setPercentage("");
        setFormVisible(false);
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px", margin: "3px" }}>
            {students.map((data) => (
                <li key={data.id} style={{ listStyleType: "none" }}>
                    <Link href={`/students/${data.id}`} style={{ listStyleType: "none" }}>
                        <strong>{data.id}.</strong> {data.lastname} {data.firstname}
                    </Link>
                    <button onClick={() => handleDelete(data.id)} style={{ fontFamily: "monospace", borderRadius: "3px", padding: "2px 5px", margin: "5px", cursor: "pointer", backgroundColor: "darkgoldenrod" }}>DELETE</button>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setFormVisible(!formVisible);
                            setIsEditing(true);
                            setEditId(data.id);
                            setFirstname(data.firstname);
                            setLastname(data.lastname);
                            setGrade(data.Grade);
                            setPercentage(data.percentage);
                        }}
                        style={{ marginLeft: "5px", backgroundColor: "#008cff", color: "white", padding: "2px 5px", borderRadius: "3px", cursor: "pointer" }}
                    >
                        {!formVisible ? "Edit" : "Close"}
                    </button>
                </li>

            ))}
            <button style={{ padding: "3px 5px", backgroundColor: "gray", border: "1.3px solid", borderRadius: "4px", cursor: "pointer" }} onClick={() => setFormVisible(!formVisible)}>{!formVisible ? 'Add New Student' : 'Close'}</button>
            {formVisible &&
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "10px" }}>
                    <input className={styles.inputs} type="text" placeholder="Firstname" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                    <input className={styles.inputs} type="text" placeholder="Lastname" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
                    <input className={styles.inputs} type="text" placeholder="Grade" value={grade} onChange={(e) => setGrade(e.target.value)} required />
                    <input className={styles.inputs} type="number" placeholder="Percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} required />
                    <button
                        type="submit"
                        style={{
                            padding: "5px",
                            backgroundColor: isEditing ? "#ffa500" : "springgreen",
                            borderRadius: "3px",
                            border: "1px solid",
                            cursor: "pointer"
                        }}
                    >
                        {isEditing ? "Update Student" : "Add New Student"}
                    </button>

                </form>}
        </div>
    )
}
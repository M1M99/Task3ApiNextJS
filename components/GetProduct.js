'use client'

import { useEffect, useState } from "react";

export default function GetProduct() {
    const [prod , setProd] = useState([]);
    
    const GetAll = () => {
        fetch("/api/products")
        .then((res) => res.json())
        .then(a => {setProd(a);})
    }
    useEffect(() => {
        GetAll();
    },[])

    return (
        <div>
            {prod.map((a) => (
                <p>{a.id}-{a.title}-{a.desc}</p>
            ))}
        </div>
    )
}
const students = [
    { id: 1, lastname: "Hajiyev", firstname: "Haji", Grade: "A+", percentage: 98 },
    { id: 2, lastname: "Talibov", firstname: "Ali", Grade: "A-", percentage: 91 },
    { id: 3, lastname: "Doe", firstname: "Kenan", Grade: "B+", percentage: 88 },
    { id: 4, lastname: "Nesibzade", firstname: "Arif", Grade: "D+", percentage: 68 }
];

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
        const student = students.find(s => String(s.id) === id);
        if (!student) {
            return Response.json({ status: 404 });
        }
        return Response.json(student);
    }

    return Response.json(students);
}

export async function DELETE(req) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        const index = students.findIndex(s => String(s.id) === id);
        if (index === -1) {
            return Response.json({ message: "Not Found" }, { status: 404 });
        }
        students.splice(index, 1)
        return Response.json({ message: "Deleted" },{status:201});
    }
    return Response.json(students);
}

export async function POST(req) {
    const body = await req.json();
    const { firstname, lastname, Grade, percentage } = body;

    if (!firstname || !lastname || !Grade || percentage === undefined) {
        return new Response(JSON.stringify({ message: "Missing fields" }), { status: 400 });
    }

    const newStudent = {
        id: students.length + 1,
        firstname,
        lastname,
        Grade,
        percentage
    };

    students.push(newStudent);

    return new Response(JSON.stringify(newStudent), { status: 201 });
}
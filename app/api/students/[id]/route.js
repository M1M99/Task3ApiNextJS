const students = [
  { id: 1, lastname: "Hajiyev", firstname: "Haji", Grade: "A+", percentage: 98 },
  { id: 2, lastname: "Talibov", firstname: "Ali", Grade: "A-", percentage: 91 },
  { id: 3, lastname: "Doe", firstname: "Kenan", Grade: "B+", percentage: 88 },
  { id: 4, lastname: "Nesibzade", firstname: "Arif", Grade: "D+", percentage: 68 }
];

export async function GET(req, { params }) {
  const { id } = params;
  const student = students.find(s => String(s.id) === id);
  if (!student) {
    return Response.json({ message: "Not found" }, { status: 404 });
  }

  return Response.json(student);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  const index = students.findIndex(s => String(s.id) === id);
  if (index === -1) {
    return new Response(JSON.stringify({ message: "Not found" }), { status: 404 });
  }

  students[index] = {
    ...students[index],
    ...updatedData
  };

  return new Response(JSON.stringify(students[index]), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
}
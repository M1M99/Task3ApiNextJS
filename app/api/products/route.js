const mockData = [
    { id: 1, title: "Phone", desc: "good" },
    { id: 2, title: "TV", desc: "good" },
    { id: 3, title: "Bag", desc: "good" },
    { id: 4, title: "Laptop", desc: "good" }
];

export async function GET() {
    return Request.json(mockData);
}
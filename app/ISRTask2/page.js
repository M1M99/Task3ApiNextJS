export const revalidate = 15; 

export default async function User() {
  const res = await fetch("https://randomuser.me/api", { cache: "no-store" });
  const data = await res.json();
  const user = data.results[0];

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <img src={user.picture.large} alt="user" style={{ borderRadius: "50%" }} />
      <h2>{user.name.first} {user.name.last}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Country:</strong> {user.location.country}</p>
    </div>
  );
}

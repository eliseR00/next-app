async function fetchProfile(id) {
  const response = await fetch(
    `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-id.php?id=${id}`,
  );
  if (!response.ok) {
    return null;
  }
  const data = await response.json();
  console.log("Fetched profile data:", data);
  return data ? data : null;
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {  
    title: `Profile ${id}`,
    description: `Details of profile with ID ${id}`,
  };
};
export default async function ProfilePage({ params }) {
  const { id } = await params;
  console.log("Profile ID:", id);
  const profile = await fetchProfile(id);
  if (!profile) {
    return <p>Profile not found.</p>;
  }
  return (
    <div>
      <h1>{profile.name}</h1>
      <p style={{textAlign: "center"}}>Title: {profile.title}</p>
      <figure style={{ display: "flex", justifyContent: "center" }}>
        <img src={profile.image_url} alt={profile.name} style={{ maxWidth: "100%", height: "auto" }} />
      </figure>
    </div>
  );
}
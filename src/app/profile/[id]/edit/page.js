import prisma from "@/app/lib/prisma";
import AddProfileForm from "@/app/components/AddProfileForm";

async function fetchProfile(id) {
  const data = await prisma.profiles.findUnique({
    where: { id: parseInt(id) },
  });
  return data ? data : null;
}
export async function generateMetadata({ params }) {
  const { id } = await params;
  return {  
    title: `Edit Profile ${id}`,
    description: `Edit details of profile with ID ${id}`,
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
      <h1>Edit Profile {profile.name}</h1>
        <AddProfileForm existingProfile={profile} />
    </div>
  );
}
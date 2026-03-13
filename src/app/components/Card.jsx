import Link from "next/link";

export default function Card({profile}) {
     if (!profile) return null;
    return (
        <Link href={`/profile/${profile.name}`}>
            <div className="profile-card">
                <img src={profile.image} alt={profile.name}/>
                <p>{profile.name}</p>
                <p>{profile.title}</p>
            </div>
        </Link>

    );
}


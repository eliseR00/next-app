import styles from "./page.module.css";
import Card from "./components/Card";
import Filters from "./components/Filters";
import Link from "next/link";


  async function fetchTitles() {
    const response = await fetch(
      "https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php",
      {next: { revalidate: 60 },}
    );
    const titles = await response.json();
    return titles ? titles.titles : [];
  }

  async function getData({title,search}) {
    const response = await fetch(
      `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&name=${search}&limit=1000`,
      { next: { revalidate: 60 } }
    );
    const data = await response.json();
    return data ? data.profiles : [];
  }
export const metaData = {
  title: "Next js Profile App",
  description: "A simple profile app using next js"
};
export default async function Home({searchParams}) {

  const searchParamsData = await searchParams;
  const selectedTitle = searchParamsData && searchParamsData.title ? searchParamsData.title : "";
  const selectedSearch = searchParamsData && searchParamsData.search ? searchParamsData.search : "";
  const [titles, profiles] = await Promise.all([ fetchTitles(), getData({title: selectedTitle, search: selectedSearch}) ]);

  console.log("Titles:", titles);
  console.log("Profiles:", profiles);


  return (
    <div>
      <h1>My Profile App (via next)</h1>
      <Filters titles={titles} title={selectedTitle} name={selectedSearch}/>
      <div className="grid">
        {profiles && profiles.length > 0
          ? profiles.map((profile) => (
            <Link key={profile.id} href={`/profile/${profile.id}`}> 
              <Card
                name={profile.name}
                title={profile.title}
                image={profile.image_url}
              />
              </Link>
            ))
          : <p>No profiles found.</p>}
          </div>
    </div>
  );
}

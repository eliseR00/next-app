import Image from "next/image";
import Card from "./components/Card";
import Filters from "./components/Filters";


  async function fetchTitles() {
    const response = await fetch(
      "https://web.ics.purdue.edu/%7Ezong6/profile-app/get-titles.php",
      {next: { revalidate: 60 },}
    );
    const titles = await response.json();
    return titles ? titles.titles : [];
  }

  async function getData({title,search}) {
    const response = await fetch(
      `https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-filter.php?title=${title}&search=${search}&limit=1000`,
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
  const selectedTitle = searchParamsData.title ? searchParamsData.title : "";
  const selectedSearch = searchParamsData.search ? searchParamsData.search : "";
  const [titles, profiles] = await Promise.all([ fetchTitles(), getData({title: selectedTitle, search: selectedSearch}) ]);

  console.log("Titles:", titles);
  console.log("Profiles:", profiles);


  return (
    <div>
      <h1>
        Profile Directory
      </h1>
      <Filters titles={titles} title={selectedTitle} name={selectedSearch}/>
      <div className="profiles-container">
        {profiles.map(profile => <Card key={profile.name} profile={profile} />)}
      </div>
    </div>
  );
}

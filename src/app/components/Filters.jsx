import { memo } from "react";
import Link from "next/link";
const Filters = memo(({titles, title, name}) => {
    return (


        <form>
            <div className="filter-dropdown">
                <label htmlFor="title">Select a title: </label>
                <select id="title" name="title" defaultValue={title}>
                    <option defaultValue="">ALL</option>
                    {
                        titles.map(title => <option key={title} defaultValue={title}>{title}</option>)
                    }
                </select>
            </div>
            <div className="filter-search">
                <label htmlFor="search">Search a name</label>
                <input id="search" name="search" defaultValue={name}/>
            </div>
            <button  type="submit">Apply Filters</button>
            <Link href="/">Clear</Link>

        </form>
    )
})
export default Filters;
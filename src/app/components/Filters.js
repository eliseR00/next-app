import styles from "./filter.module.css";
const Filters = ({titles, title, name}) => {
    return (
        <form className={styles.filterContainer} method="GET" action="/"> 
            <div className={styles.filterDropdown}>
                <label htmlFor="title">Select a title: </label>
                <select id="title" name="title" defaultValue={title}>
                    <option defaultValue="">ALL</option>
                    {
                        titles.map(title => <option key={title} value={title}>{title}</option>)
                    }
                </select>
            </div>

            <div className={styles.filterSearch}>
                <label htmlFor="search">Search a name: </label>
                <input id="search" name="search" defaultValue={name}/>
            </div>
            <button className={styles.filterButton} type="submit">Apply Filters</button>
            <a className={styles.filterLink} href="/">
                Clear
            </a>
        </form>

    )
}
export default Filters;
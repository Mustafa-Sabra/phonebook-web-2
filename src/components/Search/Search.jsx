import {React, Component} from "react"


import "./Search.css"

class Search extends Component {
    render() { 
        const {handleSearch} = this.props;
        return (
            <div className="search-container">
                <input type="text" placeholder="Search ..." onChange={handleSearch}/>
            </div>
        );
    }
}
 
export default Search;
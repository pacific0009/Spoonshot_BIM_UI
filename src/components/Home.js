import React, { useState } from "react";
import SearchResultDisplay from "./SerchResultDisplay";
import conf from "../config.json";
import ReactPaginate from "react-paginate";
import Loading from "./Loading";
function Home() {
  const [serachResult, setserachResult] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [currPage, setCurrPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const limit = 10;

  function getStartIndex(page) {
    return page * limit;
  }

  function calLastPage(count) {
    return parseInt(count / limit);
  }

  function handlePageClick(data) {
    setCurrPage(data.selected);
    handleSearchClick(searchQuery, Math.floor(data.selected));
  }

  function handleSearchClick(q, page) {
    // http://127.0.0.1:8000/inventory/volumes/?q=flower
    if (!q) return;

    console.log("page", page);
    setIsLoaded(false);
    fetch(
      conf.baseUrl +
        "inventory/volumes/?q=" +
        q +
        "&startIndex=" +
        getStartIndex(page) +
        "&maxResults=" +
        limit
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setLastPage(calLastPage(result.totalItems));
          setserachResult(result.items ? result.items : []);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  return (
    <div className="container">
      <div className="heading">Books</div>
      <div id="vspace"></div>
      <div id="search-bar">
        <input type="text" onChange={(e) => setSearchQuery(e.target.value)} placeholder='search books ..'/>
        <button onClick={() => handleSearchClick(searchQuery, 0)}>
          Search
        </button>
      </div>

      {!isLoaded && <Loading/>}
      {isLoaded && <SearchResultDisplay data={serachResult} />}
      <div id="vspace"></div>

        {serachResult.length ? (
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={lastPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        ) : (
          ""
        )}

    </div>
  );
}

export default Home;

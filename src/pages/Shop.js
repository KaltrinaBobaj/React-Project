import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Food from "../components/Food";

function Shop() {
  const [page, setPage] = useState(1);
  const [foods, setFoods] = useState();
  const [totalPages, setTotalPages] = useState();
  const [query, setQuery] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: `https://tasty.p.rapidapi.com/recipes/list`,
      params: {
        from: (page - 1) * 20,
        size: 20,
      },
      headers: {
       'x-rapidapi-key': 'cf29ad39eemsheae017a4a277dd7p1ab680jsnafd8018542a9',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
      },
    })
      .then((resp) => {
        if (resp.status === 200) setFoods(resp.data.results);
        setTotalPages(resp.data.count);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    switch (e.keyCode) {
      case 13:
        axios({
          method: "GET",
          url: `https://tasty.p.rapidapi.com/recipes/list`,
          params: {
            from: (page - 1) * 20,
            size: 20,
            q: e.target.value,
          },
          headers: {
            "x-rapidapi-key":
              "cf29ad39eemsheae017a4a277dd7p1ab680jsnafd8018542a9",
            "x-rapidapi-host": "tasty.p.rapidapi.com",
          },
        }).then((resp) => {
          if (resp.status === 200) setFoods(resp.data.results);
          setTotalPages(resp.data.count);
        });
        break;
    }
  };

  const handlePrevPage = (e) => {
    e.preventDefault();
    if (page > 1) {
      setPage((page) => page - 1);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage((page) => page + 1);
    }
  };

  return (
    <section className="py-5">
      <Container>
        <div className="d-flex justify-content-between align-items-center bg-light p-4 mb-5">
          <input
            type="search"
            className="form-control w-50"
            placeholder=" search foods..."
            onKeyUp={handleSearch}
          ></input>
          <div className="">
            <a
              href="#"
              onClick={handlePrevPage}
              className="btn btn-sm btn-outline-primary "
            >
              Prev
            </a>
            <span className="px-3">{page}</span>
            <a
              href="#"
              onClick={handleNextPage}
              className="btn btn-sm btn-outline-primary"
            >
              Next
            </a>
          </div>
        </div>
        <div className="row">
          {foods &&
            foods.map((food) => (
              <div className="col-3 mb-4" key={food.id}>
                <Food {...food} />
              </div>
            ))}
        </div>
      </Container>
    </section>
  );
}

export default Shop;

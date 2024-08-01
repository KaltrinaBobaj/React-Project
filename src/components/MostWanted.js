import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Food from "./Food";
import { Link } from "react-router-dom";
function MostWanted() {
  const [foods, setFoods] = useState();

  useEffect(() => {
    axios({
      method: "GET",
      url: "https://tasty.p.rapidapi.com/recipes/list",
      headers: {
        "x-rapidapi-key": "cf29ad39eemsheae017a4a277dd7p1ab680jsnafd8018542a9",
        "x-rapidapi-host": "tasty.p.rapidapi.com",
      },
    })
      .then((resp) => {
        if (resp.status === 200) setFoods(resp.data.results);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="py-5">
      <Container>
        <h2 className="mb-4 text-center">Most Wanted</h2>
        <div className="row">
          {foods &&
            foods.slice(0, 8).map((food) => (
              <div className="col-3 mb-4" key={food.id}>
                <Food {...food} />
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-center mt-5">
          <Link
            to="/shop}"
            className="btn btn-outline-secondary"
            style={{ backgroundColor: "" }}
          >
            Explore More &rarr;
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default MostWanted;

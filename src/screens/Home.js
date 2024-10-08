import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState("");

  // Fetching data from an API
  const loadData = async () => {
    let response = await fetch("http://localhost:4001/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    // console.log(response[0], response[1]);
    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src="data:image/jpeg;base64,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"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcRZn8vq1eRVJjSUZgMO7aIEbkO_uQhQdcFw&s"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="data:image/jpeg;base64,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"
                className="d-block w-100"
                style={{ filter: "brightness(30%" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {foodCat !== []
          ? foodCat.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === data.CategoryName &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((filterItems) => {
                        return (
                          <div
                            key={filterItems._id}
                            className="col-12 col-md-6 col-lg-3"
                          >
                            <Card
                              foodItem={filterItems}
                              options={filterItems.options[0]}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div>No such data found</div>
                  )}
                </div>
              );
            })
          : ""}
        {/* <Card /> */}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

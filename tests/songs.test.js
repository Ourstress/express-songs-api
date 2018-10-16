const app = require("../app");
const request = require("supertest");

//Fill in the test case below for the Songs API

describe("routes/songs", () => {

  it("POST /songs should return a new song object", () => {
    // expected return value?
      expected = {name:"test song", artist: "rhianna"}
    //trigger post request
      return request(app)
      .post("/songs")
      .send(expected)
      .then(response => {
    // check response status returned
        expect(response.status).toEqual(201)
    // check response body matches the expected
        expect(response.body).toMatchObject(expected)
  })
  });
  
  it("GET /songs should return a non empty array", () => {
    expected = [{name:"test song", artist:"rhianna"}]

    return request(app)
    .get("/songs")
  
    .then(response => {
      expect (response.status).toEqual(200)
      expect(response.body).toMatchObject(expected)
    })

  });
  
  it("PUT /songs should return the updated song", () => {
    expected = {name:"i wanna fly", artist:"ducky"}

    return request(app)
    .put("/songs/1")
    .send(expected)

    .then(response =>{
      expect(response.status).toEqual(200)
      expect(response.body).toMatchObject(expected)
    })
  });

  it("DELETE /songs/:id should return the deleted song", () => {
    expected = {name:"i wanna fly", artist:"ducky"}

    return request(app)
    .delete("/songs/1")

    .then(response => {
      expect(response.status).toEqual(200)
      expect(response.body).toMatchObject(expected)
    })
  });
  
  it("GET /songs should return an empty array", () => {
    
    
  });

});


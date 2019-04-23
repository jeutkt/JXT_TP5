const chai = require("chai");
const chaiHttp = require("chai-http");
const mocha=require("mocha");
const it=mocha.it;
const describe=mocha.describe;

const { app } = require("../app");


chai.should();
chai.use(chaiHttp);

describe("auth tests", () => {
  it("should return a token with acces garanted on POST /v1/auth/login", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({
        id: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
        login: "pedro",
        password: "pedro"
      })
      .end((err, res) => {
        res.should.have.status(200);
        // res.body.should.be.json;

        res.body.should.have.property("message");

        res.body.should.have.property("tokenaccess");

        res.body.message.should.equal("ok");

        done();
      });
  });

  it("should not return a token with acces garanted on POST /v1/auth/login password wrong", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({
        id: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
        login: "pedro",
        password: "pedrdddo"
      })
      .end((err, res) => {
        res.should.have.status(401);

        //res.body.should.be.json;

        res.body.should.be.a("object");

        res.body.should.have.property("message");

        res.body.message.should.equal("unauthorized");

        done();
      });
  });

  it("should not return a token with acces garanted on POST /v1/auth/login login wrong", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({
        id: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e",
        login: "pedrdddo",
        password: "pedro"
      })
      .end((err, res) => {
        res.should.have.status(401);

       // res.body.should.be.json;

        res.body.should.be.a("object");

        res.body.should.have.property("message");

        res.body.message.should.equal("unauthorized");

        done();
      });
  });

  it("should return ok for verifyacces", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({id: "45745c60-7b1a-11e8-9c9c-2d42b21b1a3e", login: "pedro", password: "pedro" })
      .end((err, response) => {
        chai
          .request(app)
          .get("/v1/auth/verifyaccess")
          .set("Authorization", "bearer " + response.body.tokenaccess)
          .end((err, res) => {
            res.should.have.status(200);

            //res.should.be.json;

            res.body.should.be.a("object");

            res.body.should.have.property("message");

            res.body.should.have.property("tokenaccess");

            res.body.message.should.equal("ok");

            done();
          });
      });
  });
  it("should return unauthorized for verifyacces wrong token", done => {
    chai
      .request(app)
      .post("/v1/auth/login")
      .send({ login: "pedro", password: "pedro" })
      .end((err, res) => {
        chai
          .request(app)
          .get("/v1/auth/verifyaccess")
          .set("Authorization", "Bearer " + res.body.tokenaccess + "ddd")
          .end((err, res) => {
            res.should.have.status(401);

           // res.should.be.json;

            res.body.should.be.a("object");

            res.body.should.have.property("message");

            res.body.message.should.equal("unauthorized");

            done();
          });
      });
  });
  it("should not return ok for verify access because of no token ", done => {
    chai
      .request(app)
      .get("/v1/auth/verifyaccess")
      .end((err, res) => {
        res.should.have.status(401);

        //res.should.be.json;

        res.body.should.be.a("object");

        res.body.should.have.property("message");

        res.body.message.should.equal("unauthorized");

        done();
      });
  });
});

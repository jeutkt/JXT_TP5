const chai = require('chai')
const chaiHttp = require('chai-http')
const {app} = require('../app')
chai.use(chaiHttp)
const should=chai.should();

describe('Users tests', () => {
  it('should list ALL users on /v1/users GET', (done) => {
    chai.request(app)
        .get('/v1/users')
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
  })

  it('should list a SINGLE user on /v1/users/<id> GET',(done)=>{
      const id='45745c60-7b1a-11e8-9c9c-2d42b21b1a3e';
      chai.request(app)
        .get(`/v1/users/${id}`)
        .end((err,res)=>{
            res.should.have.status(200);
            res.should.be.json;
            done();
        })
  })

  it('should add a SINGLE user on /v1/users POST',(done)=>{
      chai.request(app)
      .post('/v1/users')
      .send({'name':'nom_test','login':'testtttt','age':'21'})
      .end((err,res)=>{
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('id')
          res.body.should.have.property('name')
          res.body.name.should.equal('nom_test')
          res.body.should.have.property('login')
          res.body.login.should.equal("testtttt")
          res.body.should.have.property('age')
          res.body.age.should.equal("21")
          done();
      })
  })

  it('should update a SINGLE user on /v1/users/<id> PATCH',(done)=>{
    const id='45745c60-7b1a-11e8-9c9c-2d42b21b1a3e';
      chai.request(app)
      .patch(`/v1/users/${id}`)
      .send({'name':'name_patch'})
      .end((err,res)=>{
          res.should.has.status(200);
          res.should.be.json
          res.body.should.have.property('name')
          res.body.name.should.equal('name_patch')
          done();
      })
  })

  it('should delete a SINGLE user on /v1/users/<id> DELETE',(done)=>{
    const id='45745c60-7b1a-11e8-9c9c-2d42b21b1a3e';    
    chai.request(app)
    .delete(`/v1/users/${id}`)
    .end((err,res)=>{
        res.should.have.status(200)
        chai.request(app)
        .get(`/v1/users/${id}`)
        .end((err,res)=>{
            res.should.have.status(404)
            done()
        })
    })
      
  })

 
})
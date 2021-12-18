import app from '../app.js'
import chai from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('Testing unit 1', () => {
    before(done => {
      // Do something here before test
      done()
    })
    describe('GET method /location', () => {
      it('it status 200', done => {
        chai
          .request(app)
          .get('/location')
          .end((e, res) => {
            res.should.have.status(200)
            done()
          })
      })
    })

    describe('GET method /register', () => {
        it('it status 200', done => {
          chai
            .request(app)
            .get('/register')
            .end((e, res) => {
              res.should.have.status(200)
              done()
            })
        })
      })

      describe('POST method /getdata', () => {
        it('it status 200', done => {
          chai
            .request(app)
            .post('/getdata')
            .send({
                id: 'U08f0bbbec3cc9ea46afb87366a82763f',
                name: 'Mudang'
              })
            .end((e, res) => {
              res.should.have.status(200)
              done()
            })
        })
        it('it status 500 wrong id', done => {
          chai
            .request(app)
            .post('/getdata')
            .send({
              id: 'wrong id',
              name: 'Mudang'
            })
            .end((e, res) => {
              res.should.have.status(500)
              done()
            })
        })
        it('it status 501 no data', done => {
          chai
            .request(app)
            .post('/getdata')
            .end((e, res) => {
              res.should.have.status(501)
              done()
            })
        })
        it('it status 501 no id', done => {
            chai
              .request(app)
              .post('/getdata')
              .send({
                  name: 'Mudang'
                })
              .end((e, res) => {
                res.should.have.status(501)
                done()
              })
          })
          it('it status 501 no name', done => {
            chai
              .request(app)
              .post('/getdata')
              .send({
                  id: 'U08f0bbbec3cc9ea46afb87366a82763f'
                })
              .end((e, res) => {
                res.should.have.status(501)
                done()
              })
          })
      })
    
    after(done => {
      // Do something here after test
      done()
    })
  })
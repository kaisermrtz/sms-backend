const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Model} = require('./../models/model');
const { seedDatabase } = require('./../seed/seed');

const valideNewDatapoint = {
    "id": 1234,
    "city": "New City",
    "start_date": "10/10/2010",
    "end_date": "10/11/2010",
    "price": "3.4",
    "status": "Weekly",
    "color": "#ababab"
};

const invalidDatapointWithMissingField = {
    "city": "New City",
    "start_date": "10/10/2010",
    "end_date": "10/11/2010",
    "price": "3.4",
    "status": "Weekly",
    "color": "#ababab"
};

const invalidDatapoint = {
    "id": 1234,
    "city": "",
    "start_date": "10/10/2010",
    "end_date": "10/11/2010",
    "price": "3.4",
    "status": "Weekly",
    "color": "#ababab"
};

beforeEach(seedDatabase);

describe('GET /', () => {
    it('should return all datapoints', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect((res) => {
                expect(res.body.length).toBe(1000);
            })
            .end(done);
    });
});

describe('GET /:id', () => {
    it('should return a single datapoint', (done) => {
        request(app)
            .get('/1')
            .expect(200)
            .end(done);
    });

    it('should reject invalid id', (done) => {
        request(app)
            .get('/5291')
            .expect(400)
            .end(done);
    });
});

describe('POST /add', () => {
    it('should add a datapoint', (done) => {
        request(app)
            .post('/add')
            .send(valideNewDatapoint)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(valideNewDatapoint.id);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Model.find({id: 1234}).then((data) => {
                    expect(data.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject empty body', (done) => {
        request(app)
            .post('/add')
            .send({})
            .expect(400)
            .end(done);
    });

    it('should reject invalid datapoint with missing field', (done) => {
        request(app)
            .post('/add')
            .send(invalidDatapointWithMissingField)
            .expect(400)
            .end(done);
    });

    it('should reject invalid datapoint', (done) => {
        request(app)
            .post('/add')
            .send(invalidDatapoint)
            .expect(400)
            .end(done);
    });
});

describe('POST /update/:id', () => {
    it('should update a datapoint', (done) => {
        request(app)
            .post('/update/1')
            .send(valideNewDatapoint)
            .expect(200)
            .expect((res) => {
                expect(res.body.id).toBe(valideNewDatapoint.id);
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Model.find({id: 1234}).then((data) => {
                    expect(data.length).toBe(1);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject empty body', (done) => {
        request(app)
            .post('/update/1')
            .send({})
            .expect(400)
            .end(done);
    });

    it('should reject invalid datapoint with missing field', (done) => {
        request(app)
            .post('/update/1')
            .send(invalidDatapointWithMissingField)
            .expect(400)
            .end(done);
    });

    it('should reject invalid datapoint', (done) => {
        request(app)
            .post('/update/1')
            .send(invalidDatapoint)
            .expect(400)
            .end(done);
    });
});

describe('GET /delete/:id', () => {
    it('should delete a datapoint', (done) => {
        request(app)
            .get('/delete/1')
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                // Check if deletion worked
                Model.find({id: 1}).then((data) => {
                    expect(data.length).toBe(0);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should reject invalid id', (done) => {
        request(app)
            .get('/delete/5291')
            .expect(400)
            .end(done);
    });
});
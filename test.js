const chai = require('chai');
const fs = require('fs');
const chaiHttp = require('chai-http');
const app = require('./index');
const { expect } = chai;
chai.use(chaiHttp);

describe('Test csv upload', () => {
    describe('Test for happy path', () => {
        it('should return 200 and create csv file', async() => {
            const res = await chai.request(app)
                .post('/upload-csv')
                .set('content-type', 'multipart/form-data')
                .attach('file', fs.readFileSync(`${__dirname}/file.csv`), 'file.csv')
                expect(res.status).to.equal(200);
        })
    })
})

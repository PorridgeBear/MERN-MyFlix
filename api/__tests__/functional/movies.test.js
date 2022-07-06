const server = require('../../server');
const supertest = require('supertest');
const requestWithSupertest = supertest(server);


describe('Movie APIs', () => {

    // Ensure that Jest can exit
    afterAll(async () => {
        server.close();
    });

    it('GET /movies should list all movies', async () => {
        const res = await requestWithSupertest.get('/api/movies');
        expect(res.status).toEqual(200);
        expect(res.type).toEqual(expect.stringContaining('json'));
        expect(res.body).toHaveProperty('movies')
        
        let firstMovie = res.body['movies'][0];
        let movieProps = ['id', 'title', 'synopsis', 'tags', 'released', 'director', 'poster'];
        movieProps.map((prop) => {
            expect(firstMovie).toHaveProperty(prop);
        });
        
    });  
});

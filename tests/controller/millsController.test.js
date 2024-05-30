import request from 'supertest';
import app from '../../app';
import Mill from '../../models/ModelSequelizer.js';

describe('Mills Controller', () => {
    beforeEach(async () => {
        Mill.deleteMany();
    });
    

    describe('GET /api/', () => {
        it('should return all mills', async () => {
            const mill1 =  Mill.create({
                "name": "Splash Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });
            const mill2 = Mill.create({
                "name": "The Kendalls",
                "place": "Gillingham",
                "year": "1895",
                "type": "Titt iron wind engine"
            });

            const response = await request(app).get('/api/');

            expect(response.status).toBe(200);

            expect(response.body).toEqual([mill1, mill2]);
        });
    });

    describe('GET /api/:id', () => {
        it('should return a mill by id', async () => {
            const mill = Mill.create({
                "name": "Splash Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });

            const response = await request(app).get(`/api/${mill.id}`);
            expect(response.status).toBe(200);

            expect(response.body).toEqual(mill);
        });
    });

    describe('POST /api/', () => {
        it('should create a new mill', async () => {
            const millData = Mill.create({
                "name": "Splash Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });

            const response = await request(app).post('/api/').send(millData);

            expect(response.status).toBe(200);

            expect(response.body.mill.name).toBe(millData.name);

        });
    });

    describe('PUT /api/:id', () => {
        it('should update a mill by id', async () => {
            const mill = Mill.create({
                "name": "Splash Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });

            const updatedMillData = Mill.create({
                "name": "Updated Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });

            const response = await request(app)
                .put(`/api/${mill.id}`)
                .send(updatedMillData);

            expect(response.status).toBe(200);

            expect(response.body.mill.name).toBe(updatedMillData.name);

            const updatedMill = Mill.get(mill.id);
            expect(updatedMill.name).toBe(updatedMillData.name);
        });
    });

    describe('DELETE /api/:id', () => {
        it('should delete a mill by id', async () => {
            const mill = Mill.create({
                "name": "Splash Mill",
                "place": "Wraysbury",
                "year": "1996",
                "type": "Smock"
            });
            
            const response = await request(app).delete(`/api/${mill.id}`);

            expect(response.status).toBe(200);

            expect(response.body.message).toBe('Mill deleted successfully');


            const deletedMill = Mill.get(mill.id);
            expect(deletedMill).toBeFalsy();
        });
    });
});

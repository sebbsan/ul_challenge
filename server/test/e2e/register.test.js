const request = require('supertest');
const app = require('../../lib/app');

describe('User Registration', () => {
  it('not allow invalid email addresses', async () => {
    const res = await request(app).post('/register').send({
      fullName: 'Sebastian Weikart',
      email: 'msebweik.art',
      password: '124AVBWESDsdw3',
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Email is invalid');
  });

  it('not allow weak passwords', async () => {
    const res = await request(app).post('/register').send({
      fullName: 'Sebastian Weikart',
      email: 'me@sebweik.art',
      password: 'asasa',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Password strength not sufficient');
  });
  it('should register a user successfully', async () => {
    const res = await request(app).post('/register').send({
      fullName: 'Sebastian Weikart',
      email: 'me@sebweik.art',
      password: '124AVBWESDsdw3',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.fullName).toEqual('Sebastian Weikart');
  });

  it('should authenticate a user successfully after registering', async () => {
    const res = await request(app).post('/register').send({
      fullName: 'Sebastian Weikart',
      email: 'me2@sebweik.art',
      password: '124AVBWESDsdw3',
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.fullName).toEqual('Sebastian Weikart');

    const authResponse = await request(app).post('/login').send({
      email: 'me2@sebweik.art',
      password: '124AVBWESDsdw3',
    });

    expect(authResponse.statusCode).toEqual(200);
    expect(authResponse.body.user.fullName).toEqual('Sebastian Weikart');
    expect(authResponse.body.token).toBeDefined();
  });
});

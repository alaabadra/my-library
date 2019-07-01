const tape = require('tape');
const supertest = require('supertest');
const runBuild = require('./../src/database/db_built');
const addUser = require('./../src/database/queries/addUser');
const checkUser = require('./../src/database/queries/checkUser');
const getBooks = require('./../src/database/queries/getBooks');
const app = require('./../src/app');

tape('first test', (test) => {
  test.equal(1, 1, 'paaas');
  test.end();
});

tape('test add user', (test) => {
  runBuild('db_bulit.sql', (err, res) => {
    if (err) test.error(err);
    const userINfo = {
      name: 'abdallah',
      email: 'akjfg@gmail.com',
      password: '123',
    };
    addUser(userINfo)
      .then((result) => {
        test.equal(result.rowCount, 1, 'added correctly');
        test.end();
      })
      .catch((error) => {
        test.error(error);
      });
  });
});

tape('check user', (test) => {
  runBuild('db_bulit.sql', (err, res) => {
    if (err) test.error(err);
    const email = 'abodsaid1996@gmail.com';
    checkUser(email)
      .then((result) => {
        test.equal(result.rows[0].email, email, 'email is correct');
        test.end();
      })
      .catch((error) => {
        test.error(error);
        test.end();
      });
  });
});

tape('get books', (test) => {
  runBuild('db_bulit.sql', (err, res) => {
    if (err) test.error(err);
    getBooks()
      .then((result) => {
        test.equal(result.rows[0].name, 'JAVASCRIPT', 'same book');
        test.end();
      })
      .catch((error) => {
        test.error(error);
        test.end();
      });
  });
});

tape('testing endpoint', (test) => {
  supertest(app)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      if(err) test.error(err)
      test.equal(res.text.includes('<title>Our Library</title>'), true, 'content is correct');
      test.end();
    });
});

tape.onFinish(() => {
  process.exit(0);
});
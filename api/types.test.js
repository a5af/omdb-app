const Film = require('./types').Film;
const fs = require('fs');

const d = fs.readFileSync('mockups.json');
const FILMS = JSON.parse(d);

test("Film's getCrew() returns consistent results", async () => {
  FILMS.forEach((f) => expect(new Film(f).getCrew()).toMatchSnapshot());
});

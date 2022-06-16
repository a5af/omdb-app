const CommonCrewFacility = require('./facilities').CommonCrewFacility;
const fs = require('fs');

const d = fs.readFileSync('mockups.json');
const FILMS = JSON.parse(d);

test("Verifies CommonCrewFacility's getCommonCrew returns consistent results.", async () => {
  for (let i = 0; i < FILMS.length; i++) {
    for (let j = i + 1; j < FILMS.length; j++) {
      expect(
        CommonCrewFacility.getCommonCrew(FILMS[i], FILMS[j])
      ).toMatchSnapshot();
    }
  }
});

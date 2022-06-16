const Film = require('./types').Film;

class CommonCrewFacility {
  static getCommonCrew(film1, film2) {
    if (!film1 || !film2) {
      return {};
    }

    const [filmIns1, filmIns2] = [new Film(film1), new Film(film2)];
    const [crew1, crew2] = [
      filmIns1.getCrew().sort(),
      filmIns2.getCrew().sort(),
    ];

    let [i1, i2] = [0, 0];
    const joinedCrew = [];
    while (i1 < crew1.length && i2 < crew2.length) {
      if (crew1[i1] === crew2[i2]) {
        joinedCrew.push(crew1[i1]);
        i1 += 1;
        i2 += 1;
      } else if (crew1[i1] < crew2[i2]) {
        i1 += 1;
      } else {
        i2 += 1;
      }
    }
    const result = Object.keys(
      joinedCrew.reduce((p, c) => {
        p[c] = 1;
        return p;
      }, {})
    );

    return {
      crew1,
      crew2,
      common: result,
    };
  }
}

module.exports = {
  CommonCrewFacility,
};

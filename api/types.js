class Film {
  constructor({
    Title,
    Year,
    Rated,
    Released,
    Runtime,
    Genre,
    Director,
    Writer,
    Actors,
    Plot,
    Language,

    Country,
    Awards,
    Poster,
    Ratings,
    Metascore,
    imdbRating,
    imdbVotes,
    imdbID,
    Type,
    DVD,
    BoxOffice,
    Production,
    Website,
  }) {
    this.Title = Title || '';
    this.Year = Year || '';
    this.Rated = Rated || '';
    this.Released = Released || '';
    this.Runtime = Runtime || '';
    this.Genre = Genre || '';
    this.Director = Director || '';
    this.Writer = Writer || '';
    this.Actors = Actors || '';
    this.Plot = Plot || '';
    this.Language = Language || '';
    this.Country = Country || '';
    this.Awards = Awards || '';
    this.Poster = Poster || '';
    this.Ratings = Ratings || '';
    this.Metascore = Metascore || '';
    this.imdbRating = imdbRating || '';
    this.imdbVotes = imdbVotes || '';
    this.imdbID = imdbID || '';
    this.Type = Type || '';
    this.DVD = DVD || '';
    this.BoxOffice = BoxOffice || '';
    this.Production = Production || '';
    this.Website = Website || '';
  }

  getCrew() {
    const crew = [
      ...this.Director.split(','),
      ...this.Writer.split(','),
      ...this.Actors.split(','),
    ];

    return crew.map((c) => c.trim());
  }
}

class SearchResponse {
  constructor(Title, Year, imdbID, Type, Poster) {
    this.Title = Title || '';
    this.Year = Year || '';
    this.imdbID = imdbID || '';
    this.Type = Type || '';
    this.Poster = Poster || '';
  }
}

module.exports = {
  Film,
  SearchResponse,
};

import React, { useState, useEffect } from "react";
import { FaTag, FaClock, FaGlobe, FaComment, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import "./Showtimes.css";
import NowPlayingMovies from "../MovieList/NowPlayingMovies";

interface Movie {
  id: number;
  title: string;
  originalTitle: string;
  trailerUrl: string;
  posterUrl: string;
  backdropUrl: string | null;
  duration: number;
  description: string;
  shortDescription: string;
  category: {
    id: number;
    name: string;
    description: string;
  };
  director: string;
  cast: string;
  productionCompany: string;
  productionCountry: string;
  releaseDate: string;
  endDate: string;
  ageRating: string;
  language: string;
  subtitles: string;
  rating: number;
  ratingCount: number;
  status: string;
  genres: string[];
  showtimes: Showtime[];
}

interface Showtime {
  id: number;
  movieId: number;
  theatresName: string;
  theaterAddress: string;
  roomId: number;
  showDate: string;
  showTime: string;
  endTime: string;
  roomName: string;
}

interface DateOption {
  date: string;
  display: string;
}

const Showtimes: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<{ [key: string]: string }>(
    {}
  );
  const [movies, setMovies] = useState<Movie[]>([]);
  const [dates, setDates] = useState<DateOption[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // First fetch all movies
        const moviesResponse = await axios.get(
          "http://skystar.io.vn/api/movies"
        );
        setMovies(moviesResponse.data.content);

        // Set up dates
        const next7Days: DateOption[] = [];
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() + i);
          next7Days.push({
            date: date.toISOString().split("T")[0],
            display: `${date.toLocaleDateString("en-US", {
              weekday: "long",
            })}, ${date.toLocaleDateString("en-US")}`,
          });
        }
        setDates(next7Days);

        // Fetch initial filtered movies
        await handleFilter(today, "", "");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (!loading) {
      handleFilter(selectedDate, selectedMovie, selectedTheater);
    }
  }, [loading]); // Chạy handleFilter ngay sau khi loading hoàn tất

  useEffect(() => {
    if (selectedDate && !loading) {
      handleFilter(selectedDate, selectedMovie, selectedTheater);
    }
  }, [selectedDate, selectedMovie, selectedTheater]);

  const handleFilter = async (date: string, movie: string, theater: string) => {
    try {
      const selectedMovieTitle = movie
        ? movies.find((m) => m.id.toString() === movie)?.title || ""
        : "";

      const params = {
        title: selectedMovieTitle,
        searchDate: date || undefined,
        cinema: theater || undefined,
      };
      console.log("Params sent to backend:", params);
      const response = await axios.get(
        "http://localhost:8081/api/movies/search",
        {
          params,
        }
      );
      setFilteredMovies(response.data);
      console.log("Filtered movies:", response.data);
    } catch (error) {
      console.error("Error filtering movies:", error);
    }
  };

  const handleTimeSelect = (
    theaterAddress: string,
    roomName: string,
    showtimeId: number,
    time: string
  ) => {
    setSelectedTimes((prevSelectedTimes) => ({
      ...prevSelectedTimes,
      [`${theaterAddress}-${roomName}`]: time,
    }));
  };

  const groupShowtimesByTheater = (showtimes: Showtime[]) => {
    return showtimes.reduce((acc, showtime) => {
      if (!acc[showtime.theaterAddress]) {
        acc[showtime.theaterAddress] = {};
      }
      if (!acc[showtime.theaterAddress][showtime.roomName]) {
        acc[showtime.theaterAddress][showtime.roomName] = [];
      }
      acc[showtime.theaterAddress][showtime.roomName].push(showtime);
      return acc;
    }, {} as { [key: string]: { [key: string]: Showtime[] } });
  };

  const getUniqueTheaters = (movies: Movie[]) => {
    // Thay đổi cách lưu trữ theatres để chỉ lấy tên rạp độc nhất
    const theaters = new Set<string>();
    movies.forEach((movie) => {
      movie.showtimes.forEach((showtime) => {
        theaters.add(showtime.theatresName);
      });
    });
    return Array.from(theaters);
  };

  return (
    <div className="container-showtimes">
      <div className="wrapper-showtimes">
        {/* Header Selection */}
        <div className="header-selection-showtimes">
          <div
            className="selection-box-showtimes"
            id="selection-box-showtimes1"
          >
            <label>1. Date</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              {dates.map((dateOption) => (
                <option key={dateOption.date} value={dateOption.date}>
                  {dateOption.display}
                </option>
              ))}
            </select>
          </div>

          <div
            className="selection-box-showtimes"
            id="selection-box-showtimes2"
          >
            <label>2. Movie</label>
            <select
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">All Movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </div>

          <div
            className="selection-box-showtimes"
            id="selection-box-showtimes3"
          >
            <label>3. Theater</label>
            <select
              value={selectedTheater}
              onChange={(e) => setSelectedTheater(e.target.value)}
            >
              <option value="">All Theater</option>
              {getUniqueTheaters(movies).map((theaterName) => (
                <option key={theaterName} value={theaterName}>
                  {theaterName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* No Showtimes Message */}
        {!loading && (!filteredMovies || filteredMovies.length === 0) && (
          <div
            style={{
              textAlign: "center",
              padding: "50px",
              fontSize: "1.2rem",
              color: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              margin: "20px 0",
            }}
          >
            <h3>Chưa có lịch chiếu cho thời gian này</h3>
            <p>Vui lòng chọn ngày khác hoặc rạp khác</p>
          </div>
        )}

        {/* Movie Info Section */}
        {filteredMovies &&
          filteredMovies.length > 0 &&
          filteredMovies.map((movie) => {
            const groupedShowtimes = groupShowtimesByTheater(movie.showtimes);
            return (
              <div key={movie.id} className="movie-info-showtimes">
                <div className="movie-main-poster-showtimes">
                  <div className="movie-poster-showtimes">
                    <img src={movie.posterUrl} alt={movie.title} />
                  </div>
                  <div className="movie-details-showtimes">
                    <h2 className="movie-title-showtimes">{movie.title}</h2>
                    <ul>
                      <li>
                        <FaTag size={24} />
                        <p className="text1">Genre: {movie.category.name}</p>
                      </li>
                      <li>
                        <FaClock size={24} />
                        <p className="text1">Duration: {movie.duration} min</p>
                      </li>
                      <li>
                        <FaGlobe size={24} />
                        <p className="text1">
                          Country: {movie.productionCountry}
                        </p>
                      </li>
                      <li>
                        <FaComment size={24} />
                        <p className="text1">Language: {movie.language}</p>
                      </li>
                      <li>
                        <FaUserPlus size={24} />
                        <p className="text1">Age Rating: {movie.ageRating}</p>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="box-theater-showtimes">
                  {Object.keys(groupedShowtimes).map((theaterAddress) => (
                    <div
                      key={theaterAddress}
                      className="theater-info-main-showtimes"
                    >
                      <div className="theater-info-showtimes">
                        <h2 className="theater-title-showtimes">Skystar</h2>
                        <p className="theater-details-showtimes">
                          {
                            groupedShowtimes[theaterAddress][
                              Object.keys(groupedShowtimes[theaterAddress])[0]
                            ][0].theatresName
                          }
                        </p>
                        <p className="theater-details-showtimes">
                          {theaterAddress}
                        </p>
                      </div>
                      <div className="showtimes-showtimes">
                        {Object.keys(groupedShowtimes[theaterAddress]).map(
                          (roomName) => (
                            <div
                              key={roomName}
                              className="showtime-type-showtimes"
                            >
                              <h5>{roomName}</h5>
                              <ul className="time-showtimes">
                                {groupedShowtimes[theaterAddress][roomName].map(
                                  (showtime) => (
                                    <li key={showtime.id}>
                                      <button
                                        className={
                                          selectedTimes[
                                            `${theaterAddress}-${roomName}`
                                          ] === showtime.showTime
                                            ? "selected"
                                            : ""
                                        }
                                        onClick={() =>
                                          handleTimeSelect(
                                            theaterAddress,
                                            roomName,
                                            showtime.id,
                                            showtime.showTime
                                          )
                                        }
                                      >
                                        {showtime.showTime}
                                      </button>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
      <NowPlayingMovies />
    </div>
  );
};

export default Showtimes;

// types.ts
interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: number;
  country: string;
  language: string;
  ageRating: string;
  poster: string;
}

interface Theater {
  id: string;
  name: string;
  location: string;
  address: string;
  showTimes: {
    type: "STANDARD" | "DELUXE";
    times: string[];
  }[];
}

// MovieBooking.tsx
import React, { useState } from "react";
import "./Showtimes.css";

const Showtimes: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedMovie, setSelectedMovie] = useState("");
  const [selectedTheater, setSelectedTheater] = useState("");

  // Mock data
  const mockMovies: Movie[] = [
    {
      id: "1",
      title: '"CUỚI HỎN" BANH RAP CUỐI NĂM VỚI 404',
      genre: "Comedy",
      duration: 104,
      country: "Thailand",
      language: "VN",
      ageRating: "16+",
      poster: "/path-to-poster.jpg",
    },
    {
      id: "2",
      title: "New Movie Title",
      genre: "Action",
      duration: 120,
      country: "USA",
      language: "EN",
      ageRating: "18+",
      poster: "/path-to-new-poster.jpg",
    },
    {
      id: "3",
      title: "Another Movie Title",
      genre: "Drama",
      duration: 130,
      country: "France",
      language: "FR",
      ageRating: "12+",
      poster: "/path-to-another-poster.jpg",
    },
  ];

  const mockTheaters: Theater[] = [
    {
      id: "1",
      name: "Cinestar",
      location: "Hue",
      address: "25 Mai Ba Trung, Vinh Ninh, Thanh pho Hue",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:10",
            "15:00",
            "16:10",
            "17:05",
            "18:15",
            "19:10",
            "19:45",
            "20:20",
            "21:15",
            "21:50",
            "22:30",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "2",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "3",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "4",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "5",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "6",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    {
      id: "7",
      name: "Cinestar",
      location: "Da Lat",
      address: "Quảng trường Lâm Viên, P10, TP.Đà Lạt, Lâm Đồng",
      showTimes: [
        {
          type: "STANDARD",
          times: [
            "14:15",
            "15:20",
            "17:25",
            "18:25",
            "19:10",
            "20:30",
            "21:15",
            "22:00",
            "22:40",
            "23:20",
          ],
        },
      ],
    },
    // Add more theaters...
  ];

  return (
    <div className="movie-booking-container">
      <div className="movie-booking-wrapper">
        {/* Header Selection */}
        <div className="header-selection">
          <div className="selection-box">
            <div className="selection-title">1. Date</div>
            <select
              className="selection-dropdown"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            >
              <option value="">Today 27/12</option>
            </select>
          </div>

          <div className="selection-box">
            <div className="selection-title">2. Movie</div>
            <select
              className="selection-dropdown"
              value={selectedMovie}
              onChange={(e) => setSelectedMovie(e.target.value)}
            >
              <option value="">Select Movie</option>
            </select>
          </div>

          <div className="selection-box">
            <div className="selection-title">3. Theater</div>
            <select
              className="selection-dropdown"
              value={selectedTheater}
              onChange={(e) => setSelectedTheater(e.target.value)}
            >
              <option value="">Select Theater</option>
            </select>
          </div>
        </div>

        {/* Movie Info Section */}
        <div className="movie-info1">
          <img
            src="/path-to-poster.jpg"
            alt="Movie Poster"
            className="movie-poster"
          />
          <div>
            <h2 className="movie-title3">Movie Title</h2>
            <p className="movie-details">Genre: Action</p>
            <p className="movie-details">Duration: 120 mins</p>
            <p className="movie-details">Country: USA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Showtimes;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./Components/Header/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Booking from "./pages/Booking/Booking";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./Components/Login/Login";
import Change_pass from "./Components/Login/Change_pass";
import About from "./Components/About/About";
import EntertaimentOptions from "./Components/EntertaimentOptions/EntertaimentOptions";
import Kidzone from "./Components/EntertaimentOptions/Kidzone";
import Restaurant from "./Components/EntertaimentOptions/Restaurant";
import Bowling from "./Components/EntertaimentOptions/Bowling";
import Billiard from "./Components/EntertaimentOptions/Billiard";
import Opera from "./Components/EntertaimentOptions/Opera";
import Gym from "./Components/EntertaimentOptions/Gym";
import Coffee from "./Components/EntertaimentOptions/Coffee";
import MovieDetail from "./Components/MovieDetail/MovieDetail";
import { AuthProvider } from "./context/AuthContext";
import UserInfo from "./Components/Login/UserInfo";
import Showtimes from "./Components/Showtimes/Showtimes";
import EventRentalPage from "./Components/EventRentalPage/EventRentalPage";
import EventStar from "./Components/EventRentalPage/Events/EventStar";
import Cinema from "./Components/EventRentalPage/Events/Cinema";
import PaymentPage from "./Components/PaymentForm/PaymentPage/PaymentPage";
import PaymentFormDetail from "./Components/PaymentForm/PaymentFormDetail";
import Promotion from "./Components/Promotions/Promotions";
import ScrollToTop from "./components/ScrollToTop";
import PopcornDrink from "./Components/PopcornDrink/PopcornDrink";
import NowMovieFull from "./Components/MovieList/NowMovieFull";
import ComingMovieFull from "./Components/MovieList/ComingMovieFull";
import BookTickets from "./Components/BookTickets/BookTickets";
import SearchResults from "./Components/SearchResults/SearchResults";
import Movie from "./pages/movie/movie";
// ...other imports

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/login" element={<Login />} />
            <Route path="/promotions" element={<Promotion />} />
            <Route path="/change_pass" element={<Change_pass />} />
            <Route path="/about" element={<About />} />
            <Route path="/entertaiment" element={<EntertaimentOptions />} />\
            <Route path="/khu-tre-em" element={<Kidzone />} />
            <Route path="/nha-hang" element={<Restaurant />} />
            <Route path="/bowling" element={<Bowling />} />
            <Route path="/billiard" element={<Billiard />} />
            <Route path="/opera" element={<Opera />} />
            <Route path="/gym" element={<Gym />} />
            <Route path="/coffee" element={<Coffee />} />
            <Route path="/movie/:movieId" element={<MovieDetail />} />
            <Route path="/user-info" element={<UserInfo />} />
            <Route path="/showtimes" element={<Showtimes />} />
            <Route path="/thue-su-kien" element={<EventRentalPage />} />
            <Route path="/thue-su-kien/all" element={<EventStar />} />
            <Route path="/thue-su-kien/cinema" element={<Cinema />} />
            <Route path="/payment" element={<PaymentFormDetail />} />
            <Route path="/popcorn-drink" element={<PopcornDrink />} />
            <Route path="/movie/showing" element={<NowMovieFull />} />
            <Route path="/movie/comings" element={<ComingMovieFull />} />
            <Route path="/books-ticket" element={<BookTickets />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie" element={<Movie />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

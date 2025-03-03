import React from 'react';
import Banner from '../../Components/Banner/Banner';
import NowPlayingMovies from '../../Components/MovieList/NowPlayingMovies';
import CommingSoonMovies from '../../Components/MovieList/ComingSoonMovies';
import MembershipSection from '../../Components/MembershipSection/MembershipSection';
import PromotionSection from '../../Components/PromotionSection/PromotionSection';
import EntertainmentSection from '../../Components/EntertainmentSection/EntertainmentSection';
import ContactForm from '../../Components/ContactForm/ContactForm';

const Home: React.FC = () => {
  return (
    <div className="">
       <Banner />
      <NowPlayingMovies />
      <CommingSoonMovies />
  
      <PromotionSection />
      <MembershipSection />
      <EntertainmentSection />
      <ContactForm />
    </div>
  );
};

export default Home;

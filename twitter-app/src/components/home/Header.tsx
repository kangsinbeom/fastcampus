const Header = () => {
  return (
    <div className="home__top">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div className="home__tab home__tab--active">For you</div>
        <div className="home__tab">Following</div>
      </div>
    </div>
  );
};

export default Header;

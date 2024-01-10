import { useState } from "react";

const Header = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="home__top">
      <div className="home__title">Home</div>
      <div className="home__tabs">
        <div
          className={`home__tab ${activeTab === "all" && "home__tab--active"}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </div>
        <div
          className={`home__tab ${
            activeTab === "following" && "home__tab--active"
          }`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </div>
      </div>
    </div>
  );
};

export default Header;

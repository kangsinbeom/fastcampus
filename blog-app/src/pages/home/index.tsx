import Footer from "components/footer";
import Header from "components/header";
import Navigation from "components/navigation";
import PostList from "components/postList";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <PostList />
      <Footer />
    </div>
  );
};

export default HomePage;

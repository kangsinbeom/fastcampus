import Header from "components/home/Header";
import PostForm from "components/home/PostForm";
import PostList from "components/home/PostList";
const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <PostForm />
      <PostList handleDelete={() => {}} />
    </div>
  );
};

export default HomePage;

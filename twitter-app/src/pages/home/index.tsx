import Header from "components/home/Header";
import PostForm from "components/posts/PostForm";
import PostList from "components/home/PostList";
const HomePage = () => {
  return (
    <div className="home">
      <Header />
      <PostForm />
      <PostList />
    </div>
  );
};

export default HomePage;

import HomePage from "pages/home";
import { Route, Routes } from "react-router-dom";
import PostsPage from "pages/posts";
import DetailPage from "pages/posts/detail";
import EditPage from "pages/posts/edit";
import NewPage from "pages/posts/new";
import ProfilePage from "pages/profile";
import SignupPage from "pages/signup";
import LoginPage from "pages/login";
import Layout from "pages/layout";

interface RouterProps {
  isAuthenticated: boolean;
}
const Router = ({ isAuthenticated }: RouterProps) => {
  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:id" element={<DetailPage />} />
            <Route path="/posts/new" element={<NewPage />} />
            <Route path="/posts/edit/:id" element={<EditPage />} />
            <Route
              path="*"
              element={<div>navigate 쓰는거랑 Home 쓰는 거랑 뭐가 달러</div>}
            />
          </>
        ) : (
          <Route element={<Layout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<SignupPage />} />
          </Route>
        )}
      </Routes>
    </>
  );
};

export default Router;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "pages/home";
import NotificationsPage from "pages/notifications";
import PostsPage from "pages/posts";
import PostDetail from "pages/posts/detail";
import PostEdit from "pages/posts/edit";
import PostNew from "pages/posts/new";
import PorfilePage from "pages/profile";
import ProfileEdit from "pages/profile/edit";
import SearchPage from "pages/search";
import LoginPage from "pages/users/login";
import SginupPage from "pages/users/signup";

interface RouterProp {
  isAuthentication: boolean;
}

const Router = ({ isAuthentication }: RouterProp) => {
  return (
    <>
      {isAuthentication ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/post/new" element={<PostNew />} />
          <Route path="/post/edit/:id" element={<PostEdit />} />
          <Route path="/profile" element={<PorfilePage />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/users/login" element={<LoginPage />} />
          <Route path="/users/signup" element={<SginupPage />} />
          <Route path="*" element={<Navigate replace to="/users/login" />} />
        </Routes>
      )}
    </>
  );
};

export default Router;

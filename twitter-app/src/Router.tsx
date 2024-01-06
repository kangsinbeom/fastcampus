import { Navigate, Route, Routes } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<div>hompage</div>} />
      <Route path="/posts" element={<div>posts</div>} />
      <Route path="/post/:id" element={<div>detail</div>} />
      <Route path="/post/new" element={<div>new</div>} />
      <Route path="/post/edit" element={<div>edit</div>} />
      <Route path="/profile" element={<div>profile</div>} />
      <Route path="/profile/edit" element={<div>profile eidt</div>} />
      <Route path="/notification" element={<div>notification</div>} />
      <Route path="/search" element={<div>notification</div>} />
      <Route path="/users/login" element={<div>notification</div>} />
      <Route path="/users/signup" element={<div>notification</div>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default Router;

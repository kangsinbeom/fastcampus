import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthGuard from './components/auth/AuthGuard'
import Navbar from './components/shared/Navbar'
import useLoadKakao from './hooks/useLoadKakao'
import HotelPage from './pages/Hotel'
import HotelList from './pages/HotelList'
import MyPage from './pages/My'
import SigninPage from './pages/Signin'
import Test from './pages/Test'

function App() {
  useLoadKakao()
  return (
    <div className="App">
      <BrowserRouter>
        <AuthGuard>
          <Navbar />
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/" element={<HotelList />} />
            <Route path="/hotel/:id" element={<HotelPage />} />
            <Route path="/my" element={<MyPage />} />
            <Route path="/signin" element={<SigninPage />} />
          </Routes>
        </AuthGuard>
      </BrowserRouter>
    </div>
  )
}

export default App

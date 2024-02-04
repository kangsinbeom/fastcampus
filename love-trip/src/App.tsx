import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HotelPage from './pages/Hotel'
import HotelList from './pages/HotelList'
import Test from './pages/Test'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HotelList />} />
          <Route path="/test" element={<Test />} />
          <Route path="/hotel/:id" element={<HotelPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

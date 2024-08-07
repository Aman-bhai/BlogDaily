import './App.css';

import Navbar from './components/Navbar';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Blogs from "./components/Blogs"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PublicBlogs from './components/PublicBlogs';
import About from './components/About';

function App() {
  return (
    <div className="App min-h-screen">
      <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/about' element={<About/>} />
            <Route path='/publicBlogs' element={<PublicBlogs/>} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
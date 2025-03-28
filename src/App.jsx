import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Pages/Home/Home';
import NoFound from './components/Pages/NoFound/NoFound';
import About from './components/Pages/About/About';
import Service from './components/Pages/Service/Service';
import Contact from './components/Pages/Contact/Contact';

function App() {

  
    return (
        <>
            <Header />
            <Routes>
                <Route path='/meeting-calendar-react-vite/' element={<Home />} />
                <Route path='/meeting-calendar-react-vite/about' element={<About />} />
                <Route path='/meeting-calendar-react-vite/service' element={<Service />} />
                <Route path='/meeting-calendar-react-vite/contact' element={<Contact />} />
                <Route path='*' element={<NoFound />} />
            </Routes>
            <Footer />
        </>

    );
}

export default App;

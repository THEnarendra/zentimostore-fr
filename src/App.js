import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Header_Footer/Navbar';
import Footer from './Components/Header_Footer/Footer';
import { Home } from './Home/Home';
import { useEffect, useState } from 'react';
import { Posters } from './Components/Product/Posters';
import ContactUs from './Home/ContactUs';
import { Cart } from './Home/Cart';
import { Customize } from './Components/Product/Customizeposters';
import CheckOut from './Home/CheckOut';
import { Track } from './Home/Track';
import { Notification } from './Home/Notification';
import PolicyPage from './Home/PolicyPage';
import TermsOfService from './Terms&Conditions';
import RefundPolicy from './Home/RefundPolicy';
import ShippingPolicy from './ShippingPolicy';
import { ProductPage } from './Components/Product/ProductPage';
import { useProducts } from './Context/ProductContext';
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
function App() {
  const { categories, subcategories } = useProducts();
  const [theme, setTheme] = useState("darkTheme");
  const [footer, setFooter] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [details, fetchDetails] = useState([]);


  const getData = () => {
    fetch(`${process.env.REACT_APP_API_URL}/allSectionContent`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((res) => {
        const data = res.content;
        fetchDetails(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };
  
  useEffect(() => {
    getData();
    document.body.className = theme;
  }, [theme]);


  // useEffect(() => {
  //   fetch('https://framerang-backend.vercel.app/api/v1/allProducts')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       const fr = data.data;
  //       const frame = fr.filter((e) => e.category === "Frame");
  //       const poster = fr.filter((e) => e.category === "Poster");
  //       const Combo = fr.filter((e) => e.category === "Combo");
  //       const PostercategoryArray = Array.from(new Set(fr.filter((e) => e.category === 'Poster').map(user => user.subCategory)));
  //       const FramecategoryArray = Array.from(new Set(fr.filter((e) => e.category === 'Frame').map(user => user.subCategory)));
  //       const ComboCategoryArray = Array.from(new Set(fr.filter((e) => e.category === 'Combo').map(user => user.subCategory)));
  //       setData(frame);
  //       setData1(poster);
  //       setData2(Combo)
  //       setSubposterCategory(PostercategoryArray);
  //       setSubFrameCategory(FramecategoryArray);
  //       setSubComboCategory(ComboCategoryArray);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //     });
  // }, []);
 
 
  return (
    <div >
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ position: "absolute", width: "100vw", top: 0, height: "1vh" }}>
          <Navbar setIsCartOpen={setIsCartOpen} theme={theme} setTheme={setTheme} />
        </div>
        {isCartOpen && (<Cart setIsCartOpen={setIsCartOpen} />)}
        <Routes>
          <Route path='/' element={<Home setFooter={setFooter} theme={theme} setTheme={setTheme} setIsCartOpen={setIsCartOpen} />} />
          <Route path='/contactus' element={<ContactUs setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/:category' element={<Posters setFooter={setFooter} theme={theme} setTheme={setTheme} setIsCartOpen={setIsCartOpen}/>}/>
          <Route path='/:category/:subCategory' element={<Posters setFooter={setFooter} theme={theme} setTheme={setTheme} setIsCartOpen={setIsCartOpen}/>}/>
          <Route path='/customize' element={<Customize setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/checkout' element={<CheckOut setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/Track' element={<Track setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/Notification' element={<Notification setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/policies/privacy-policy' element={<PolicyPage setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/policies/terms-of-service' element={<TermsOfService setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/policies/refund-policy' element={<RefundPolicy setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/policies/shipping-policy' element={<ShippingPolicy setFooter={setFooter} theme={theme} setTheme={setTheme} />} />
          <Route path='/ProductPage' element={<ProductPage setFooter={setFooter} theme={theme} setTheme={setTheme} setIsCartOpen={setIsCartOpen} />} />
        </Routes>
        {footer && (
          <Footer />
        )}
      </BrowserRouter>
    </div>
  );
}
export default App;

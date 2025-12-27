import { IoMenuOutline, IoCloseOutline } from "react-icons/io5";
import { FaRegUserCircle, FaRegHeart, FaChevronRight } from "react-icons/fa";
import { FaRegAddressBook } from "react-icons/fa6";
import { MdOutlineDevices } from "react-icons/md";
import { LuCodesandbox } from "react-icons/lu";
import { PiMedalLight } from "react-icons/pi";
import { RiCustomerService2Line } from "react-icons/ri";
import { AiOutlineLogout, AiOutlineLogin } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { ContextProvider } from "../../Context/Context";
import Account from "../auth/Account";
import axios from "axios";
import { SERVER_URL } from "../../App";
import ProductCard from "../ProductCard";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); 
  const { isAuth, setIsAuth, token, setToken } = useContext(ContextProvider);

  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [query, setQuery] = useState("");
  const [window, setWindow] = useState(false);
  const [data, setData] = useState(null);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [openCategory, setOpenCategory] = useState(null);

  const navigate = useNavigate();

  const Links = [
    { name: "Exclusive At Croma", link: "/" },
    { name: "Top Brands", link: "/" },
    { name: "Croma Store Locator", link: "/" },
    { name: "Gift Card", link: "/" },
  ];

  const categories = [
    {
      name: "Televisions & Accessories",
      sub: ["LED TVs", "QLED TVs", "OLED TVs", "Smart TVs"],
    },
    {
      name: "Home Appliances",
      sub: ["Refrigerators", "Washing Machines", "Microwaves"],
    },
    {
      name: "Phones & Wearables",
      sub: ["Mobiles", "Smartwatches", "Tablets"],
    },
    {
      name: "Computers & Tablets",
      sub: ["Laptops", "Desktops", "Monitors"],
    },
    {
        name: "Kitchen Appliances",
        sub: ["Mixers", "Air Fryers", "Water Purifiers"],
    },
  ];

  const categoryRoutes = {
    Mobiles: "/category/mobile",
    Laptops: "/category/laptops",
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/product?q=${query}`);
      setData(res.data.product);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const delay = setTimeout(fetchData, 500);
    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    setWindow(value !== "");
  };

  const handleLogout = () => {
    setIsAuth(false);
    setShowPopup(false);
    localStorage.removeItem("token");
    setToken(null);
  };

  const dataForSidebar = [
    { icon: <FaRegUserCircle className="w-5 h-5" />, name: "My Profile", link: "/profile" },
    { icon: <FaRegAddressBook className="w-5 h-5" />, name: "My Address", link: "/address" },
    { icon: <LuCodesandbox className="w-5 h-5" />, name: "My Orders", link: "/" },
    { icon: <PiMedalLight className="w-5 h-5" />, name: "My Rewards", link: "/" },
    { icon: <FaRegHeart className="w-5 h-5" />, name: "My Wishlist", link: "/" },
    { icon: <MdOutlineDevices className="w-5 h-5" />, name: "My Device & Plan", link: "/" },
    { icon: <RiCustomerService2Line className="w-5 h-5" />, name: "My Services Request", link: "/" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-black text-white z-50 shadow-md border-b border-gray-800">
        <nav className="container mx-auto flex items-center justify-between px-5 py-4">
          
          {/* LEFT SECTION */}
          <div className="flex items-center gap-10">
            <Link to="/">
              <img src="../src/assets/images/logo.png" alt="logo" className="w-[120px] md:w-[160px]" />
            </Link>

            {/* --- WRAPPER FOR MENU BUTTON AND DROPDOWN --- */}
            <div className="relative">
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="flex items-center gap-2 hover:text-emerald-400 transition-colors py-2"
                >
                {isOpen ? <IoCloseOutline className="w-8 h-8" /> : <IoMenuOutline className="w-8 h-8" />}
                <span className="hidden md:block font-medium">Menu</span>
                </button>

                {/* DROPDOWN MENU - Now positioned relative to the Menu button */}
                {isOpen && (
                <div className="absolute top-[100%] left-0 w-[300px] md:w-[380px] bg-[#1a1a1a] text-white shadow-2xl border border-gray-800 rounded-b-md animate-in fade-in slide-in-from-top-2 duration-200 z-[60]">
                    <div className="flex flex-col max-h-[70vh] overflow-y-auto custom-scrollbar">
                    
                    {/* Top Static Links */}
                    <div className="p-2">
                        {Links.map((item, idx) => (
                        <Link 
                            key={idx} 
                            to={item.link} 
                            className="flex justify-between items-center px-4 py-3 hover:text-black hover:bg-emerald-400 rounded-md group transition-all"
                        >
                            <span className="text-sm font-medium">{item.name}</span>
                            <FaChevronRight className="w-3 h-3 text-gray-500 group-hover:text-white" />
                        </Link>
                        ))}
                    </div>

                    <div className="bg-gray-900/50 px-6 py-3 border-y border-gray-800">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shop by Category</h3>
                    </div>

                    {/* Dynamic Categories */}
                    <div className="p-2">
                        {categories.map((cat) => (
                        <div key={cat.name} className="border-b border-gray-800 last:border-0">
                            <button
                            onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                            className={`w-full flex justify-between items-center px-4 py-3  hover:text-black hover:bg-emerald-400 rounded-md transition-all ${openCategory === cat.name ? 'text-teal-400' : ''}`}
                            >
                            <span className="text-sm font-medium">{cat.name}</span>
                            <FaChevronRight className={`w-3 h-3 transition-transform duration-300 ${openCategory === cat.name ? 'rotate-90 text-teal-400' : 'text-gray-500'}`} />
                            </button>

                            {/* Subcategories */}
                            {openCategory === cat.name && (
                            <div className="bg-black/40 mx-2 mb-2 rounded-md overflow-hidden">
                                {cat.sub.map((sub) => (
                                <p
                                    key={sub}
                                    onClick={() => {
                                    setIsOpen(false);
                                    navigate(categoryRoutes[sub] || "/");
                                    }}
                                    className="px-8 py-2 text-xs text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer transition-colors"
                                >
                                    {sub}
                                </p>
                                ))}
                            </div>
                            )}
                        </div>
                        ))}
                    </div>
                    </div>
                    
                    {/* Footer inside menu */}
                    <div className="mt-auto border-t border-gray-800 p-4 bg-black rounded-b-md">
                        <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-tighter">
                        © PRAKASH TRADERS
                        </p>
                    </div>
                </div>
                )}
            </div>
          </div>

          {/* SEARCH DESKTOP */}
          <div className="hidden md:flex flex-1 mx-12 relative">
            <SearchBar handleSearch={handleSearch} window={window} data={data} />
            {window && (
              <div className="absolute top-full left-0 bg-white text-black w-full z-10 shadow-xl max-h-[400px] overflow-y-auto">
                {data?.length ? (
                  data.map((e, i) => <ProductCard key={i} {...e} />)
                ) : (
                  <p className="p-4 text-center">No results found</p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">
            <button className="md:hidden" onClick={() => setMobileSearchOpen(!mobileSearchOpen)}>
              <CiSearch className="w-7 h-7" />
            </button>

            <Link to="/wishlist" className="hover:text-teal-400 transition-colors">
              <FaRegHeart className="w-6 h-6" />
            </Link>

            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative py-2"
            >
              <FaUser className="w-6 h-6 cursor-pointer hover:text-teal-400" />
              {isHovered && (
                <div className="absolute right-0 top-full bg-[#1a1a1a] p-2 w-64 z-50 shadow-2xl border border-gray-700">
                  {dataForSidebar.map((e, i) => (
                    <Link key={i} to={e.link} className="flex items-center gap-4 p-3 hover:bg-gray-800 rounded-md transition-all text-sm">
                      {e.icon}
                      {e.name}
                    </Link>
                  ))}
                  <hr className="border-gray-700 my-2" />
                  {token && isAuth ? (
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 hover:bg-red-900/20 text-red-400 text-sm">
                      <AiOutlineLogout /> Logout
                    </button>
                  ) : (
                    <button onClick={() => setShowPopup(true)} className="flex items-center gap-3 w-full p-3 hover:bg-teal-900/20 text-teal-400 text-sm font-semibold">
                      <AiOutlineLogin /> Login
                    </button>
                  )}
                </div>
              )}
            </div>

            <Link to="/cart" className="hover:text-teal-400 transition-colors">
              <FaShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </nav>
      </header>

      {/* MOBILE SEARCH BAR */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full p-4 bg-black z-40 border-b border-gray-800">
          <SearchBar autoFocus />
        </div>
      )}

      {/* LOGIN POPUP */}
      {showPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex justify-center items-center">
          <Account onClose={() => setShowPopup(false)} />
        </div>
      )}

      {/* Spacing for fixed header */}
      <div className="pt-[72px]" />
      
      {/* Background Overlay when menu is open */}
      {isOpen && (
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40" 
            onClick={() => setIsOpen(false)}
          />
      )}
    </>
  );
};

export default Navbar;
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import ProductCard from "../ProductCard";

/* DEMO CATEGORIES */
const categories = [
  {
    name: "ELECTRONICS",
    sub: ["Mobiles", "Laptops", "Headphones", "Cameras"]
  },
  {
    name: "FURNITURE",
    sub: ["Men", "Women", "Kids", "Footwear"]
  },
  {
    name: "HOME APPLIANCES",
    sub: ["Refrigerators", "Washing Machines", "Microwaves"]
  }
];

const SearchBar = ({
  autoFocus = false,
  handleSearch,
  window,
  data
}) => {
  const [showCategory, setShowCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="relative w-full">

      {/* SEARCH BAR CONTAINER */}
      <div className="flex items-center bg-white text-black px-3 py-1 rounded-full border w-full">

        {/* SEARCH INPUT */}
        <input
          type="text"
          autoFocus={autoFocus}
          className="outline-none w-full text-base bg-transparent"
          placeholder={`Search in ${selectedCategory}`}
          onChange={handleSearch}
        />

        {/* CATEGORY SELECTOR */}
        <div className="relative mx-2">
          <button
            type="button"
            onClick={() => setShowCategory(!showCategory)}
            className="flex items-center gap-1 text-sm font-medium px-3 py-1 border rounded-full bg-gray-100 hover:bg-gray-200 whitespace-nowrap"
          >
            {selectedCategory}
            <span className="text-xs">
              {showCategory ? "▲" : "▼"}
            </span>
          </button>

          {/* CATEGORY DROPDOWN */}
          {showCategory && (
            <div className="absolute top-full mt-2 right-0 bg-white shadow-lg border rounded-md w-60 z-20">

              {categories.map((cat, i) => (
                <div key={i} className="border-b last:border-b-0">

                  {/* MAIN CATEGORY */}
                  <button
                    onClick={() =>
                      setOpenCategory(openCategory === i ? null : i)
                    }
                    className="w-full flex justify-between items-center px-3 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                  >
                    {cat.name}
                    <span className="text-xs">
                      {openCategory === i ? "▲" : "▼"}
                    </span>
                  </button>

                  {/* SUB CATEGORIES */}
                  {openCategory === i && (
                    <div className="bg-gray-50">
                      {cat.sub.map((sub, j) => (
                        <button
                          key={j}
                          onClick={() => {
                            setSelectedCategory(sub);
                            setShowCategory(false);
                            setOpenCategory(null);
                          }}
                          className="block w-full text-left px-6 py-1.5 text-sm hover:bg-gray-200"
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              ))}

            </div>
          )}
        </div>

        {/* SEARCH ICON WITH DIFFERENT BG */}
        <button
          type="button"
          className="ml-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
        >
          <CiSearch className="w-6 h-6" />
        </button>

      </div>

      {/* SEARCH RESULTS */}
      {window && (
        <div className="absolute top-full left-0 bg-white border shadow-md w-full mt-2 z-10 max-h-64 overflow-y-auto custom-scrollbar rounded-md">
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <ProductCard key={index} {...item} />
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default SearchBar;

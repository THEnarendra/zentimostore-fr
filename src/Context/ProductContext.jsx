import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { toSlug, fromSlug } from "../utils/Slugify"; // ✅ Import helper functions

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/allProducts`);
      const response = res.data;
      if (res.status === 201 && response.data.length > 0) {
        const allProducts = response.data;

        setProducts(allProducts);
        setFilteredProducts(allProducts);
        processCategories(allProducts);
      } else {
        console.warn("No products found or empty response");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const processCategories = (products) => {
    const categorySet = new Set();
    const subcategoryMap = {};

    products.forEach(({ category, subCategory }) => {
      if (category) {
        categorySet.add(category);
        if (subCategory) {
          if (!subcategoryMap[category]) {
            subcategoryMap[category] = new Set();
          }
          subcategoryMap[category].add(subCategory);
        }
      }
    });

    setCategories([...categorySet]);
    setSubcategories(
      Object.fromEntries(
        Object.entries(subcategoryMap).map(([key, value]) => [key, [...value]])
      )
    );
  };

  const filterByCategory = (categorySlug) => {
    const category = fromSlug(categorySlug); // ✅ Convert slug back to readable name
    setFilteredProducts(products.filter((p) => p.category === category));
  };

  const filterBySubcategory = (categorySlug, subCategorySlug) => {
    const category = fromSlug(categorySlug);
    const subCategory = fromSlug(subCategorySlug);
    setFilteredProducts(
      products.filter((p) => p.category === category && p.subCategory === subCategory)
    );
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        subcategories,
        filteredProducts,
        filterByCategory,
        filterBySubcategory,
        toSlug, // ✅ Exposing `toSlug` for UI usage
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);

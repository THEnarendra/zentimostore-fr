import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";
import { useProducts } from "../../Context/ProductContext";
import Loader from "../Loader/Loader";
import { fromSlug } from "../../utils/Slugify"; 
import '../../MainCss/Posters.css'
import NotFoundPage from "../NotFoundPage";

export const Posters = ({ setFooter, theme, setIsCartOpen }) => {
  const { category, subCategory } = useParams();
  const { categories, products, subcategories, filterByCategory, filterBySubcategory } = useProducts();

  const decodedCategory = fromSlug(category);
  const decodedSubCategory = subCategory ? fromSlug(subCategory) : "Select SubCategory";

  const [selectedSubCategory, setSelectedSubCategory] = useState(decodedSubCategory);
  const [filteredImg, setFilteredImg] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setFooter(true);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (category) {
      if (subCategory) {
        filterBySubcategory(category, subCategory);
      } else {
        filterByCategory(category);
      }
    }
    setTimeout(() => setLoading(false), 500);
  }, [category, subCategory]);

  // **Reset selectedSubCategory when category changes**
  useEffect(() => {
    setSelectedSubCategory(decodedSubCategory);
  }, [category, subCategory]);

  // **Update filtered images when products or category changes**
  useEffect(() => {
    if (!decodedCategory) return;

    if (selectedSubCategory === "Select SubCategory") {
      setFilteredImg(products.filter((p) => p.category === decodedCategory));
    } else {
      setFilteredImg(
        products.filter(
          (p) => p.category === decodedCategory && p.subCategory === selectedSubCategory
        )
      );
    }
  }, [selectedSubCategory, products, category]);

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
  };

  const subCategoryList = subcategories[decodedCategory] ? [...subcategories[decodedCategory]] : [];

  // **If category doesn't exist, show NotFoundPage**
  if (!categories.includes(decodedCategory)) {
    return <NotFoundPage />;
  }

  return (
    <div className="mb-5" style={{ marginTop: "72px", padding: "3%", textAlign: "center" }}>
      <Row style={{ margin: "1% 6% 5% 6%" }}>
        <div className="ms-2 mt-5 mb-5" style={{ display: "flex", flexWrap: "wrap" }}>
          <div className="me-4 d-flex align-items-center">
            <span className="me-4">More:</span>
            <select 
              value={selectedSubCategory} 
              onChange={handleSubCategoryChange} 
              className="Category_Row" 
              style={{ color: theme === "darkTheme" ? "white" : "black" }}
            >
              <option value="Select SubCategory">All {category}</option>
              {subCategoryList.map((sub) => (
                <option key={sub} value={sub} className="Category">
                  {sub}
                </option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : filteredImg.length > 0 ? (
          filteredImg.map((product) => (
            <Col style={{ padding: 6 }} lg={3} md={4} sm={12} xs={6} key={product.id}>
              <ProductCard setIsCartOpen={setIsCartOpen} img={product} />
            </Col>
          ))
        ) : (
          <p>No products found for this category/subcategory.</p>
        )}
      </Row>
    </div>
  );
};

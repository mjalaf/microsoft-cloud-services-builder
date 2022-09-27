import React from "react";
import { Route, Routes, BrowserRouter, useLocation  } from "react-router-dom";

import AddCategory from "../Categories/AddCategory";
import Category from "../Categories/Category";
import CategoryList from "../Categories/CategoryList";

 function DashboardRoutes() {

    return (

        <BrowserRouter>
        <Routes>
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/add" element={<AddCategory />} />
          <Route path="/categories/:id" element={<Category />} />
        </Routes>
      </BrowserRouter>
  

    );
};

export default DashboardRoutes;
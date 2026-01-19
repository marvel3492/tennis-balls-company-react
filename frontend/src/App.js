import './App.css';

import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import About from "./views/About";
import CustomerAddRecordPage from "./views/customer/CustomerAddRecordPage";
import CustomerAllRecordsPage from "./views/customer/CustomerAllRecordsPage";
import CustomerEditRecordPage from './views/customer/CustomerEditRecordPage';
import CustomerOneRecordPage from './views/customer/CustomerOneRecordPage';
import OrderDetailAddRecordPage from "./views/orderdetail/OrderDetailAddRecordPage";
import OrderDetailAllRecordsPage from "./views/orderdetail/OrderDetailAllRecordsPage";
import OrderDetailEditRecordPage from './views/orderdetail/OrderDetailEditRecordPage';
import OrderDetailOneRecordPage from './views/orderdetail/OrderDetailOneRecordPage';
import ProductAddRecordPage from "./views/product/ProductAddRecordPage";
import ProductAllRecordsPage from "./views/product/ProductAllRecordsPage";
import ProductEditRecordPage from "./views/product/ProductEditRecordPage";
import ProductOneRecordPage from './views/product/ProductOneRecordPage';
import PromotionAddRecordPage from "./views/promotion/PromotionAddRecordPage";
import PromotionAllRecordsPage from "./views/promotion/PromotionAllRecordsPage";
import PromotionEditRecordPage from "./views/promotion/PromotionEditRecordPage";
import PromotionOneRecordPage from './views/promotion/PromotionOneRecordPage';
import SaleOrderAddRecordPage from "./views/saleorder/SaleOrderAddRecordPage";
import SaleOrderAllRecordsPage from "./views/saleorder/SaleOrderAllRecordsPage";
import SaleOrderEditRecordPage from "./views/saleorder/SaleOrderEditRecordPage";
import SaleOrderOneRecordPage from './views/saleorder/SaleOrderOneRecordPage';
import Contact from "./views/Contact";
import Error from './views/Error';
import Help from "./views/Help";
import Index from "./views/Index";
import Privacy from "./views/Privacy";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/customer" element={<CustomerAllRecordsPage />} />
          <Route path="/customer/addrecord" element={<CustomerAddRecordPage />} />
          <Route path="/customer/register" element={<CustomerAddRecordPage />} />
          <Route path="/customer/:id/show" element={<CustomerOneRecordPage />} />
          <Route path="/customer/:id/edit" element={<CustomerEditRecordPage />} />
          <Route path="/orderdetail" element={<OrderDetailAllRecordsPage />} />
          <Route path="/orderdetail/addrecord" element={<OrderDetailAddRecordPage />} />
          <Route path="/orderdetail/:id/show" element={<OrderDetailOneRecordPage />} />
          <Route path="/orderdetail/:id/edit" element={<OrderDetailEditRecordPage />} />
          <Route path="/product" element={<ProductAllRecordsPage />} />
          <Route path="/product/addrecord" element={<ProductAddRecordPage />} />
          <Route path="/product/:id/edit" element={<ProductEditRecordPage />} />
          <Route path="/product/:id/show" element={<ProductOneRecordPage />} />
          <Route path="/promotion" element={<PromotionAllRecordsPage />} />
          <Route path="/promotion/addrecord" element={<PromotionAddRecordPage />} />
          <Route path="/promotion/:id/edit" element={<PromotionEditRecordPage />} />
          <Route path="/promotion/:id/show" element={<PromotionOneRecordPage />} />
          <Route path="/saleorder" element={<SaleOrderAllRecordsPage />} />
          <Route path="/saleorder/addrecord" element={<SaleOrderAddRecordPage />} />
          <Route path="/saleorder/:id/edit" element={<SaleOrderEditRecordPage />} />
          <Route path="/saleorder/:id/show" element={<SaleOrderOneRecordPage />} />
          <Route path="*" element={<Error error={{code: "Not Found"}} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

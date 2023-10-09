"use client"
import Header from '@/components/Header'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
import React from "react";
import Invoice from "@/InvoiceComponents/Invoice"; 
import NewWindow from "react-new-window";
import { getCurrentDate, getCurrentTime } from "@/InvoiceComponents/getDateAndTime";
import shopDetails from '@/InvoiceComponents/shopDetails';
import '@/app/page.css';



export default function Home() {
  const [productForm, setProductForm] = useState({})
  const [products, setProducts] = useState([])
  const [allproducts, setAllproducts] = useState([])
  const [userData, setUserdata] = useState([]);
  const [filterdata, setFilterdata] = useState([]);
  const [query, setQuery] = useState('');
  const [billitems, setBillItems] = useState([]);

  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    const getUserdata = async () => {
      const response = await fetch('api/products')
      let rjson = await response.json() ;
      setProducts(rjson.allProducts)
      setAllproducts(rjson.allProducts)

    }
    getUserdata();
  }, []);


  const handlesearch = (event) => {
    const getSearch = event.target.value;

    if (getSearch.length === 0) {
      // Reset to all products and clear the query
      // setProducts(allproducts);
      setProducts([]);
      // setUserdata([]);
      setQuery('');
    } else {

      const searchdata = allproducts.filter((item) => {
        if (typeof item.slug === 'string') {
          return item.slug.toLowerCase().includes(getSearch.toLowerCase());
        }
        return false;
      });
  
      setProducts(searchdata);
      // setUserdata([]);
      setQuery(getSearch);
    }
  };

const additem = (product) => {
    const existingProduct = billitems.find((item) => item.slug === product.slug);
  
    if (existingProduct) {
      // If the product is already in billItems, increase the quantity
      setBillItems((prevBillItems) =>
        prevBillItems.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // If the product is not in billItems, add it with a quantity of 1
      setBillItems((prevBillItems) => [...prevBillItems, { ...product, quantity: 1 }]);
    }
    // setQuery("");
  };
  
  const handleQuantityChange = (id, newQuantity) => {
  setProducts((prevProducts) =>
    prevProducts.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    )
  );
};

  let invoiceNumber = 1;
  const currentDate = getCurrentDate();
  const currentTime = getCurrentTime();
  const [showInvoice, setShowInvoice] = useState(false);

  const toggleInvoice = () => {
    setShowInvoice(!showInvoice);
  };

  const handleClearBillItems = () => {
    setBillItems([]); 
  };
  

  return (
    <>
    <div className="container  w-80% mx-auto my-8 z-0">
      <Header/>
      <div className="container  w-full mx-auto my-8">
          <div className='text-2xl font-semibold mb-3'>Search record Datatable in React Js</div>
        {/* <div className='col-md-12 mt-3 mb-3'> */}
          <div className="col-md-6 w-[100%] text-center ">
            <input type="text" name='name' value={query} className=" flex-1 border border-gray-300 px-4 py-2 rounded-l-md w-[100%]" onChange={(e) => handlesearch(e)} placeholder='Search...' />
 
        <div className="">
        <div className="max-h-64 overflow-y-auto">

          {query && products.length > 0 && (
          <div className='border border-gray-300 rounded-lg shadow-lg p-4 float z-10 '>
          <table className="w-full ">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-none">Product</th>
                    {/* <th className="px-4 py-2 border-none">Quantity</th> */}
                    <th className="px-4 py-2 border-none">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.slug} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-none" onClick={() => additem(product)}>
                        {product.slug}
                      </td>
                      {/* <td className="px-4 py-2 border-none">{product.quantity}</td> */}
                      <td className="px-4 py-2 border-none">₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              )}
      </div>
        </div>
        </div>


        <div className="mt-4">
        <h1 className="text-2xl font-semibold mb-4 z-0"> Bill will be shown here </h1>
          <table className="border-collapse border border-gray-400 w-full z-10">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Price</th>
                {/* <th className="border border-gray-400 p-2">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {billitems.map(product => (
                <tr key={product.slug} className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-2">{product.slug}</td>
                  <td className="border border-gray-400 p-2">{product.quantity}</td>
                  <td className="border border-gray-400 p-2">₹{(parseInt(product.quantity) * parseFloat(product.price)).toFixed(2)}</td>

                </tr>
              )
              )}
            </tbody>
          </table>
        </div>

      <button className="mt-5 mr-3 bg-blue-500 text-white rounded p-2  mt-2"
       onClick={toggleInvoice}>Show Invoice</button>
      {showInvoice && (
          <NewWindow>
          <Invoice
            products={billitems}
            shopDetails={shopDetails}
            invoiceData={{
              currentTime: currentTime,
              currentDate: currentDate,
              invoiceNumber: invoiceNumber
            }}
            />
        </NewWindow>
      )}
      <button className="bg-red-500 text-white rounded p-2 mt-2"
       onClick={handleClearBillItems}>Clear</button>
      </div>
      </div>
    </>

  )
}

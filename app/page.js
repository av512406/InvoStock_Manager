"use client"
import Header from '@/components/Header'
import Image from 'next/image'
import { useState, useEffect } from 'react'

// export default function Home() {
//   const [loading, setLoading] = useState(false)
//   const [loadingaction, setLoadingaction] = useState(false)
//   const [dropdown, setDropdown] = useState([])
//   const [query, setQuery] = useState("")
//   const dropdownOptions = [
//     { value: 'productA', label: 'Product A' },
//     { value: 'productB', label: 'Product B' },
//     { value: 'productC', label: 'Product C' },
//     // Add more options as needed
//   ];

//   const dropdownEdit = async (e) => {
//     let value = e.target.value
//     setQuery(value)
//     if (value.length>3) {
//       setLoading(true)
//       setDropdown([])
//       const response = await fetch('api/search?query=' + query)
//       let rjson = await response.json()
//       // console.log("HERE " + rjson.products)
//       setDropdown(rjson.products)
//       setLoading(false)
//     }
//     else setDropdown([])

//   }
//   return (
//     <>
//       <Header />
//       <div className="container  mx-auto my-8">
//         <div className="mt-8">
//           <div className='text-green-700 text-center'>Alert is here  </div>
//           <h1 className="text-2xl font-semibold">Search a Product</h1>
//           <div className="flex items-center mt-4">
//             <input
//               type="text"
//               onChange={dropdownEdit}
//               className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
//               placeholder="Search by name..."
//             />
//             <select className="border rounded p-2">
//               <option value="">Select an option</option>
//               {dropdownOptions.map(option => (
//                 <option key={option.value} value={option.value}>
//                   {option.label}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             {loading && <div className='flex justify-center items-center '>
//               <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" viewBox="0 0 40 40" className="loading-svg" > <circle cx="20" cy="20" r="18" stroke="#000" strokeWidth="4" fill="none"></circle> <circle cx="20" cy="20" r="18" stroke="#007bff" strokeWidth="4" fill="none" strokeDasharray="90 60" transform="rotate(45 20 20)" > <animateTransform attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="1.5s" repeatCount="indefinite" /> </circle>
//               </svg></div>}
//             <div className='dropcontainer absolute w-[72vw] border border-1 bg-purple-100 rounded-md'>
//               {dropdown.map(items => {
//                 return <div key={items.slug} className='container flex justify-between p-2 my-1 border-b-2 '>
//                   <span className='slug'>{items.slug}({items.quantity} available for ₹{items.price})</span>
//                   <div className='mx-5'>
//                     <button onClick={() => { buttonAction("minus", items.slug, items.quantity) }} disabled={loadingaction} className='substract inline-block px-3 py-1 bg-purple-500 cursor-pointer text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200'>-</button>
//                     <span className='quantity inline-block w-6 mx-3'>{items.quantity}</span>
//                     <button onClick={() => { buttonAction("plus", items.slug, items.quantity) }} disabled={loadingaction} className='add inline-block px-3 py-1 bg-purple-500 cursor-pointer text-white font-semibold rounded-lg shadow-md disabled:bg-purple-200'>+</button>
//                   </div>
//                 </div>
//               })}

//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

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

  // const handlesearch = (event) => {
  //   const getSearch = event.target.value;
  //   if (getSearch.length > 0) {
  //     // const searchdata = products.filter((item) => item.slug.toLowerCase().includes(getSearch));
  //     const searchdata = products.filter((item) => {
  //       if (typeof item.slug === 'string') {
  //         return item.slug.toLowerCase().includes(getSearch.toLowerCase());
  //       }
  //       return false; // Handle non-string slugs gracefully if needed
  //     });
  //     console.log(searchdata) ;
  //     if(!searchdata) setProducts(allproducts);
  //     else setProducts(searchdata) ;
  //     // setUserdata(searchdata);
  //     // setProducts(searchdata.allProducts)
  //   } else {
  //     // setUserdata(filterdata);
  //     setUserdata([]);
  //   }
  //   setQuery(getSearch);
  // }
  const handlesearch = (event) => {
    const getSearch = event.target.value;
  
    // Check if the search input is empty
    if (getSearch.length === 0) {
      // Reset to all products and clear the query
      // setProducts(allproducts);
      setProducts([]);
      // setUserdata([]);
      setQuery('');
    } else {
      // Perform the search and update products
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
    setBillItems((prevBillItems) => [...prevBillItems, product]);
  }
  const handleQuantityChange = (id, newQuantity) => {
  setProducts((prevProducts) =>
    prevProducts.map((product) =>
      product.id === id ? { ...product, quantity: newQuantity } : product
    )
  );
};
  

  return (
    <>
  <Header/>
      <div className="container  w-full mx-auto my-8">
          <div className='mb-3'>Search record Datatable in React Js</div>
        {/* <div className='col-md-12 mt-3 mb-3'> */}
          <div className="col-md-6 w-[100%] text-center ">
            <input type="text" name='name' value={query} className=" flex-1 border border-gray-300 px-4 py-2 rounded-l-md w-[100%]" onChange={(e) => handlesearch(e)} placeholder='Search...' />
            
          {/* </div> */}
        {/* </div> */}

        {/* <h1 className="text-2xl font-semibold mb-4"> Displaying Current Stock</h1> */}

        <div className="">
        <div className="max-h-64 overflow-y-auto">
          {/* <table className="w-full table-auto">
          <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Quantity Available</th>
                <th className="border border-gray-400 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.slug} className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-2" onClick={() => additem(product)}>
                    {product.slug}
                  </td>
                  <td className="border border-gray-400 p-2">{product.quantity}</td>
                  <td className="border border-gray-400 p-2">₹{product.price}</td>
                </tr>
              ))}
            </tbody>
          </table> */}
          {query && products.length > 0 && (
          <div className='border border-gray-300 rounded-lg shadow-lg p-4 float'>
          <table className="w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-none">Product</th>
                    <th className="px-4 py-2 border-none">Quantity</th>
                    <th className="px-4 py-2 border-none">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.slug} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border-none">{product.slug}</td>
                      <td className="border border-gray-400 p-2">
                            {editProductId === product.id ? (
                              <input
                                type="number"
                                value={product.quantity}
                                onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                              />
                            ) : (
                              product.quantity
                            )}
                      </td>
                      <td className="px-4 py-2 border-none">₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
              )}
      </div>
          {/* <table className="border-collapse border border-gray-400 w-full"> */}
            {/* <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Price</th>
              </tr>
            </thead> */}
            {/* <tbody> */}
              {/* {products.map(product => (
                <tr key={product.slug} className="hover:bg-gray-50 ">
                  
                  <td className="border border-gray-400 p-2" onClick={() => additem(product)}>
                  {product.slug}</td>
                  <td className="border border-gray-400 p-2">{product.quantity}</td>
                  <td className="border border-gray-400 p-2">₹{product.price}</td>
                </tr>
              )
              )} */}
              {/* {products.map(product => (
                <div key={product.slug} className="relative">
                  
                  <button className="block w-full text-left border border-gray-400 p-2 hover:bg-gray-50" onClick={() => additem(product)}>
                    {product.slug}
                  </button>

                  <div className="absolute hidden mt-2 py-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <div className="px-4 py-2">
                      <p className="text-gray-700">Quantity: {product.quantity}</p>
                      <p className="text-gray-700">Price: ₹{product.price}</p>
                    </div>
                    </div>
                    </div>
                  ))} */}
              
                  {/* </tbody>
                </table> */}
        </div>
        </div>


        <div className="mt-4">
        <h1 className="text-2xl font-semibold mb-4"> Bill will be shown here </h1>
          <table className="border-collapse border border-gray-400 w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 p-2">Product Name</th>
                <th className="border border-gray-400 p-2">Quantity</th>
                <th className="border border-gray-400 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {billitems.map(product => (
                <tr key={product.slug} className="hover:bg-gray-50">
                  <td className="border border-gray-400 p-2">{product.slug}</td>
                  {/* <td className="border border-gray-400 p-2">{product.quantity}</td> */}
                  <td className="border border-gray-400 p-2">
                    <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(e, index)}
                      />
                  </td>
                  <td className="border border-gray-400 p-2">₹{product.price}</td>
                </tr>
              )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>

  )
}

// export default function Home() {
//   const [productForm, setProductForm] = useState({})
//     const [products, setProducts] = useState([])
//     const [allproducts, setAllproducts] = useState([])
//   const [userData, setUserdata] = useState([]);
//   const [filterdata, setFilterdata] = useState([]);
//   const [query, setQuery] = useState('');


//   useEffect(() => {
//     const getUserdata = async () => {
//       // const reqData = await fetch("/api/products");
//       // const resData = await reqData.json();
//       // console.log(resData.allproducts);
//       // // setUserdata(resData);
//       // setFilterdata(resData.allproducts);
//       const response = await fetch('api/products')
//       let rjson = await response.json() ;
//       setProducts(rjson.allProducts)
//       setAllproducts(rjson.allProducts)

//     }
//     getUserdata();
//   }, []);

//   // const handlesearch = (event) => {
//   //   const getSearch = event.target.value;
//   //   if (getSearch.length > 0) {
//   //     // const searchdata = products.filter((item) => item.slug.toLowerCase().includes(getSearch));
//   //     const searchdata = products.filter((item) => {
//   //       if (typeof item.slug === 'string') {
//   //         return item.slug.toLowerCase().includes(getSearch.toLowerCase());
//   //       }
//   //       return false; // Handle non-string slugs gracefully if needed
//   //     });
//   //     console.log(searchdata) ;
//   //     if(!searchdata) setProducts(allproducts);
//   //     else setProducts(searchdata) ;
//   //     // setUserdata(searchdata);
//   //     // setProducts(searchdata.allProducts)
//   //   } else {
//   //     // setUserdata(filterdata);
//   //     setUserdata([]);
//   //   }
//   //   setQuery(getSearch);
//   // }
//   const handlesearch = (event) => {
//     const getSearch = event.target.value;
  
//     // Check if the search input is empty
//     if (getSearch.length === 0) {
//       // Reset to all products and clear the query
//       setProducts(allproducts);
//       // setUserdata([]);
//       setQuery('');
//     } else {
//       // Perform the search and update products
//       const searchdata = allproducts.filter((item) => {
//         if (typeof item.slug === 'string') {
//           return item.slug.toLowerCase().includes(getSearch.toLowerCase());
//         }
//         return false;
//       });
  
//       setProducts(searchdata);
//       // setUserdata([]);
//       setQuery(getSearch);
//     }
//   };
  

//   return (
//     <>
//   <Header/>
//       <div className="container  mx-auto my-8">
//         <div className='col-md-12 mt-3 mb-3'>
//           <h3 className='mb-3'>Search record Datatable in React Js</h3>
//           <div className="col-md-6">
//             <input type="text" name='name' value={query} className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md" onChange={(e) => handlesearch(e)} placeholder='Search...' />
//             {/* <input
//               type="text"
//               name = "name"
//               value = {query}
//               onChange={(e) => handlesearch(e)}
//               className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
//               placeholder="Search by name..."
//             /> */}
//           </div>
//         </div>

//         <h1 className="text-2xl font-semibold mb-4"> Displaying Current Stock</h1>

//         <div className="mt-4">
//           <table className="border-collapse border border-gray-400 w-full">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border border-gray-400 p-2">Product Name</th>
//                 <th className="border border-gray-400 p-2">Quantity</th>
//                 <th className="border border-gray-400 p-2">Price</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map(product => (
//                 <tr key={product.slug} className="hover:bg-gray-50">
//                   <td className="border border-gray-400 p-2">{product.slug}</td>
//                   <td className="border border-gray-400 p-2">{product.quantity}</td>
//                   <td className="border border-gray-400 p-2">₹{product.price}</td>
//                 </tr>
//               )
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>

//   )
// }
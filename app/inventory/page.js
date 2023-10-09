"use client"
import Header from "@/components/Header";
import { useState, useEffect } from 'react'
import '@/app/page.css';

export default function Home() {

    const [productForm, setProductForm] = useState({})
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('api/products')
            let rjson = await response.json()
            setProducts(rjson.allProducts)
        }
        fetchProducts()
    }, [])

    const addProduct = async (e) => {
        e.preventDefault();
        if (!productForm.slug || !productForm.quantity || !productForm.price) {
          console.log('Please fill out all form fields.');
          return; 
        }
    
        try {
          const response = await fetch('/api/products', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productForm)
          });
    
          if (response.ok) {
            // Product added successfully
            console.log('Product added successfully');
            // setAlert("Your Product has been added.");
            setProducts([...products, productForm]);
            setProductForm({ slug: '', quantity: '', price: '' });
            // You can also perform additional actions here, like updating the UI or fetching updated data
          } else {
            console.error('Error adding product:', response.statusText);
          }
        } catch (error) {
          console.error('Error adding product:', error);
        }
        const response = await fetch('api/products')
        let rjson = await response.json()
        setProducts(rjson.allProducts)
      }
      const handleChange = (e) => {
        setProductForm({ ...productForm, [e.target.name]: e.target.value })
      }

    return (
        <>
            <div className="container  w-100% mx-auto my-8 z-0">
            <Header/>
            <div className="container  w-full mx-auto my-8">
                <div className="container my-8  mx-auto">
                    <h1 onClick={addProduct} className="text-2xl font-semibold mb-4">Add a product</h1>
                    <div className="mt-4">
                        <form>
                            <label className="block mb-2">Product Slug</label>
                            <input value={productForm?.slug || ""} name='slug' onChange={handleChange} type="text" className="border rounded p-2 w-full" />

                            <label className="block my-2">Quantity:</label>
                            <input value={productForm?.quantity || ""} name='quantity' onChange={handleChange} type="number" className="border rounded p-2 w-full" />

                            <label className="block my-2">Price:</label>
                            <input value={productForm?.price || ""} name='price' onChange={handleChange} type="number" className="border rounded p-2 w-full" />

                            <button onClick={addProduct} type="submit" className="bg-blue-500 text-white rounded p-2 mt-2">
                                Add Product
                            </button>
                        </form>
                    </div>
                </div>
                <div className="container  mx-auto my-8">

                    <h1 className="text-2xl font-semibold mb-4"> Displaying Current Stock</h1>

                    <div className="mt-4">
                        <table className="border-collapse border border-gray-400 w-full">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border border-gray-400 p-2">Product Name</th>
                                    <th className="border border-gray-400 p-2">Quantity</th>
                                    <th className="border border-gray-400 p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.slug} className="hover:bg-gray-50">
                                        <td className="border border-gray-400 p-2">{product.slug}</td>
                                        <td className="border border-gray-400 p-2">{product.quantity}</td>
                                        <td className="border border-gray-400 p-2">₹{product.price}</td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         </div>
        </>
    )
}
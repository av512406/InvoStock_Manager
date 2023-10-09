import React from "react";
import numberToWords from "@/InvoiceComponents/numberToWords";
import "@/InvoiceComponents/Invoice.css";

const Invoice = ({ products, shopDetails, invoiceData }) => {
  const { currentTime, currentDate, invoiceNumber } = invoiceData;

  const totalCost = products.reduce((total, product) => {
    return total + product.quantity * product.price;
  }, 0);
  const totalInWords = numberToWords(Math.floor(totalCost)) + " Rupees ";
  const itemCount = products.reduce((count, product) => {
    return count + product.quantity;
  }, 0);

  return (
    <div id="print-invoice" className="invoice">
      <div className="header">
        <div>
          <h1 className="shop-title">"THE GRAND BAITHAK" </h1>
          {shopDetails.add1} <br /> {shopDetails.add2}
          <br />
          Phone: {shopDetails.phoneNo}
          <br />
        </div>
        <hr className="line" />

        <div className="shop-details">
          <div>Customer:CASH</div>
          <div>Bill No. {invoiceNumber}</div>
        </div>
        <div className="shop-details">
          <div>Mobile:</div>
          <div>Date: {currentDate}</div>
        </div>
        <div className="shop-details">
          <div>Waiter: </div>
          <div>Time: {currentTime}</div>
        </div>
        <hr className="line" />
      </div>
      <table className="invoice-table border border-collapse ">
        <thead>
          <tr>
            <th>S. Description</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.slug}</td>
              <td>{product.quantity}</td>
              {/* <td>₹{product.price.toFixed(2)}</td> */}
              <td>₹{parseFloat(product.price).toFixed(2)}</td>
              <td>₹{(parseInt(product.quantity) * parseFloat(product.price)).toFixed(2)}</td>

            </tr>
          ))}
        </tbody>
      </table>
      <hr className="line" />

      <div className="shop-details py-1 ">
        <div>Item Qty: {itemCount}</div>
        <div>Round off: 0.00</div>
      </div>
      <div className="shop-details py-1">
        <div>G.TOTAL:</div>
        <div>₹{totalCost}</div>
      </div>
      <hr className="line" />
      <div className="shop-details py-1">
        <div>{totalInWords} only</div>
      </div>
      {/* <hr className='line'/> */}
      <div className="terms-container">
        <div>
          Terms & Conditions:-
          <br />
          <i>"{shopDetails.name}" </i>
          <br />
          <i>!!! Thanks !!! Visie Again !!! </i>{" "}
        </div>
      </div>
    </div>
  );
};
export default Invoice;

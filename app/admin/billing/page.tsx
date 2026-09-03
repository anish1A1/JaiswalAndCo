"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface BillItem {
  id: string;
  name: string;
  mrp: number;
  qty: number;
  customerPercent: number; // e.g., 23 for 1.23 factor
  nonTaxRate: number;       // (mrp / customerPercentFactor) / 1.13 rounded to 2 decimals
  subTotal: number;         // qty * nonTaxRate
}

export default function VatBillingGenerator() {
  const router = useRouter();

  // --- Controlled Form State ---
  const [productName, setProductName] = useState<string>("");
  const [mrp, setMrp] = useState<number | "">("");
  const [qty, setQty] = useState<number | "">(1);
  const [customerPercent, setCustomerPercent] = useState<number>(23); // Default to 1.23 factor (23%)
  const [customerDiscountPercent, setCustomerDiscountPercent] = useState<number | "">("");

  // --- Temporary Items List Store ---
  const [itemsList, setItemsList] = useState<BillItem[]>([]);

  // --- Safe Evaluators for Live Preview ---
  const inputMrp = Number(mrp) || 0;
  const inputQty = Number(qty) || 0;
  const custPercentFactor = 1 + customerPercent / 100; // e.g., 1.23

  // Core Math Logic: non-tax-rate = (mrp / customerPercentFactor) / 1.13
  const rateWithVat = inputMrp / custPercentFactor;
  const liveNonTaxRate = Number((rateWithVat / 1.13).toFixed(2));
  const liveSubTotal = liveNonTaxRate * inputQty;

  // --- Add Item Handler ---
  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName.trim()) {
      alert("Please provide a valid product name.");
      return;
    }
    if (inputMrp <= 0 || inputQty <= 0) {
      alert("MRP and Quantity must be greater than zero.");
      return;
    }

    const newItem: BillItem = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9),
      name: productName.trim(),
      mrp: inputMrp,
      qty: inputQty,
      customerPercent,
      nonTaxRate: liveNonTaxRate,
      subTotal: liveSubTotal,
    };

    setItemsList((prev) => [...prev, newItem]);

    // Reset local fields but retain customer margin constants
    setProductName("");
    setMrp("");
    setQty(1);
  };

  const handleRemoveItem = (targetId: string) => {
    setItemsList((prev) => prev.filter((item) => item.id !== targetId));
  };

  // --- Final Billing Ledger Computations ---
  const totalNonTaxSubtotal = itemsList.reduce((acc, item) => acc + item.subTotal, 0);
  const discountPercent = Number(customerDiscountPercent) || 0;
  const discountAmount = (totalNonTaxSubtotal * discountPercent) / 100;
  const taxableAmountAfterDiscount = totalNonTaxSubtotal - discountAmount;
  const vatAmount = taxableAmountAfterDiscount * 0.13; // 13% VAT added to total
  const grandTotal = taxableAmountAfterDiscount + vatAmount;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Top Navigation & Header */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-2">
            <button 
              onClick={() => router.back()} 
              className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg text-xs transition inline-flex items-center gap-1 font-bold"
            >
              ⬅️ Back
            </button>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">VAT Billing Invoice Console</h1>
            <p className="text-sm text-slate-500">
              Generate standardized tax-compliant billing grids with structured multi-layered deductions.
            </p>
          </div>
          <div className="bg-blue-600 px-6 py-4 rounded-xl text-white font-semibold flex items-center justify-between gap-6 shadow-sm min-w-65 self-start md:self-auto">
            <span className="text-xs uppercase tracking-wider opacity-85 font-medium">Grand Total (Inc. VAT):</span>
            <span className="text-2xl font-mono">Rs. {grandTotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Core Billing Framework Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Item Generation Input Panel */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-4">
            <h2 className="text-base font-semibold text-slate-900 border-b pb-2 border-slate-100">
              Billing Entry Matrix
            </h2>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Product Description Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., King Tomato Ketchup (2.5kg)"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Product MRP (Rs.)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    placeholder="405"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value !== "" ? Number(e.target.value) : "")}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    step="1"
                    value={qty}
                    onChange={(e) => setQty(e.target.value !== "" ? Number(e.target.value) : "")}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                  Customer Percentage Markup
                </label>
                <div className="relative rounded-md shadow-sm">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm">1.</span>
                  <input
                    type="number"
                    required
                    min="0"
                    max="100"
                    value={customerPercent}
                    onChange={(e) => setCustomerPercent(Number(e.target.value))}
                    className="w-full rounded-lg border border-slate-200 pl-7 pr-3 py-2 text-sm font-mono focus:border-blue-500 focus:outline-none transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Entering 23 configures an item divisor of 1.23</p>
              </div>

              {/* Real-time Math Feedback Loop */}
              {inputMrp > 0 && (
                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-lg text-xs space-y-1 text-slate-700">
                  <div className="font-bold text-blue-900 border-b border-blue-100/50 pb-1 mb-1">
                    Invoice Stream Math
                  </div>
                  <div className="flex justify-between">
                    <span>Non-Taxable Unit Rate:</span>
                    <span className="font-mono font-semibold">Rs. {liveNonTaxRate.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-blue-950 font-bold border-t border-dashed pt-1 mt-1 border-blue-200">
                    <span>Row Subtotal ({inputQty}x):</span>
                    <span className="font-mono">Rs. {liveSubTotal.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all text-sm shadow-sm"
              >
                Add Item To Invoice
              </button>
            </form>
          </div>

          {/* Right Invoice Table Log & Financial Summary Stack */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 lg:col-span-2 flex flex-col space-y-6 min-h-115">
            <h2 className="text-base font-semibold text-slate-900 border-b pb-2 border-slate-100 flex items-center justify-between">
              <span>Tax Invoice Register Ledger</span>
              <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full text-slate-500 font-mono">
                {itemsList.length} Items Totaled
              </span>
            </h2>

            {itemsList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-100 rounded-xl">
                <p className="text-slate-400 text-sm font-medium">Invoice is currently empty.</p>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  Populate items using the left panel form interface to produce your dynamic tax billing document.
                </p>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto flex-1">
                  <table className="w-full text-left border-collapse text-sm min-w-150">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                        <th className="py-3 px-3">Product Description</th>
                        <th className="py-3 px-2 text-center">Qty</th>
                        <th className="py-3 px-2 text-right">MRP</th>
                        <th className="py-3 px-2 text-right">Divisor</th>
                        <th className="py-3 px-2 text-right">Non-Tax Rate</th>
                        <th className="py-3 px-3 text-right">Subtotal</th>
                        <th className="py-3 px-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {itemsList.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-all">
                          <td className="py-3 px-3 font-semibold text-slate-900">{item.name}</td>
                          <td className="py-3 px-2 text-center font-mono text-slate-600">{item.qty}</td>
                          <td className="py-3 px-2 text-right font-mono text-slate-500">Rs.{item.mrp.toFixed(2)}</td>
                          <td className="py-3 px-2 text-right font-mono text-slate-500">1.{item.customerPercent}</td>
                          <td className="py-3 px-2 text-right font-mono text-slate-600">Rs.{item.nonTaxRate.toFixed(2)}</td>
                          <td className="py-3 px-3 text-right font-mono font-semibold text-slate-900">
                            Rs.{item.subTotal.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-slate-400 hover:text-rose-600 text-xs font-semibold px-2 py-1 rounded-md transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Bottom Total Segment Summary Calculator Section */}
                <div className="border-t border-slate-200 pt-4 bg-slate-50/50 p-4 rounded-xl space-y-3 max-w-md ml-auto w-full">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Total Taxable Subtotal:</span>
                    <span className="font-mono font-semibold">Rs. {totalNonTaxSubtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-1 border-y border-dashed border-slate-200">
                    <span className="text-sm text-slate-600 whitespace-nowrap">Customer Discount (%):</span>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      placeholder="0.00"
                      value={customerDiscountPercent}
                      onChange={(e) => setCustomerDiscountPercent(e.target.value !== "" ? Number(e.target.value) : "")}
                      className="w-24 text-right rounded-md border border-slate-200 px-2 py-1 text-xs font-mono focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-sm text-rose-600">
                      <span>Deducted Discount ({discountPercent}%):</span>
                      <span className="font-mono">-Rs. {discountAmount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Net Taxable Base Amount:</span>
                    <span className="font-mono font-semibold">Rs. {taxableAmountAfterDiscount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm text-blue-600">
                    <span>VAT Addition (13%):</span>
                    <span className="font-mono font-semibold">+Rs. {vatAmount.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-slate-900 border-t border-slate-300 pt-2">
                    <span>Grand Total:</span>
                    <span className="font-mono text-blue-600">Rs. {grandTotal.toFixed(2)}</span>
                  </div>
                </div>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

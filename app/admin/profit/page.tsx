"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ProductItem {
  id: string;
  name: string;
  mrp: number;
  qty: number;
  sellingPercent: number;
  ownedPercent: number;
  customerDiscount: number;
  ownerDiscount: number;
  rateWithVat: number;
  baseCost: number;
  profitPerUnit: number;
  totalProfit: number;
}

export default function AdminProfitCalculator() {
  // =========================
  // Form States
  // =========================

  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [mrp, setMrp] = useState<number | "">("");
  const [qty, setQty] = useState<number | "">(1);

  const [sellingPercent, setSellingPercent] = useState<number>(23);
  const [ownedPercent, setOwnedPercent] = useState<number>(33);

  const [customerDiscount, setCustomerDiscount] = useState<number | "">("");
  const [ownerDiscount, setOwnerDiscount] = useState<number | "">("");

  // =========================
  // Temporary Worklist
  // =========================

  const [itemsList, setItemsList] = useState<ProductItem[]>([]);

  // =========================
  // Input Normalization
  // =========================

  const inputMrp = Number(mrp) || 0;
  const inputQty = Number(qty) || 0;
  const custDisc = Number(customerDiscount) || 0;
  const ownDisc = Number(ownerDiscount) || 0;

  // =========================
  // Calculations
  // =========================

  // Rate with VAT
  let rateWithVat = inputMrp / (1 + sellingPercent / 100);

  if (custDisc > 0) {
    rateWithVat = rateWithVat * (1 - custDisc / 100);
  }

  // Base Cost
  let baseCost = inputMrp / (1 + ownedPercent / 100);

  if (ownDisc > 0) {
    baseCost = baseCost * (1 - ownDisc / 100);
  }

  // Profit
  const profitPerUnit = rateWithVat - baseCost;
  const totalProfit = profitPerUnit * inputQty;

  // =========================
  // Add Item
  // =========================

  const handleAddItem = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName.trim() || !inputMrp || inputQty <= 0) {
      alert("Please fill out Product Name, MRP, and a valid Quantity.");
      return;
    }

    const newItem: ProductItem = {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(),

      name: productName.trim(),
      mrp: inputMrp,
      qty: inputQty,
      sellingPercent,
      ownedPercent,
      customerDiscount: custDisc,
      ownerDiscount: ownDisc,
      rateWithVat,
      baseCost,
      profitPerUnit,
      totalProfit,
    };

    setItemsList((prev) => [...prev, newItem]);

    // Clear product-specific inputs
    setProductName("");
    setMrp("");
    setQty(1);
    setCustomerDiscount("");
    setOwnerDiscount("");

    // Percentages are intentionally kept
  };

  // =========================
  // Remove Single Item
  // =========================

  const handleRemoveItem = (id: string) => {
    setItemsList((prev) => prev.filter((item) => item.id !== id));
  };

  // =========================
  // Clear All Items
  // =========================

  const handleClearAllItems = () => {
    setItemsList([]);
  };

  // =========================
  // Total Profit
  // =========================

  const globalTotalProfit = itemsList.reduce(
    (sum, item) => sum + item.totalProfit,
    0
  );

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-[#F8F7F3] p-4 sm:p-6 text-[#202722] font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* =========================
            Header
        ========================== */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#E3E8E2] pb-5">

          <div>
              <button 
                onClick={() => router.back()} 
                className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl text-xs sm:text-sm transition flex items-center gap-1"
              >
                ⬅️ Dashboard
              </button>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#173B2B]">
              Admin Profit Calculator
            </h1>

            <p className="text-sm text-[#7B847D] mt-1">
              Configure margins, discounts, and keep a temporary log of
              transactions.
            </p>
          </div>

          {/* Total Profit */}

          <div className="bg-[#1F5C3A] px-5 sm:px-6 py-3 rounded-xl text-white shadow-sm flex items-center justify-between gap-4">

            <span className="text-xs opacity-80 uppercase tracking-wider font-semibold">
              Total Profit
            </span>

            <span className="text-xl sm:text-2xl font-black">
              Rs. {globalTotalProfit.toFixed(2)}
            </span>

          </div>
        </div>

        {/* =========================
            Main Layout
        ========================== */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* =========================
              Form Section
          ========================== */}

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_2px_12px_rgba(23,59,43,0.05)] border border-[#E6E8E3] lg:col-span-1 h-fit">

            <div className="border-b border-[#ECEDE8] pb-3 mb-5">
              <h2 className="text-lg font-bold text-[#173B2B]">
                Add New Product
              </h2>

              <p className="text-xs text-[#89918B] mt-1">
                Enter product details to calculate your profit.
              </p>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">

              {/* Product Name */}

              <div>
                <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                  Product Name
                </label>

                <input
                  type="text"
                  required
                  placeholder="e.g., Tomato Ketchup"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full rounded-lg border border-[#D9DED8] bg-white px-3 py-2.5 text-sm outline-none transition-all placeholder:text-[#A5ACA7] focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                />
              </div>

              {/* MRP + Quantity */}

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Product MRP (Rs.)
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    placeholder="405"
                    value={mrp}
                    onChange={(e) =>
                      setMrp(
                        e.target.value !== "" ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full rounded-lg border border-[#D9DED8] px-3 py-2.5 text-sm outline-none transition-all focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Quantity
                  </label>

                  <input
                    type="number"
                    min="1"
                    required
                    value={qty}
                    onChange={(e) =>
                      setQty(
                        e.target.value !== "" ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full rounded-lg border border-[#D9DED8] px-3 py-2.5 text-sm outline-none transition-all focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                  />
                </div>

              </div>

              {/* Selling + Owned Ratio */}

              <div className="grid grid-cols-2 gap-3 bg-[#F5F7F3] p-3 rounded-xl border border-[#E6EAE4]">

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Selling Ratio (X %)
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#89918B] text-sm">
                      1.
                    </div>

                    <input
                      type="number"
                      required
                      min="0"
                      value={sellingPercent}
                      onChange={(e) =>
                        setSellingPercent(Number(e.target.value))
                      }
                      className="w-full rounded-lg border border-[#D9DED8] pl-7 pr-3 py-2.5 text-sm outline-none focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Owned Ratio (Y %)
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#89918B] text-sm">
                      1.
                    </div>

                    <input
                      type="number"
                      required
                      min="0"
                      value={ownedPercent}
                      onChange={(e) =>
                        setOwnedPercent(Number(e.target.value))
                      }
                      className="w-full rounded-lg border border-[#D9DED8] pl-7 pr-3 py-2.5 text-sm outline-none focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                    />
                  </div>
                </div>

              </div>

              {/* Discounts */}

              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Cust. Discount (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="Optional"
                    value={customerDiscount}
                    onChange={(e) =>
                      setCustomerDiscount(
                        e.target.value !== "" ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full rounded-lg border border-[#D9DED8] px-3 py-2.5 text-sm outline-none focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#59645D] uppercase tracking-wider mb-1.5">
                    Owner Discount (%)
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    placeholder="Optional"
                    value={ownerDiscount}
                    onChange={(e) =>
                      setOwnerDiscount(
                        e.target.value !== "" ? Number(e.target.value) : ""
                      )
                    }
                    className="w-full rounded-lg border border-[#D9DED8] px-3 py-2.5 text-sm outline-none focus:border-[#1F5C3A] focus:ring-2 focus:ring-[#1F5C3A]/10"
                  />
                </div>

              </div>

              {/* =========================
                  Live Calculation Preview
              ========================== */}

              {inputMrp > 0 && (
                <div className="mt-4 p-4 bg-[#EAF3ED] border border-[#D6E8DA] rounded-xl text-xs space-y-2 text-[#405048]">

                  <p className="font-bold text-sm text-[#173B2B] mb-2">
                    Live Calculation Preview
                  </p>

                  <div className="flex justify-between gap-3">
                    <span>Rate + VAT (Customer Cost/Unit)</span>

                    <span className="font-mono font-semibold text-[#26352D]">
                      Rs. {rateWithVat.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>My Base Cost/Unit</span>

                    <span className="font-mono font-semibold text-[#26352D]">
                      Rs. {baseCost.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>Margin/Unit</span>

                    <span
                      className={`font-mono font-bold ${
                        profitPerUnit >= 0
                          ? "text-[#1F7A4D]"
                          : "text-rose-600"
                      }`}
                    >
                      Rs. {profitPerUnit.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-2 mt-1 border-t border-[#CFE3D5] flex justify-between gap-3 text-sm font-bold text-[#173B2B]">
                    <span>Estimated Line Profit</span>

                    <span className="font-mono">
                      Rs. {totalProfit.toFixed(2)}
                    </span>
                  </div>

                </div>
              )}

              {/* Add Button */}

              <button
                type="submit"
                className="w-full bg-[#1F5C3A] hover:bg-[#174A2E] text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-150 text-sm shadow-sm active:scale-[0.98]"
              >
                Add Row to Worklist
              </button>

            </form>
          </div>

          {/* =========================
              Right Main Ledger
          ========================== */}

          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-[0_2px_12px_rgba(23,59,43,0.05)] border border-[#E6E8E3] lg:col-span-2 flex flex-col min-h-115">

            {/* Ledger Header */}

            <div className="border-b border-[#ECEDE8] pb-3 flex items-center justify-between mb-4 gap-3">

              <h2 className="text-base font-bold text-[#173B2B] flex items-center gap-2">

                <span>Temporary Document Register</span>

                <span className="text-xs bg-[#F1F3EE] px-2 py-0.5 rounded-full text-[#737D76] font-mono">
                  {itemsList.length} Rows
                </span>

              </h2>

              {itemsList.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllItems}
                  className="text-xs text-[#89918B] hover:text-rose-600 font-semibold transition-colors"
                >
                  Clear Register
                </button>
              )}

            </div>

            {/* Empty State */}

            {itemsList.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-[#E5E9E4] rounded-xl bg-[#FCFCFA]">

                <div className="h-12 w-12 rounded-full bg-[#EAF3ED] flex items-center justify-center mb-3 text-xl">
                  📋
                </div>

                <p className="text-[#59645D] text-sm font-semibold">
                  Workspace table is empty.
                </p>

                <p className="text-xs text-[#89918B] mt-1 max-w-xs leading-relaxed">
                  Fill out the product form to populate your transaction
                  calculations.
                </p>

              </div>
            ) : (

              /* =========================
                  Table
              ========================== */

              <div className="overflow-x-auto flex-1 -mx-5 sm:-mx-6 px-5 sm:px-6">

                <table className="w-full text-left border-collapse text-sm min-w-190">

                  <thead>
                    <tr className="border-b border-[#E3E8E2] bg-[#F7F8F5] text-[#737D76] text-xs font-bold uppercase tracking-wider">

                      <th className="py-3 px-3">
                        Product Item Line
                      </th>

                      <th className="py-3 px-2 text-center">
                        Qty
                      </th>

                      <th className="py-3 px-2 text-right">
                        MRP
                      </th>

                      <th className="py-3 px-2 text-right">
                        Rate + VAT
                      </th>

                      <th className="py-3 px-2 text-right">
                        Base Cost
                      </th>

                      <th className="py-3 px-3 text-right text-[#1F7A4D]">
                        Total Profit
                      </th>

                      <th className="py-3 px-3 text-center">
                        Action
                      </th>

                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#ECEDE8]">

                    {itemsList.map((item) => (
                      <tr
                        key={item.id}
                        className="hover:bg-[#FAFBF8] transition-colors group"
                      >

                        {/* Product */}

                        <td className="py-3 px-3">

                          <div className="font-semibold text-[#26352D]">
                            {item.name}
                          </div>

                          {(item.customerDiscount > 0 ||
                            item.ownerDiscount > 0) && (

                            <div className="flex flex-wrap gap-2 mt-1 text-[10px] font-mono">

                              {item.customerDiscount > 0 && (
                                <span className="bg-[#EAF3ED] text-[#1F5C3A] px-1.5 py-0.5 rounded">
                                  Cust: -{item.customerDiscount}%
                                </span>
                              )}

                              {item.ownerDiscount > 0 && (
                                <span className="bg-[#FDF4DF] text-[#A56A00] px-1.5 py-0.5 rounded">
                                  Own: -{item.ownerDiscount}%
                                </span>
                              )}

                            </div>
                          )}

                        </td>

                        {/* Quantity */}

                        <td className="py-3 px-2 text-center font-mono text-[#59645D]">
                          {item.qty}
                        </td>

                        {/* MRP */}

                        <td className="py-3 px-2 text-right font-mono text-[#737D76]">
                          Rs.{item.mrp.toFixed(2)}
                        </td>

                        {/* Rate */}

                        <td className="py-3 px-2 text-right font-mono text-[#59645D]">
                          Rs.{item.rateWithVat.toFixed(2)}
                        </td>

                        {/* Base Cost */}

                        <td className="py-3 px-2 text-right font-mono text-[#59645D]">
                          Rs.{item.baseCost.toFixed(2)}
                        </td>

                        {/* Profit */}

                        <td
                          className={`py-3 px-3 text-right font-mono font-bold ${
                            item.totalProfit >= 0
                              ? "text-[#1F7A4D]"
                              : "text-rose-600"
                          }`}
                        >
                          Rs.{item.totalProfit.toFixed(2)}
                        </td>

                        {/* Delete */}

                        <td className="py-3 px-3 text-center">

                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-[#89918B] hover:text-rose-600 text-xs font-semibold px-2 py-1 rounded-md hover:bg-rose-50 transition"
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    ))}

                  </tbody>
                </table>

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Property, Item } from "@/lib/flowData";

interface RequestFormProps {
  property: Property;
  items: Item[];
  onSuccess: () => void;
}

export interface SubmittedRequest {
  name: string;
  email: string;
  moveInDate: string;
  message: string;
  canPickupOnDate: boolean;
  interestedInAll: boolean;
  property: Property;
  items: Item[];
  submittedAt: string;
}

export const REQUEST_KEY = "passon_last_request";

export default function RequestForm({ property, items, onSuccess }: RequestFormProps) {
  const { clearCart } = useCart();

  const [form, setForm] = useState({
    name: "",
    email: "",
    moveInDate: "",
    message: "",
    canPickupOnDate: false,
    interestedInAll: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Your name is required.";
    if (!form.email.trim()) errs.email = "Your email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Please enter a valid email.";
    if (!form.moveInDate) errs.moveInDate = "Move-in date is required.";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);

    // Simulate async submission
    setTimeout(() => {
      const payload: SubmittedRequest = {
        ...form,
        property,
        items,
        submittedAt: new Date().toISOString(),
      };
      try {
        sessionStorage.setItem(REQUEST_KEY, JSON.stringify(payload));
      } catch {}
      clearCart();
      onSuccess();
    }, 900);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
          Your name <span className="text-rose-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Alex Johnson"
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
            errors.name ? "border-rose-400 bg-rose-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
          Your email <span className="text-rose-500">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@email.com"
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
            errors.email ? "border-rose-400 bg-rose-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
      </div>

      {/* Move-in date */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="moveInDate">
          Your move-in date <span className="text-rose-500">*</span>
        </label>
        <input
          id="moveInDate"
          name="moveInDate"
          type="date"
          value={form.moveInDate}
          onChange={handleChange}
          className={`w-full px-4 py-2.5 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition ${
            errors.moveInDate ? "border-rose-400 bg-rose-50" : "border-gray-200 bg-white"
          }`}
        />
        {errors.moveInDate && <p className="text-xs text-rose-500 mt-1">{errors.moveInDate}</p>}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
          Message to resident{" "}
          <span className="text-gray-400 font-normal">(optional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Introduce yourself, mention your flexibility, or ask about bundling..."
          className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition resize-none"
        />
      </div>

      {/* Checkboxes */}
      <div className="flex flex-col gap-3">
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="canPickupOnDate"
            checked={form.canPickupOnDate}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-400 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
            I can pick up on or before the resident's move-out date
          </span>
        </label>
        <label className="flex items-start gap-3 cursor-pointer group">
          <input
            type="checkbox"
            name="interestedInAll"
            checked={form.interestedInAll}
            onChange={handleChange}
            className="mt-0.5 w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-400 cursor-pointer"
          />
          <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
            I am interested in all selected items (no substitutions needed)
          </span>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-semibold py-3.5 rounded-xl transition-colors text-sm mt-1 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Sending request…
          </>
        ) : (
          "Send Request to Resident"
        )}
      </button>
    </form>
  );
}

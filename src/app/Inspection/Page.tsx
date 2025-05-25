"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted", form);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">
          Book an Inspection
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="First name"
            value={form.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          <Input
            placeholder="Last name"
            value={form.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
        </div>

        <Input
          placeholder="Email address"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <Input
          placeholder="Phone number"
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <Select onValueChange={(val) => handleChange("service", val)}>
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="inspection">Property Inspection</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
            <SelectItem value="valuation">Valuation</SelectItem>
          </SelectContent>
        </Select>

        <Textarea
          placeholder="Message"
          rows={4}
          value={form.message}
          onChange={(e) => handleChange("message", e.target.value)}
        />

        <Button
          type="submit"
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-lg py-6 rounded-xl"
        >
          Book Inspection
        </Button>
      </form>
    </div>
  );
}

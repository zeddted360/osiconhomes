"use client"
import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is Osicon Homes about?",
    answer:
      "We are a company that specializes in real estate, construction, and home management services. Our team of experts provides high-quality solutions that cater to the unique needs of each client. Whether you're looking to buy, sell, build, or manage your home, we're here to help you every step of the way.!",
  },
  {
    id: 2,
    question: "Is Osicon homes LTD a registered company?",
    answer: "Yes we are registered with RC number 1573717.",
  },
  {
    id: 3,
    question: "What is Osicon homes partnership program?",
    answer:
      "Individuals or businesses can invest in our real estate projects and earn a percentage of the profits generated.",
  },
  {
    id: 4,
    question: "what are our refferal commissions?",
    answer:
      "You can earn as much as 10% as a first level referrer and 5% as a second level referrer.",
  },
  {
    id: 5,
    question: "Does osicon homes accept installment payment?",
    answer:
      "Yes Osicon Homes offers the convenience of installment payment options.",
  },
];

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section id="faqs" className="relative w-full bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 py-16 overflow-hidden">
      {/* Subtle Background Pattern (matching other components) */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-3 pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto px-6">
        {/* FAQ Heading */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400/30 to-orange-500/30 border border-amber-400/40">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-800 font-semibold text-sm uppercase tracking-wider">
              FAQ
            </span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            Find answers to common questions about our affiliate program and how
            you can start earning.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-2xl shadow-md border border-gray-100 hover:border-amber-300 transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={openFAQ === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span className="text-gray-900 font-semibold text-lg">
                  {faq.question}
                </span>
                <span
                  className={`text-amber-500 transform transition-transform duration-300 ${
                    openFAQ === faq.id ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ${
                  openFAQ === faq.id ? "max-h-96 px-6 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

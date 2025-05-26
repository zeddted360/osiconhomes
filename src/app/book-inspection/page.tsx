import BookInspectionForm from "@/components/BookInspectionForm";

export default function BookInspection() {
  
  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-amber-50 px-4 py-12 lg:py-16 overflow-hidden"
      aria-labelledby="book-inspection-heading"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-amber-200/50">
          {/* Header */}
          <h2
            id="book-inspection-heading"
            className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4"
            role="heading"
            aria-level={2}
          >
            Book an Inspection
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Schedule an inspection with us at your convenience.
          </p>

          {/* Client Component for Form */}
          <BookInspectionForm />
        </div>
      </div>
    </section>
  );
}

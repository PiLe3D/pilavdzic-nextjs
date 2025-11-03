export default function MersyLovePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#667eea] to-[#764ba2] p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <a 
            href="/"
            className="inline-block px-6 py-3 bg-white text-purple-700 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            ← Nazad na početnu
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <iframe
            src="games/mersy-love.html"
            className="w-full h-[80vh]"
            title="Mersy Love"
          />
        </div>
      </div>
    </div>
  );
}
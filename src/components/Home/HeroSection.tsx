
const HeroSection = () => {
  return (
    <section className="relative w-full h-auto py-16 sm:py-24 md:py-32 lg:py-40 bg-gray-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://www.elevates.in/assets/images/hero/hero-1.jpg')",
          backgroundPosition: '50% 30%',
        }}
      >
        <div className="absolute inset-0 bg-repeat opacity-5"
             style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="w-full md:w-1/2 lg:w-2/5 xl:w-1/3 text-left">
          <p className="text-gray-700 text-lg sm:text-xl font-medium mb-3">
            Elevate Your Fashion Journey
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            With Elevates Fashion
          </h1>
          <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md">
            Step into the world of trendsetting styles and make a bold statement with Elevates.
          </p>
          <a
            href="/shop"
            className="inline-flex items-center px-8 py-4 border border-gray-900 text-base font-medium text-gray-900 bg-transparent hover:bg-gray-100 transition-colors duration-200"
          >
            Shop Now
            <svg
              className="ml-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
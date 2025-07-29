import React from 'react';

const ManusRedesignPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      {/* Header Section */}
      <header className="relative w-full py-8 px-4 md:px-8 lg:px-16 flex justify-between items-center z-10">
        <div className="text-2xl font-bold">Lumi</div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#features" className="hover:text-blue-400 transition-colors duration-300">Features</a></li>
            <li><a href="#pricing" className="hover:text-blue-400 transition-colors duration-300">Pricing</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition-colors duration-300">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section - Inspired by Figma's dark, gradient background and prominent text */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 opacity-75"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 animate-fade-in-up">
            Discover Your Next Big Idea
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-fade-in-up animation-delay-200">
            Lumi helps you organize your thoughts and bring them to life.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-fade-in-up animation-delay-400">
            Start Exploring
          </button>
        </div>
      </section>

      {/* Features Section - Adapting the visual elements from Figma */}
      <section id="features" className="w-full py-20 px-4 md:px-8 lg:px-16 bg-gray-800">
        <h2 className="text-4xl font-bold text-center mb-12">Features Designed for Creativity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Feature Card 1 - Placeholder for Figma's visual elements */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl">💡</div>
            <h3 className="text-2xl font-semibold mb-4">Idea Generation</h3>
            <p className="text-gray-300">Brainstorm and capture your ideas effortlessly with smart suggestions.</p>
          </div>
          {/* Feature Card 2 */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center text-white text-3xl">✍️</div>
            <h3 className="text-2xl font-semibold mb-4">Content Creation</h3>
            <p className="text-gray-300">Craft compelling content with intuitive editing tools and rich media support.</p>
          </div>
          {/* Feature Card 3 */}
          <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300">
            <div className="w-24 h-24 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-white text-3xl">📊</div>
            <h3 className="text-2xl font-semibold mb-4">Performance Tracking</h3>
            <p className="text-gray-300">Monitor your content's impact with detailed analytics and insights.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-20 px-4 md:px-8 lg:px-16 bg-blue-700 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Workflow?</h2>
        <p className="text-lg text-blue-100 mb-8">Join Lumi today and experience the future of content creation.</p>
        <button className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
          Sign Up for Free
        </button>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 px-4 md:px-8 lg:px-16 bg-gray-950 text-gray-400 text-center text-sm">
        <p>&copy; 2025 Lumi. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export { ManusRedesignPage }; 
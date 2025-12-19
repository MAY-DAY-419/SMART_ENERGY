import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, TrendingDown, Lightbulb, ArrowRight, Leaf, Battery, Sun } from 'lucide-react';
import SolarEstimator from '../components/calculator/SolarEstimator';

const HomePage: React.FC = () => {
  const [solarOpen, setSolarOpen] = useState(false);
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-300 dark:bg-green-600 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-40 left-40 w-80 h-80 bg-emerald-300 dark:bg-emerald-600 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full text-sm font-medium mb-8 animate-fade-in-down">
              <Leaf className="w-4 h-4" />
              AI-Powered Energy Management
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
              EchoWatt - Smart Energy Calculator
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 animate-fade-in-up animation-delay-200">
              Save Energy, Reduce Carbon Footprint
            </p>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up animation-delay-400">
              Calculate your electricity bills, track carbon emissions, and optimize energy usage with AI-powered insights. Make your home smarter, greener, and more efficient.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up animation-delay-600">
              <Link
                to="/calculator"
                className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                Start Calculation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/about"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500 w-full sm:w-auto"
              >
                Learn More
              </Link>
              <button
                onClick={() => setSolarOpen(true)}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
              >
                Solar Estimator
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Mottos Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group p-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Energy Saved is Energy Generated
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every unit saved contributes to a greener planet
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingDown className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Smarter Homes. Lower Bills.
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intelligent insights for maximum savings
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Monitor. Optimize. Save.
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete control over your energy consumption
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to manage your home's energy
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={<Battery className="w-8 h-8" />}
              title="Real-time Tracking"
              description="Monitor your energy consumption in real-time with IoT integration"
              color="from-blue-500 to-cyan-500"
            />
            <FeatureCard
              icon={<Sun className="w-8 h-8" />}
              title="AI Optimization"
              description="Get intelligent recommendations to reduce your energy bills"
              color="from-green-500 to-emerald-500"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Device Management"
              description="Easily add and manage all your home appliances"
              color="from-yellow-500 to-orange-500"
            />
            <FeatureCard
              icon={<TrendingDown className="w-8 h-8" />}
              title="Cost Analytics"
              description="Detailed breakdown of costs by device and category"
              color="from-purple-500 to-pink-500"
            />
            <FeatureCard
              icon={<Lightbulb className="w-8 h-8" />}
              title="Smart Insights"
              description="Actionable tips to optimize your energy usage"
              color="from-indigo-500 to-blue-500"
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8" />}
              title="Eco-Friendly"
              description="Track your carbon footprint and environmental impact"
              color="from-green-500 to-teal-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Saving?
          </h2>
          <p className="text-xl text-green-50 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already saving on their electricity bills
          </p>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
      {/* Solar Estimator Modal */}
      {solarOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSolarOpen(false)} />
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg max-w-3xl w-full p-6 z-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Solar Estimator</h3>
              <button onClick={() => setSolarOpen(false)} className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-700">Close</button>
            </div>
            <SolarEstimator />
          </div>
        </div>
      )}
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-2xl flex items-center justify-center mb-6 text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default HomePage;

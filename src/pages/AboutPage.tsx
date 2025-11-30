import React from 'react';
import { Zap, TrendingDown, Brain, Leaf, Target, Users } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About EchoWatt
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Empowering Indian homeowners to make smarter energy decisions through intelligent monitoring, carbon tracking, and AI-powered optimization.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            We believe that energy conservation starts with awareness. Our mission is to provide every household with powerful tools to understand, track, and optimize their electricity consumption. By making energy data accessible and actionable, we help families save money while contributing to a sustainable future.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="Accurate Calculations"
            description="Precise energy consumption calculations based on real device specifications and usage patterns from top Indian brands."
            color="from-yellow-500 to-orange-500"
          />
          <FeatureCard
            icon={<Brain className="w-8 h-8" />}
            title="AI-Powered Insights"
            description="Smart recommendations tailored to your specific usage patterns, helping you identify savings opportunities."
            color="from-purple-500 to-pink-500"
          />
          <FeatureCard
            icon={<TrendingDown className="w-8 h-8" />}
            title="Cost Optimization"
            description="Detailed breakdowns by device and category, enabling you to make informed decisions about your energy usage."
            color="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            icon={<Leaf className="w-8 h-8" />}
            title="Eco-Friendly"
            description="Track your environmental impact and contribute to a greener planet by reducing unnecessary energy consumption."
            color="from-green-500 to-emerald-500"
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="User-Friendly"
            description="Intuitive interface designed for everyone, from tech enthusiasts to those just starting their energy-saving journey."
            color="from-indigo-500 to-blue-500"
          />
          <FeatureCard
            icon={<Zap className="w-8 h-8" />}
            title="IoT Ready"
            description="Seamlessly integrate with smart home devices for real-time monitoring and automated energy management."
            color="from-cyan-500 to-teal-500"
          />
        </div>

        {/* How It Works */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Select Location
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose your state to get accurate electricity rates for your region
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Add Devices
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select from our database of popular appliances or add custom devices
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Get Insights
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                View detailed analysis, AI recommendations, and export reports
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <StatCard number="50+" label="Device Brands" />
          <StatCard number="36" label="States Covered" />
          <StatCard number="100+" label="Appliances" />
          <StatCard number="AI" label="Powered Insights" />
        </div>

        {/* Energy Saving Tips */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-12 border-2 border-green-200 dark:border-green-800">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Quick Energy Saving Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Use LED bulbs - they consume 75% less energy than traditional bulbs',
              'Set AC temperature to 24-26°C for optimal comfort and efficiency',
              'Unplug devices when not in use to avoid phantom power consumption',
              'Choose 5-star BEE rated appliances for maximum energy savings',
              'Use natural light during the day to reduce lighting costs',
              'Regular maintenance of appliances ensures peak efficiency',
              'Use timer switches for water heaters and geysers',
              'Opt for inverter technology in AC and refrigerators',
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
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
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`w-14 h-14 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center mb-4 text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

interface StatCardProps {
  number: string;
  label: string;
}

const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg">
      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{number}</div>
      <div className="text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
};

export default AboutPage;

# Smart Home Energy Calculator

A comprehensive Progressive Web App (PWA) for calculating smart home energy consumption and electricity costs. Users can create house projects, add rooms, manage appliances, and get detailed energy consumption breakdowns with AI-powered cost optimization.

## 🌟 Features

### 🏠 Landing Page
- Beautiful hero section with smooth CSS animations
- Green, blue, and white theme representing energy efficiency
- Three inspiring mottos about energy conservation
- Clear call-to-action buttons

### ⚡ Energy Calculator
**Step 1: Location & Pricing**
- Select from all Indian states and UTs
- Automatic electricity rate detection for each state
- Manual override option for custom rates

**Step 2: Device Management**
- 50+ popular home appliances from top Indian brands (Samsung, LG, Whirlpool, Godrej, Philips, Havells, Crompton, Sony, Panasonic, etc.)
- Device categories: Cooling, Lighting, Entertainment, Kitchen, Washing, Other
- Custom device entry for unlisted appliances
- Real-time cost calculation per device

**Step 3: Bill Summary & Analytics**
- Total monthly electricity bill calculation
- Total units consumed (kWh)
- Category-wise breakdown with pie chart
- Top 10 devices by cost with bar graph
- Export to Excel (.xlsx) and PDF

### 🤖 AI Energy Optimization
Intelligent recommendations based on your usage:
- Replace high-power appliances with energy-efficient models
- Optimize AC temperature settings
- Switch to LED lighting
- Best times to run washing machines
- Eliminate standby power consumption
- IoT automation suggestions
- Regular maintenance tips

### 🌐 IoT Device Integration
- Connect smart plugs for real-time monitoring
- Smart meter integration support
- IoT sensor compatibility
- Automatic data sync (UI placeholder ready)

### 🎨 Additional Features
- 🌓 Dark/Light mode toggle
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 🎯 User-friendly interface
- 📊 Visual data charts (Pie & Bar)
- 📥 Export reports (Excel & PDF)

## 🛠️ Tech Stack

- **React 18.3.1** - Modern UI framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Navigation
- **Recharts** - Data visualization
- **XLSX** - Excel export
- **jsPDF** - PDF export
- **Lucide React** - Beautiful icons

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Usage

1. **Start Calculation**: Click on the "Start Calculation" button
2. **Select Location**: Choose your state to get default electricity rates
3. **Add Devices**: 
   - Select from the database of popular appliances
   - Or add custom devices with wattage and usage hours
4. **View Results**: 
   - See your total monthly bill
   - Analyze category-wise breakdown
   - Get AI-powered optimization tips
5. **Export Reports**: Download your energy report as Excel or PDF

## 💡 Energy Saving Tips

- Use LED bulbs - 75% less energy than traditional bulbs
- Set AC to 24-26°C for optimal efficiency
- Unplug devices when not in use
- Choose 5-star BEE rated appliances
- Use natural light during the day
- Regular appliance maintenance

## 📊 Indian State Electricity Rates

The app includes default rates for all 36 Indian states and UTs:
- Maharashtra: ₹9.0/unit
- Delhi: ₹8.0/unit
- Karnataka: ₹7.5/unit
- And many more...

(Rates can be manually overridden)

## 🎯 Device Database

100+ pre-configured devices including:
- Air Conditioners (Samsung, LG, Voltas, Godrej)
- Refrigerators (Whirlpool, Samsung, LG)
- TVs (Sony, Samsung, LG, Mi)
- Kitchen Appliances (IFB, Prestige, Philips)
- Lighting (Philips, Syska, Havells)
- And many more...

## 🌈 Color Theme

- **Primary Green**: Energy efficiency and sustainability
- **Blue**: Technology and trust
- **White**: Cleanliness and simplicity
- **Dark Mode**: Eye-friendly night usage

## 📱 Responsive Design

Optimized for:
- 💻 Desktop (1920px+)
- 💻 Laptop (1024px+)
- 📱 Tablet (768px+)
- 📱 Mobile (320px+)

## 🔮 Future Enhancements

- Real backend integration
- User authentication
- Database storage
- Real IoT device connections
- Historical data tracking
- Bill comparison over months
- Social sharing features
- Multi-language support

## 📄 License

This project is open source and available for educational purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Contact

For questions or support, please reach out through the contact form in the app.

---

**Made with 💚 for a sustainable future**

*Energy saved is energy generated. Make your home smarter today!*

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/7b7e8d84-7b5b-48d8-a7d6-6dedbe701982) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# 3D Portfolio Showcase

A stunning 3D portfolio showcase website that integrates with Google Sheets for dynamic content management. Built with React, Three.js, and Redux Toolkit.

## 🚀 Features

- **3D Immersive Interface**: Built with React Three Fiber for stunning visual effects
- **Google Sheets Integration**: Real-time data synchronization without redeployment
- **Advanced Search & Filtering**: Scalable to handle 1000+ projects
- **Redux Toolkit State Management**: Efficient state handling with proper loading states
- **Neon Cursor Effects**: Interactive cursor trails and hover animations
- **Dark/Light Mode**: Smooth theme transitions with animations
- **Responsive Design**: Optimized for all screen sizes
- **Lazy Loading**: Performance optimized for large datasets
- **Google Auth Ready**: Placeholder for future subscription features

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **3D Graphics**: React Three Fiber + Three.js + Drei
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Data Source**: Google Sheets via Apps Script

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Account for Sheets integration
- Basic knowledge of Google Apps Script

## 🚀 Installation

1. **Clone and install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📊 Google Sheets Setup

### 1. Create Your Google Sheet

Create a new Google Sheet with the following columns:
- `title` (string): Project title
- `description` (string): Project description
- `thumbnail` (string): Image URL for project thumbnail
- `zipUrl` (string): Direct download link for project ZIP
- `liveDemo` (string): URL for live demo
- `isPublished` (boolean): TRUE/FALSE for project visibility

### 2. Sample Data

Add these sample entries to test the system:

| title | description | thumbnail | zipUrl | liveDemo | isPublished |
|-------|-------------|-----------|---------|----------|-------------|
| E-Commerce Platform | A modern full-stack e-commerce solution | https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg | https://drive.google.com/uc?id=YOUR_FILE_ID | https://demo.example.com | TRUE |
| Task Manager | Collaborative task management app | https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg | https://drive.google.com/uc?id=YOUR_FILE_ID | https://demo.example.com | TRUE |

### 3. Google Apps Script Setup

1. Open Google Apps Script (script.google.com)
2. Create a new project
3. Replace the default code with:

```javascript
function doGet() {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID').getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const projects = rows.map((row, index) => {
    const project = {};
    headers.forEach((header, i) => {
      project[header] = row[i];
    });
    project.id = String(index + 1);
    return project;
  });

  return ContentService
    .createTextOutput(JSON.stringify({ projects }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as web app with "Anyone" access
5. Copy the web app URL
6. Update `src/services/googleSheets.ts` with your URL

### 4. Configure the App

1. Replace `YOUR_SCRIPT_ID` in `src/services/googleSheets.ts` with your Apps Script deployment URL
2. Update the sheet ID in your Apps Script code

## 🎮 Usage

### Demo Mode
The app comes with mock data for immediate testing. The 3D interface showcases:
- Floating project cards with hover animations
- Neon cursor tracking effects
- Smooth page transitions
- Professional dark/light mode toggle

### Production Mode
Once Google Sheets is configured:
1. Projects update automatically every 5 minutes
2. Changes to the sheet reflect immediately
3. Support for 1000+ projects with pagination
4. Advanced search and filtering capabilities

## 🔧 Configuration

### Environment Variables
Create a `.env` file for production settings:
```env
VITE_GOOGLE_SHEETS_URL=your_apps_script_url
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

### Customization
- **Colors**: Update the neon color palette in Tailwind config
- **3D Effects**: Modify components in `src/components/3D/`
- **Animations**: Adjust Framer Motion settings in components
- **Performance**: Configure lazy loading and pagination settings

## 📱 Responsive Breakpoints

- **Mobile**: < 768px (Single column grid)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: 1024px - 1440px (3-column grid)
- **Large Desktop**: > 1440px (4-column grid)

## 🚀 Deployment

The app is optimized for deployment on:
- Vercel (recommended)
- Netlify
- Bolt Hosting

## 🔮 Future Features

- Google Authentication integration
- Subscription model for premium features
- Advanced project analytics
- User project favorites
- Project rating system
- Admin dashboard for content management

## 🐛 Troubleshooting

### Common Issues

1. **3D Scene not rendering**: Ensure WebGL is supported in your browser
2. **Google Sheets not loading**: Check Apps Script URL and permissions
3. **Performance issues**: Enable hardware acceleration in browser settings

### Performance Tips

- The app uses lazy loading for optimal performance
- 3D rendering is optimized for 60fps
- Images are loaded on-demand with loading states
- Search and filtering are debounced for smooth UX

## 📝 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

Contributions are welcome! Please read the contributing guidelines before submitting PRs.

---

Built with ❤️ using modern web technologies and 3D graphics for an immersive portfolio experience.
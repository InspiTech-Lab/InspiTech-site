# Google Apps Script Setup Guide

This guide will help you set up Google Apps Script to serve your Google Sheets data as a JSON API.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Portfolio Projects"
4. Set up the following columns in Row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| title | description | thumbnail | zipUrl | liveDemo | isPublished |

## Step 2: Add Sample Data

Add these sample entries:

### Row 2:
- **title**: E-Commerce Platform
- **description**: A modern, full-stack e-commerce solution with React, Node.js, and Stripe integration
- **thumbnail**: https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400
- **zipUrl**: https://drive.google.com/uc?id=1ABC123
- **liveDemo**: https://ecommerce-demo.vercel.app
- **isPublished**: TRUE

### Row 3:
- **title**: AI Chat Assistant
- **description**: An intelligent chat assistant powered by machine learning
- **thumbnail**: https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400
- **zipUrl**: https://drive.google.com/uc?id=2DEF456
- **liveDemo**: https://aichat-demo.vercel.app
- **isPublished**: FALSE

## Step 3: Create Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default code with the following:

```javascript
/**
 * Portfolio Projects API
 * Serves Google Sheets data as JSON for the 3D Portfolio Showcase
 */

function doGet(e) {
  try {
    // Replace with your actual Google Sheet ID
    const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
    
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = sheet.getDataRange().getValues();
    
    if (data.length === 0) {
      return createJsonResponse({ projects: [], message: 'No data found' });
    }
    
    const headers = data[0];
    const rows = data.slice(1);
    
    const projects = rows.map((row, index) => {
      const project = {};
      headers.forEach((header, i) => {
        let value = row[i];
        
        // Convert string 'TRUE'/'FALSE' to boolean for isPublished
        if (header === 'isPublished') {
          value = value === true || value === 'TRUE' || value === 'true';
        }
        
        project[header] = value || '';
      });
      
      // Add unique ID
      project.id = String(index + 1);
      
      return project;
    });
    
    return createJsonResponse({ 
      projects: projects,
      total: projects.length,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return createJsonResponse({ 
      projects: [], 
      error: error.toString(),
      timestamp: new Date().toISOString()
    });
  }
}

function createJsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

/**
 * Test function to verify the setup
 */
function testApi() {
  const response = doGet();
  const content = JSON.parse(response.getContent());
  console.log('API Response:', content);
  return content;
}
```

## Step 4: Deploy Apps Script

1. Click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone"
5. Click "Deploy"
6. Copy the web app URL

## Step 5: Update Your App

1. Open `src/services/googleSheets.ts`
2. Replace the mock URL with your Apps Script URL:
   ```typescript
   this.appsScriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
3. Uncomment the fetch code and comment out the mock data return

## Step 6: Configure Sheet ID

1. Get your Google Sheet ID from the URL: 
   `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
2. Replace `YOUR_GOOGLE_SHEET_ID_HERE` in your Apps Script code

## 🔄 Testing the Integration

1. Run the test function in Apps Script to verify data retrieval
2. Visit your deployed web app URL to see the JSON response
3. Refresh your React app to see live data

## 📝 File Upload Setup (Google Drive)

For ZIP file downloads:

1. Upload your project ZIP files to Google Drive
2. Set sharing to "Anyone with the link can view"
3. Get the direct download link format:
   `https://drive.google.com/uc?id=FILE_ID`
4. Add these URLs to your Google Sheet's `zipUrl` column

## 🔐 Security Considerations

- Apps Script runs with your Google account permissions
- Consider using service accounts for production
- Implement rate limiting if needed
- Monitor usage in Apps Script dashboard

## 📊 Data Validation

The Apps Script includes error handling for:
- Missing sheet data
- Invalid boolean values
- Network timeouts
- Permission issues

## 🚀 Production Tips

1. **Caching**: Apps Script responses are cached for better performance
2. **Rate Limits**: Google Apps Script has execution time limits
3. **Monitoring**: Check Apps Script execution logs regularly
4. **Backup**: Keep backups of your sheet data
5. **Versioning**: Use Apps Script versioning for updates

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure Apps Script headers are set correctly
2. **Data Not Loading**: Check Sheet ID and permissions
3. **Boolean Values**: Ensure isPublished column uses TRUE/FALSE
4. **Performance**: Large datasets may need pagination in Apps Script

### Debug Steps:

1. Test Apps Script URL directly in browser
2. Check browser console for errors
3. Verify Google Sheet permissions
4. Test with minimal data first

---

For additional support, check the main README.md file or create an issue in the project repository.
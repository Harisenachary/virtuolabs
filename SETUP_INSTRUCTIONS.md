# Setup Instructions for VirtuoLabs

## Node.js Installation Required

To run this React website, you need to install Node.js first.

### Step 1: Install Node.js

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Download the LTS (Long Term Support) version for Windows
   - Choose the Windows Installer (.msi) for your system (64-bit recommended)

2. **Install Node.js:**
   - Run the downloaded installer
   - Follow the installation wizard (use default settings)
   - Make sure to check "Add to PATH" option during installation
   - Complete the installation

3. **Verify Installation:**
   - Open a NEW PowerShell or Command Prompt window
   - Run these commands to verify:
     ```
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.x.x and 9.x.x)

### Step 2: Install Project Dependencies

After Node.js is installed:

1. Open PowerShell or Command Prompt
2. Navigate to the project folder:
   ```
   cd C:\Users\Aditya\OneDrive\Desktop\virtuolabs
   ```

3. Install dependencies:
   ```
   npm install
   ```

4. Wait for installation to complete (this may take a few minutes)

### Step 3: Run the Website

Once dependencies are installed:

```
npm run dev
```

The website will start and you'll see a message like:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: use --host to expose
```

### Step 4: Open in Browser

Open your web browser and go to:
**http://localhost:8080**

## Troubleshooting

- **If npm is not recognized:** Restart your terminal/PowerShell after installing Node.js
- **If port 8080 is busy:** The server will automatically use another port (check the terminal output)
- **If you see errors:** Make sure you're in the correct directory and all files are present

## Alternative: Quick Test Without Node.js

If you want to quickly see the structure, you can open `index.html` directly in a browser, but it won't work fully without the build process. The React app needs Node.js to run properly.


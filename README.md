# Pneumonia Detection Frontend

A React app where you can upload a chest X ray image and see whether the model predicts normal or pneumonia, along with a confidence score. This is the frontend half of the pneumonia detection project, built with Vite and React, and it needs the backend API running alongside it to actually return predictions.

## Before You Start

This app does not run the model itself. It only sends the uploaded image to a backend API and displays whatever comes back. Make sure the backend from the main project is running first, since by default this app expects it to be available at http://127.0.0.1:8000

## Cloning the Project

If you have not already cloned the main repository, start here.

```
git clone https://github.com/kgayanjith/pneumonia-detection-deep-learning-frontend.git
```


```
cd pneumonia-frontend
```

## Checking Requirements

You will need Node.js installed on your machine. You can check whether it is already installed and see the version with

```
node -v
```

If this command fails or shows nothing, install Node.js from nodejs.org before continuing. Any recent version from 18 onward should work fine.

## Installing Dependencies

From inside the pneumonia-frontend folder, install all the packages the app needs.

```
npm install
```

This may take a minute the first time, since it is pulling in React, Vite, and all their supporting packages.

## Running the App in Development Mode

Start the development server with

```
npm run dev
```

Once it starts, you should see a local address printed in the terminal, usually http://localhost:5173

Open that address in your browser. You should see the upload screen where you can choose a chest X ray image and run a screening check. Keep the backend server running in a separate terminal window at the same time, otherwise the upload button will not be able to get a prediction back.

## Building for Production

If you want to create an optimized production build instead of running the development server, use

```
npm run build
```

This generates a dist folder containing the final static files, which could be deployed to any static hosting service if needed.

To preview that production build locally before deploying it anywhere, run

```
npm run preview
```

## Stopping the App

To stop the development server at any time, go back to the terminal where it is running and press

```
Ctrl + C
```

## Project Structure

The important files inside this folder are laid out as follows.

```
pneumonia-frontend/
├── src/
│   ├── App.jsx
│   ├── App.css
│   └── NetworkVisualization.jsx
├── index.html
├── package.json
└── vite.config.js
```

## Disclaimer

This project was built for learning purposes as part of an academic assignment. It is not a medical tool and should never be used to make real diagnostic decisions. Always consult a qualified doctor for anything related to actual health concerns.

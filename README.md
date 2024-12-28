# YouTube Clone Project

A modern YouTube clone built with React and TailwindCSS, replicating the core functionality of YouTube, such as video browsing, search, and user interaction. The project aims to provide a clean and responsive interface with scalable design principles.

## Demo

[Live demo](https://youtubecnv3.netlify.app)

## Features

- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.
- **Search Functionality**: Users can search for videos dynamically.
- **Sidebar Navigation**: Includes a collapsible sidebar for quick navigation between categories.
- **Dynamic Video Rendering**: Displays videos fetched from a YouTube Data API v3.
- **Dark/Light Mode (Planned)**: A planned enhancement to allow users to switch themes.
- **Global State Management**: Utilizes the React Context API to manage the application state efficiently.

## Technology Stack

- **Frontend Framework**: React (Create React App)
- **Styling**: TailwindCSS
- **State Management**: Context API
- **Routing**: React Router DOM
- **Icons**: React Icons
- **API**: Integrated with YouTube Data API v3
- **Bundler**: Webpack (CRA)

## Installation

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or above)
- npm (or yarn)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SHUBHAMKURUP/Youtube-Clone.git
   cd Youtube-Clone
   ```
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure API key**:

   - Obtain a YouTube Data API key from the Google Cloud Console.
   - Create a .env file in the root directory of the project.
   - Add the following line to the .env file:
     ```env
     REACT_APP_YOUTUBE_API_KEY=your-api-key
     ```

4. **Run the application**:

   ```bash
   npm run start
   ```

5. **Access the application**:
   - Open your browser and navigate to the local URL, typically http://localhost:3000.

---

Future Enhancements:

- **Dark Mode**: Add support for light and dark themes.
- **Backend Integration**: Fetch video data dynamically from the YouTube Data API.
- **User Authentication**: Allow users to log in and personalize their experience.
- **Video Player**: Embed a custom video player for enhanced viewing.

---

Acknowledgments

- Inspired by the YouTube platform.
- Built with React, TailwindCSS, and YouTube Data API v3.

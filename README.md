# 🎬 RoseBinge — Movie Discovery App

**RoseBinge** is a responsive movie discovery web application built with **React** and **Tailwind CSS**, powered by the **OMDb API**.  
It allows users to explore, search, and view detailed information about their favorite movies in a sleek, Netflix-inspired interface.

---

## 🌟 Features

- **🎞️ Movie Search:** Search movies and shows using live data from the OMDb API.
- **🧾 Detailed Movie View:** View detailed information such as plot, cast, rating, and genre.
- **📱 Responsive Design:** Optimized layouts for mobile, tablet, and desktop screens.
- **💬 User-Friendly Interface:** Clean UI with interactive hover effects and modals.
- **⚙️ Error Handling:** Graceful fallbacks for empty search results or API errors.
- **⭐ Custom Elements:** Star ratings and icons built using pure CSS and Unicode — no third-party icon libraries.

---

## 🧩 Project Structure

```bash
src/
 ├── components/
 │   ├── HeroSection.jsx
 │   ├── MovieList.jsx
 │   ├── MovieCard.jsx
 │   ├── MovieDetailModal.jsx
 │   └── SearchBar.jsx
 ├── App.jsx
 ├── index.css
 └── main.jsx
Each component is modular and reusable, following React’s best practices for maintainable frontend architecture.

🧠 Technologies Used
Category	Tools
Frontend Framework	React (Vite)
Styling	Tailwind CSS
API	OMDb API
Language	JavaScript (ES6+)
Build Tool	Vite
Version Control	Git & GitHub

🚀 Getting Started
Follow these steps to run RoseBinge locally:

1️⃣ Clone the repository
bash

git clone https://github.com/yourusername/rosebinge.git
cd rosebinge
2️⃣ Install dependencies
bash

npm install
3️⃣ Configure environment variables
Create a .env file in the root directory and add your OMDb API key:

bash
Copy code
VITE_OMDB_API_KEY=your_api_key_here
4️⃣ Run the app
bash
Copy code
npm run dev
Visit http://localhost:5173 to view the app in your browser.

📱 UI Preview
Desktop	Mobile

(Replace with your actual screenshots)

🧩 Key Components Overview
🔹 HeroSection.jsx
Displays the featured movie section with a gradient overlay, app title, and quick actions (Play, Watchlist, Info).

🔹 SearchBar.jsx
Captures user input and triggers API calls to fetch movie data. Clicking activates the search page immediately.

🔹 MovieList.jsx
Renders a responsive grid of MovieCard components.

🔹 MovieCard.jsx
Displays poster, title, year, and rating — includes hover animations and a modal trigger.

🔹 MovieDetailsModal.jsx
Shows detailed movie information fetched from the API (plot, cast, genre, rating).

⚙️ API Integration
The app uses the OMDb API for fetching movie data:

js
Copy code
fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_OMDB_API_KEY}&s=${searchQuery}`)
  .then(res => res.json())
  .then(data => setMovies(data.Search || []))
  .catch(error => setError("Something went wrong."));
🧪 Error Handling
Displays "No results found" when the search returns empty.

Catches network or API errors and shows a user-friendly message.

Handles missing poster images gracefully with fallback placeholders.

🎨 Design System
RoseBinge follows a consistent design language:

Primary Color: Deep Rose #B8336A

Accent Color: Golden Yellow #FFD166

Typography: Modern, bold headings with clean sans-serif body text

Theme: Light and dark palette variants

Animations: Smooth hover transitions using Tailwind utilities

🧠 Learning Outcomes
This project demonstrates:

State management using React Hooks (useState, useEffect)

Integration of external APIs

Component-based architecture design

Tailwind CSS for scalable and responsive styling

Frontend debugging and error handling best practices

🧑‍💻 Author
Rosemond Ampomah
Aspiring Software Developer | Frontend Engineer | Product Design Enthusiast
🔗 LinkedIn
📧 www.linkedin.com/in/rosemond-ampomah

🏆 Acknowledgements
OMDb API for the movie data.

ALX Africa for mentorship and program guidance.

Inspiration from streaming platforms like Netflix and IMDb.

📜 License
This project is licensed under the MIT License.
You are free to use, modify, and distribute it under the same terms.

"Built with ❤️ and creativity by Rosemond as part of the ALX Frontend Capstone Project."



Would you like me to include a **"Performance Optimization"** section (explaining lazy loading, image optimization, and clean state updates)?
That would make your README stand out to **recruiters and ALX reviewers** alike.
```

# HomeBite

HomeBite is a homemade meal discovery prototype built for a Full Stack Development lab assessment. The project now includes a redesigned landing page, an Express-based login flow, role-based dashboard redirects, and a customer dashboard with the full Smart Meal Match experience built in.

## Project Overview

The app currently centers around these pages:

- `index.html` - landing page with the HomeBite hero layout, popular meals, testimonials, and browser API demonstrations
- `login.html` - role-based login page for `Customer` and `HomeCook`
- `customer_dashboard.html` - customer dashboard containing the complete Smart Meal Match feature
- `homecook_dashboard.html` - home cook dashboard entry page
- `server.js` - Express server for static hosting and login validation

## Current Flow

1. Open the landing page.
2. Click `Login`.
3. Select a role and enter password `123`.
4. Get redirected to:
   - `customer_dashboard.html` for customers
   - `homecook_dashboard.html` for home cooks

## Landing Page Features (`index.html`)

- Redesigned navigation, hero section, feature ribbon, meal showcase, testimonials, and footer
- Login call-to-action in both desktop and mobile navigation
- Popular meal cards styled as draggable recommendation cards
- Inline SVG-based visual elements for the updated hero presentation

### Browser APIs and Interactions on the Landing Page

- `localStorage` to save and restore the zip code
- Geolocation API to show live coordinates
- Notification API to request and display browser notifications
- Clipboard API to copy the website link
- Drag and Drop API to reorder meal cards

### Lab Exercise 3 Events on the Landing Page

- `DOMContentLoaded` welcome message
- `input` live ZIP preview
- `resize` browser-width badge
- `mouseover` meal card highlight and scale-up
- `mouseout` meal card reset

## Login Features (`login.html` + `server.js`)

- Role dropdown for `Customer` and `HomeCook`
- Password-based validation using Express `POST /login`
- Password check using demo password `123`
- Error feedback for missing or invalid credentials
- Role-based redirect to the correct dashboard

## Customer Dashboard Features (`customer_dashboard.html`)

- Full Smart Meal Match feature moved into the dashboard
- Budget-based filtering in INR
- Dietary preference selection
- Meal type selection for breakfast, lunch, or dinner
- Optional zip code support for local-feeling summaries
- Exact-match recommendations when meals fit the selected budget
- Closest-alternative suggestions when no exact budget match exists
- Recent search history with one-click reuse
- Copy summary button using the Clipboard API
- Print results button using `window.print()`
- Saved preferences and search history using `localStorage`

### Lab Exercise 3 Events on the Customer Dashboard

- `load` responsive readiness message
- `focus` contextual guidance for active form fields
- `blur` cleanup and validation feedback for completed fields
- `input` live feedback for zip code and budget entry
- `change` dynamic preview messages for meal type and diet selection
- `submit` controlled validation and status updates
- `mouseover` action-button guidance and meal-card preview messaging
- `mouseout` status and feedback reset
- `resize` viewport-aware responsiveness feedback

## HomeCook Dashboard Features (`homecook_dashboard.html`)

- Simple post-login dashboard for the home cook role
- Links back to the landing page, login page, and customer Smart Meal Match dashboard

## Problem Statement

Users often know their budget and dietary preference before they know which meal to choose. Without filtering, they spend unnecessary time browsing options that do not match their needs.

HomeBite addresses this by:

- narrowing meal choices with simple inputs
- giving instant feedback through JavaScript
- showing exact matches first
- suggesting close alternatives when needed
- saving preferences for repeat use

## Target Users

- College students looking for affordable homemade food
- Busy professionals who want fast meal suggestions
- Families with specific dietary preferences
- Users who prefer homemade meals over restaurant delivery

## Technologies Used

- HTML5
- Tailwind CSS via CDN
- Vanilla JavaScript
- Express.js

## HTML5 and Browser Features Used

- Semantic HTML structure
- `localStorage`
- `datalist`
- `output`
- HTML5 form validation attributes
- Geolocation API
- Notification API
- Clipboard API
- Drag and Drop API
- `window.print()`
- DOM event handling

## JavaScript Concepts Demonstrated

- DOM selection and manipulation
- Event-driven UI updates
- Form validation
- Conditional logic
- Array filtering and sorting
- Template literals
- Dynamic HTML rendering
- Event delegation
- Local storage persistence
- Reusable helper functions
- Fetch-based form submission

## File Structure

- `index.html` - redesigned HomeBite landing page
- `login.html` - role-based login page
- `customer_dashboard.html` - customer dashboard with Smart Meal Match
- `homecook_dashboard.html` - home cook dashboard
- `server.js` - Express server
- `README.md` - project documentation

## How to Run

1. Install dependencies if needed with `npm install`.
2. Start the Express server with `npm start`.
3. Open `http://localhost:3000`.
4. Click `Login` and test the role-based flow.
5. Use the customer dashboard to test Smart Meal Match, saved preferences, search history, copy summary, and print results.

## Suggested Demo Flow

1. Show the redesigned landing page.
2. Demonstrate ZIP saving, notifications, geolocation, clipboard, and drag-and-drop.
3. Open the login page.
4. Log in as a customer with password `123`.
5. Demonstrate Smart Meal Match inside the customer dashboard.
6. Log in as a home cook and show the alternate dashboard redirect.

## Responsible AI Usage Note

AI tools were used for ideation, UI refinement, debugging support, and documentation updates. The final files were reviewed and organized for assessment use and learning.

## Future Scope

- Real backend authentication
- Live chef inventory and database storage
- Real order placement workflow
- Authentication-based personalized history
- Dynamic location-aware meal discovery

# HomeBite

HomeBite is a front-end prototype for a homemade meal discovery platform built for a Full Stack Development CIA / lab assessment. The project now includes a redesigned landing page and a separate Smart Meal Match module, both created with HTML5, Tailwind CSS, and inline JavaScript.

## Project Overview

This prototype focuses on helping users discover homemade meals more quickly and interactively.

The project currently has two main pages:

- `index.html` - the HomeBite landing page with a premium hero layout, popular meals showcase, testimonials, and browser API demonstrations
- `smart-meal-match.html` - the Smart Meal Match Finder page with filtering, saved preferences, search history, and enhanced event-driven feedback

## Recent Updates

- Redesigned the HomeBite landing page to match a richer mockup-style layout
- Kept the Smart Meal Match page as a separate feature module
- Added Lab Exercise 3 event handling directly inside both HTML files using inline JavaScript
- Preserved the existing browser API demonstrations and interactive features

## Landing Page Features (`index.html`)

- Redesigned navigation, hero section, feature ribbon, meal showcase, testimonials, and footer
- Smart Meal Match call-to-action linked from the landing page
- Popular meal cards styled as draggable recommendation cards
- Inline SVG-based visual elements for the updated hero presentation

### Browser APIs and Interactions on the Landing Page

- `localStorage` to save and restore the zip code
- Geolocation API to show live coordinates
- Notification API to request and display browser notifications
- Clipboard API to copy the website link
- Drag and Drop API to reorder meal cards

### Lab Exercise 3 Events on the Landing Page

- `DOMContentLoaded` / load-style welcome message
- `input` live ZIP preview
- `resize` browser-width badge
- `mouseover` meal card highlight and scale-up
- `mouseout` meal card reset

## Smart Meal Match Features (`smart-meal-match.html`)

- Separate form-driven meal recommendation module
- Budget-based filtering in INR
- Dietary preference selection
- Meal type selection for breakfast, lunch, or dinner
- Optional zip code support for more local-feeling summaries
- Exact-match recommendations when meals fit the selected budget
- Closest-alternative suggestions when no exact budget match exists
- Recent search history with one-click reuse
- Copy summary button using the Clipboard API
- Print results button using `window.print()`
- Saved preferences and search history using `localStorage`

### Lab Exercise 3 Events on the Smart Meal Match Page

- `load` responsive readiness message
- `focus` contextual guidance for active form fields
- `blur` cleanup and validation feedback for completed fields
- `input` live feedback for zip code and budget entry
- `change` dynamic preview messages for meal type and diet selection
- `submit` controlled validation and status updates
- `mouseover` action-button guidance and meal-card preview messaging
- `mouseout` status and feedback reset
- `resize` viewport-aware responsiveness feedback

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

## File Structure

- `index.html` - redesigned HomeBite landing page
- `smart-meal-match.html` - Smart Meal Match Finder module
- `README.md` - project documentation

## How to Run

1. Open `index.html` in a browser.
2. Explore the landing page interactions and browser API demos.
3. Click the Smart Meal Match button, or open `smart-meal-match.html` directly.
4. Test the form, dynamic feedback, saved preferences, history reuse, copy summary, and print results.

## Suggested Demo Flow

1. Show the redesigned landing page.
2. Demonstrate ZIP saving, notifications, geolocation, clipboard, and drag-and-drop.
3. Open Smart Meal Match.
4. Enter a budget, choose a diet, choose a meal type, and submit.
5. Show exact matches or closest alternatives.
6. Reuse a recent search and demonstrate copy/print actions.
7. Mention the Lab Exercise 3 event handling added to both pages.

## Responsible AI Usage Note

AI tools were used for ideation, UI refinement, debugging support, and documentation updates. The final files were reviewed and organized for assessment use and learning.

## Future Scope

- Real backend integration
- Live chef inventory and database storage
- Real order placement workflow
- Authentication-based personalized history
- Dynamic location-aware meal discovery

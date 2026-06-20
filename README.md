# HomeBite Smart Meal Match Finder

## Project Overview
HomeBite is a front-end prototype for a homemade meal discovery platform.  
The main enhancement in this project is the **Smart Meal Match Finder**, a separate interactive module that helps users discover suitable homemade meals based on:

- Budget
- Dietary preference
- Meal type
- Nearby zip code

This prototype is designed for a **Full Stack Development CIA assessment** and focuses on solving a real user problem using HTML5, Tailwind CSS, and JavaScript.

## Problem Statement
Many users know their food budget and dietary needs, but still spend unnecessary time scrolling through options that do not match their requirements.

The Smart Meal Match Finder improves this process by:

- Filtering meals instantly
- Showing suitable homemade meal options
- Suggesting the closest alternatives if no exact budget match exists
- Saving preferences for repeat users
- Allowing users to reuse recent searches

## Target Users

- College students looking for affordable homemade meals
- Busy professionals who want quick meal suggestions
- Families with dietary preferences
- Users who prefer homemade food over restaurant delivery

## Features Implemented

- Responsive landing page using Tailwind CSS
- Separate Smart Meal Match Finder page
- HTML5 semantic structure
- Form handling with client-side validation
- Dynamic meal filtering using JavaScript
- Conditional result generation
- Local Storage for:
  - zip code
  - saved meal preferences
  - recent search history
- Clipboard support to copy the result summary
- Browser print support to print the current results
- Reuse button for recent searches
- INR-based pricing throughout the prototype

## HTML5 / Browser Features Used

- `localStorage`
- `datalist`
- `output`
- `input` validation attributes
- Clipboard API
- `window.print()`

## Technologies Used

- HTML5
- Tailwind CSS (via CDN)
- JavaScript (Vanilla JS)

## File Structure

- `index.html`  
  Main HomeBite landing page

- `smart-meal-match.html`  
  Separate Smart Meal Match Finder module

- `README.md`  
  Project documentation for GitHub submission

## JavaScript Concepts Demonstrated

- DOM selection and manipulation
- Event listeners
- Form validation
- Arrays and filtering
- Conditional logic
- Template literals
- Dynamic HTML rendering
- Local storage persistence
- Reusable helper functions

## Innovation / Value Addition
This project goes beyond a static landing page by adding a meaningful interactive tool that solves a genuine decision-making problem for users.

Extra value additions include:

- Closest-match logic when exact matches are unavailable
- Search history with one-click reuse
- Copy and print actions for current results
- Separated module architecture instead of crowding the landing page

## How To Run

1. Open `index.html` in a browser.
2. Click **Open Smart Meal Match Finder**.
3. Fill in the form and test the interactive features.

## Responsible AI Usage Note
AI tools were used for ideation, UI improvement, debugging support, and documentation refinement.  
The final code and project structure were reviewed and organized for learning and assessment use.

## Suggested PPT Sections

1. Title slide
2. Problem statement
3. Target users
4. Existing problem in meal discovery
5. Proposed solution: HomeBite Smart Meal Match Finder
6. Features implemented
7. Technologies used
8. JavaScript concepts demonstrated
9. HTML5/browser features used
10. Responsible AI usage
11. Future scope
12. Learning reflection

## Future Scope

- Real backend integration
- Live chef inventory
- Dynamic exchange-rate or pricing updates
- Login-based personalized meal history
- Order placement workflow

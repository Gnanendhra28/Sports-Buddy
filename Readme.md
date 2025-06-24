# Sports Buddy

## Project Overview
Sports Buddy is a web application designed to help users connect with others for various sports activities. Users can upload details on sports information, locations, and times of events near them. [cite_start]It aims to foster genuine, meaningful interactions outside of social circles by allowing users to find sports partners based on their interests and ability levels. 

## Technologies Used
* **Frontend:** HTML, CSS, JavaScript
* [cite_start]**Backend/Database:** Google Firebase (Authentication, Firestore Database) 

## Features
### [cite_start]User Module 
* [cite_start]**Register:** New users can create an account. 
* [cite_start]**Login:** Registered users can log in to access features. 
* [cite_start]**Add Sports Events:** Users can add details about sports events. 
* [cite_start]**Update/Delete Sports:** Users can manage their added sports events. 

### [cite_start]Admin Module (Planned/Future) 
* [cite_start]**Login:** Admin login. 
* [cite_start]**Add/Update Sports Category:** Manage sports categories (e.g., Football, Basketball). 
* [cite_start]**Add/Update City/Area:** Manage geographical locations for events. 
* [cite_start]**Delete Sports:** Admin can delete sports entries. 

## [cite_start]Project Difficulties Level 
* Medium

## Setup and Local Development

### Prerequisites
* Node.js (for npm)
* Web Browser (Chrome recommended)
* A Firebase project set up with Authentication and Firestore Database enabled.

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/SportsBuddy.git](https://github.com/YourUsername/SportsBuddy.git)
    cd SportsBuddy
    ```

2.  **Firebase Configuration:**
    * Go to your Firebase project console.
    * Navigate to Project settings -> Your apps.
    * Copy your Firebase configuration object.
    * Open `js/app.js` and **replace the `firebaseConfig` object** with your actual configuration.

3.  **Run Locally:**
    * You can simply open `index.html` in your web browser.
    * For a more robust local server (e.g., to handle API requests if you expand functionality), you could use `live-server` (install via `npm install -g live-server`) and then run `live-server` in the project root.

## [cite_start]Basic Workflow and Execution 

1.  **Open `index.html`** in your browser.
2.  The application will initially display a **Login/Register form** if no user is authenticated.
3.  **Register** a new user or **Login** with existing credentials.
4.  Upon successful login, the UI will change to show options like "Home" and "Events".
5.  Navigate to the **"Events"** section to view existing events or **add a new sports event**.
6.  Added events will be stored in your **Firebase Firestore database**.
7.  **Logout** to return to the authentication screen.

## [cite_start]Code Standards and Practices 
* [cite_start]**Modular Fashion:** Code is structured into logical functions and modules (e.g., render functions, event handlers). 
* [cite_start]**Logging:** All significant actions (login, logout, add event, fetch data) are logged to the console using `console.log` as a placeholder for a dedicated logging library. 
* [cite_start]**Testable & Maintainable:** Functions are designed to be relatively isolated for easier testing and future maintenance. 

## Project Evaluation Metrics Addressed

* [cite_start]**Code Quality:** Emphasizes modularity, safety, testability, maintainability, and portability. 
* [cite_start]**GitHub Repository:** Code is hosted publicly. 
* [cite_start]**Proper Readme:** This file serves as the detailed README. 
* [cite_start]**Database:** Uses Firebase Firestore. 
* [cite_start]**Logging:** Implemented basic `console.log` for demonstration, expandable to a JavaScript logging library. 

## [cite_start]Optimization Considerations 
* **Code Level:** Using asynchronous operations (`async/await`) for Firebase calls, optimizing DOM manipulation by updating larger sections rather than individual elements repeatedly.
* **Architecture Level:** Firebase automatically handles scalability for authentication and database. For complex queries or server-side logic, Firebase Cloud Functions could be integrated.
* **Future Optimizations:**
    * Batching writes to Firestore when adding multiple items.
    * Implementing pagination for large lists of events.
    * Using CDN-hosted libraries for faster loading.

## [cite_start]Test Cases (Examples) 

Here are some example test cases to consider for the application:

* **User Registration:**
    * **Test Case 1:** Successful registration with valid email and password.
    * **Test Case 2:** Attempt to register with an already existing email.
    * **Test Case 3:** Attempt to register with an invalid email format.
    * **Test Case 4:** Attempt to register with a weak password (e.g., less than 6 characters).

* **User Login:**
    * **Test Case 5:** Successful login with correct credentials.
    * **Test Case 6:** Login attempt with incorrect password.
    * **Test Case 7:** Login attempt with unregistered email.

* **Add Sports Event:**
    * **Test Case 8:** Logged-in user successfully adds a new event with all required fields.
    * **Test Case 9:** Attempt to add an event without being logged in (should be prevented).
    * **Test Case 10:** Attempt to add an event with missing required fields (client-side validation).

* **View Sports Events:**
    * **Test Case 11:** Verify that newly added events appear in the list.
    * **Test Case 12:** Verify that events are displayed in chronological order (or chosen order).
    * **Test Case 13:** Check display when no events are available.

* **Delete Sports Event (User):**
    * **Test Case 14:** Logged-in user successfully deletes an event they created.
    * **Test Case 15:** Logged-in user attempts to delete an event created by another user (should be prevented or hidden).

* **User Interface/Navigation:**
    * **Test Case 16:** Verify navigation links (Home, Events, Profile) work correctly.
    * **Test Case 17:** Check UI elements change appropriately on login/logout (e.g., showing/hiding login/logout buttons).

## [cite_start]Deployment 
This project can be easily deployed using **Firebase Hosting**, which integrates seamlessly with Firebase projects.
1.  Install Firebase CLI: `npm install -g firebase-tools`
2.  Log in: `firebase login`
3.  Initialize project: `firebase init` (select Hosting and link to your project)
4.  Deploy: `firebase deploy`

Alternatively, you could host it on other static site hosting services like Netlify or Vercel by simply deploying the `public` folder (or whatever you configure in `firebase.json`).

## Submission Requirements
* **Project Code:** This GitHub repository serves as the project code submission. [cite_start]The link will be shared. 
* [cite_start]**Detailed Project Report:** A separate detailed project report document will be created and submitted as per the sample provided. 

---

This framework should give you a strong starting point for building your "Sports Buddy" application. Remember to populate your Firebase project with some dummy data to test your event fetching and display.
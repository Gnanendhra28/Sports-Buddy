// Import the functions you need from the SDKs you need using npm style
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, serverTimestamp, query, orderBy } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Your web app's Firebase configuration (provided by user)
const firebaseConfig = {
    apiKey: "AIzaSyCUJHvSPyE3ApwSu7j-h-rnQ3VugCcfqPA",
    authDomain: "sports-buddy-dd7bd.firebaseapp.com",
    projectId: "sports-buddy-dd7bd",
    storageBucket: "sports-buddy-dd7bd.firebasestorage.app",
    messagingSenderId: "1087160933541",
    appId: "1:1087160933541:web:96aeebb2eb18b28995c14c",
    measurementId: "G-T902YF14JW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the Auth service instance
const db = getFirestore(app); // Get the Firestore service instance

// 1. Logging Function (as required in evaluation metrics)
function logActivity(action, details = {}) {
    console.log(`[${new Date().toISOString()}] ACTION: ${action}`, details);
    // In a real application, you might send this to a dedicated logging service
    // For now, console.log is sufficient for the requirement.
}

// 2. UI Elements
const appContent = document.getElementById('app-content');
const loginRegisterLink = document.getElementById('loginRegisterLink');
const logoutButton = document.getElementById('logoutButton');
const profileLink = document.getElementById('profileLink');
const eventsLink = document.getElementById('eventsLink');
const homeLink = document.getElementById('homeLink');

// 3. Authentication State Listener
// This checks if a user is logged in or out and updates the UI accordingly
onAuthStateChanged(auth, user => {
    if (user) {
        logActivity("User logged in", { uid: user.uid, email: user.email });
        loginRegisterLink.style.display = 'none';
        logoutButton.style.display = 'block';
        profileLink.style.display = 'block'; // Show profile link when logged in
        eventsLink.style.display = 'block'; // Show events link when logged in
        renderHomePage(user); // Render user-specific home page or dashboard
    } else {
        logActivity("User logged out or not authenticated");
        loginRegisterLink.style.display = 'block';
        logoutButton.style.display = 'none';
        profileLink.style.display = 'none'; // Hide profile link when logged out
        eventsLink.style.display = 'none'; // Hide events link when logged out
        renderLoginPage(); // Render the login/registration page
    }
});

// 4. Render Functions (Modular approach for different sections)
function renderLoginPage() {
    logActivity("Rendering Login Page");
    appContent.innerHTML = `
        <section id="auth-section">
            <h2>Login / Register</h2>
            <form id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email:</label>
                    <input type="email" id="loginEmail" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password:</label>
                    <input type="password" id="loginPassword" required>
                </div>
                <div class="form-group">
                    <button type="submit">Login</button>
                </div>
            </form>
            <hr>
            <form id="registerForm">
                <h3>New User? Register here:</h3>
                <div class="form-group">
                    <label for="registerEmail">Email:</label>
                    <input type="email" id="registerEmail" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Password:</label>
                    <input type="password" id="registerPassword" required>
                </div>
                <div class="form-group">
                    <button type="submit">Register</button>
                </div>
            </form>
            <p id="authMessage" style="color: red;"></p>
        </section>
    `;

    // Event Listeners for Login and Register Forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

function renderHomePage(user = null) {
    logActivity("Rendering Home Page", { user: user ? user.uid : 'guest' });
    appContent.innerHTML = `
        <section id="welcome-section">
            <h2>Welcome to Sports Buddy!</h2>
            <p>Find your sports partner and join exciting events near you.</p>
            <p>The world's largest sports matching site, with millions of pairings.</p>
            ${user ? `<p>Hello, ${user.email}!</p>` : '<p>Please login or register to access all features.</p>'}
        </section>
        <section id="about-section">
            <h3>About Sports Buddy</h3>
            <p>Sports Buddy, powered by cutting-edge Android technology, allows you to grow your network, make new acquaintances, meet locals while traveling, and locate your buddy in over N sports.</p>
            <p>Creating an app that helps users to form genuine, meaningful interactions outside of their social circles.</p>
            <p>Connecting on Sports Buddy is simple and enjoyable; simply choose the sports you're interested in, establish your ability level, and start matching!</p>
        </section>
    `;
}

function renderEventsPage() {
    logActivity("Rendering Events Page");
    appContent.innerHTML = `
        <section id="events-list-section">
            <h2>Available Sports Events</h2>
            <div id="eventsContainer">
                <p>Loading events...</p>
            </div>
            <h3>Add New Sports Event</h3>
            <form id="addEventForm">
                <div class="form-group">
                    <label for="eventName">Event Name:</label>
                    <input type="text" id="eventName" required>
                </div>
                <div class="form-group">
                    <label for="eventSport">Sport:</label>
                    <input type="text" id="eventSport" required>
                </div>
                <div class="form-group">
                    <label for="eventLocation">Location:</label>
                    <input type="text" id="eventLocation" required>
                </div>
                <div class="form-group">
                    <label for="eventDate">Date & Time:</label>
                    <input type="datetime-local" id="eventDate" required>
                </div>
                <div class="form-group">
                    <button type="submit">Add Event</button>
                </div>
            </form>
            <div id="messageBox" class="hidden"></div>
        </section>
    `;
    fetchAndDisplayEvents(); // Function to load events from Firebase
    document.getElementById('addEventForm').addEventListener('submit', handleAddEvent);
}

// Admin page rendering is complex and would require roles/permissions
function renderAdminPage() {
    logActivity("Rendering Admin Page");
    appContent.innerHTML = `
        <section id="admin-section">
            <h2>Admin Dashboard</h2>
            <p>Manage Sports Categories, Cities, Areas, and Delete Sports.</p>
            <!-- Admin forms and lists would go here -->
            <p>This section requires robust role-based access control.</p>
        </section>
    `;
}

// Function to display messages in a custom modal/message box
function showMessageBox(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    if (!messageBox) {
        console.error("Message box element not found.");
        return;
    }
    messageBox.textContent = message;
    messageBox.className = ''; // Clear previous classes
    messageBox.classList.add('message-box', type); // Add base class and type class
    messageBox.classList.remove('hidden');

    // Optionally hide after some time
    setTimeout(() => {
        messageBox.classList.add('hidden');
    }, 5000);
}


// 5. Event Handlers
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const authMessage = document.getElementById('authMessage');

    try {
        await signInWithEmailAndPassword(auth, email, password);
        authMessage.textContent = 'Login successful!';
        authMessage.style.color = 'green';
        logActivity("Login Success", { email: email });
        // UI will update via onAuthStateChanged
    } catch (error) {
        authMessage.textContent = `Login failed: ${error.message}`;
        authMessage.style.color = 'red';
        logActivity("Login Failed", { email: email, error: error.message });
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const authMessage = document.getElementById('authMessage');

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        authMessage.textContent = 'Registration successful! You are now logged in.';
        authMessage.style.color = 'green';
        logActivity("Registration Success", { email: email });
        // UI will update via onAuthStateChanged
    } catch (error) {
        authMessage.textContent = `Registration failed: ${error.message}`;
        authMessage.style.color = 'red';
        logActivity("Registration Failed", { email: email, error: error.message });
    }
}

async function handleLogout() {
    try {
        await signOut(auth);
        logActivity("User Logged Out");
        // UI will update via onAuthStateChanged
    } catch (error) {
        console.error("Logout error:", error);
        logActivity("Logout Error", { error: error.message });
        showMessageBox(`Logout failed: ${error.message}`, 'error');
    }
}

async function handleAddEvent(event) {
    event.preventDefault();
    const eventName = document.getElementById('eventName').value;
    const eventSport = document.getElementById('eventSport').value;
    const eventLocation = document.getElementById('eventLocation').value;
    const eventDate = document.getElementById('eventDate').value; // This will be a string like "2025-06-24T10:30"

    if (!auth.currentUser) {
        showMessageBox("Please login to add events.", 'error');
        logActivity("Add Event Failed: Not Logged In");
        return;
    }

    try {
        await addDoc(collection(db, 'sportsEvents'), {
            name: eventName,
            sport: eventSport,
            location: eventLocation,
            dateTime: new Date(eventDate), // Convert to Firebase Timestamp
            createdBy: auth.currentUser.uid,
            createdAt: serverTimestamp() // Use Firestore's server timestamp
        });
        showMessageBox("Event added successfully!", 'success');
        logActivity("Event Added", { eventName, eventSport, eventLocation });
        document.getElementById('addEventForm').reset(); // Clear form
        fetchAndDisplayEvents(); // Refresh event list
    } catch (error) {
        showMessageBox(`Error adding event: ${error.message}`, 'error');
        logActivity("Add Event Failed", { error: error.message });
    }
}

async function fetchAndDisplayEvents() {
    logActivity("Fetching Sports Events");
    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = '<p>Loading events...</p>'; // Show loading message

    try {
        const eventsRef = collection(db, 'sportsEvents');
        const q = query(eventsRef, orderBy('dateTime', 'asc')); // Order by date/time
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            eventsContainer.innerHTML = '<p>No events found. Be the first to add one!</p>';
            logActivity("No Sports Events Found");
            return;
        }

        let eventsHtml = '<ul>';
        querySnapshot.forEach(docSnap => {
            const event = docSnap.data();
            const eventId = docSnap.id;
            // Removed onclick attribute here
            eventsHtml += `
                <li>
                    <strong>${event.name}</strong> (${event.sport})<br>
                    Location: ${event.location}<br>
                    Date/Time: ${event.dateTime ? event.dateTime.toDate().toLocaleString() : 'N/A'}
                    ${auth.currentUser && auth.currentUser.uid === event.createdBy ?
                        `<br><button class="delete-button" data-event-id="${eventId}">Delete</button>` : ''}
                </li>
            `;
        });
        eventsHtml += '</ul>';
        eventsContainer.innerHTML = eventsHtml;
        logActivity("Sports Events Fetched Successfully", { count: querySnapshot.size });

        // --- IMPORTANT CHANGE: Attach event listeners dynamically ---
        const deleteButtons = eventsContainer.querySelectorAll('.delete-button');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const eventIdToDelete = e.target.dataset.eventId;
                showDeleteConfirm(eventIdToDelete);
            });
        });
        // -----------------------------------------------------------

    } catch (error) {
        eventsContainer.innerHTML = `<p style="color: red;">Error loading events: ${error.message}</p>`;
        logActivity("Fetch Events Failed", { error: error.message });
    }
}

// showDeleteConfirm is now called from an event listener, not directly from HTML onclick
function showDeleteConfirm(eventId) {
    const confirmation = confirm("Are you sure you want to delete this event?"); // Using confirm for simplicity, but consider a custom modal
    if (confirmation) {
        deleteEvent(eventId);
    }
}

async function deleteEvent(eventId) {
    logActivity("Attempting to Delete Event", { eventId });
    try {
        await deleteDoc(doc(db, 'sportsEvents', eventId));
        showMessageBox('Event deleted successfully!', 'success');
        logActivity("Event Deleted Successfully", { eventId });
        fetchAndDisplayEvents(); // Refresh the list
    }
     catch (error) {
        showMessageBox(`Error deleting event: ${error.message}`, 'error');
        logActivity("Delete Event Failed", { eventId, error: error.message });
    }
}


// 6. Navigation Event Listeners
loginRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderLoginPage();
});

logoutButton.addEventListener('click', handleLogout);

profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    showMessageBox('Profile page coming soon! This is where users can update their details, ability level, etc.', 'info');
    logActivity("Profile Link Clicked");
});

eventsLink.addEventListener('click', (e) => {
    e.preventDefault();
    if (auth.currentUser) {
        renderEventsPage();
    } else {
        showMessageBox("Please login to view and add events.", 'warning');
        renderLoginPage();
    }
});

homeLink.addEventListener('click', (e) => {
    e.preventDefault();
    renderHomePage(auth.currentUser); // Render home page, passing current user if any
});

// Initial render based on auth state
// This will be handled by onAuthStateChanged initially, but
// we can call it here too to ensure a default view if the listener hasn't fired yet.
// However, onAuthStateChanged is asynchronous, so it's generally best to let it manage initial rendering.
// For now, let's ensure a default view if auth state isn't immediately known.
// The onAuthStateChanged listener handles the initial rendering based on user status.

# 📝 3D Claymorphism To-Do App

A beautifully designed, modern To-Do List web application featuring a "Straight 3D" (Claymorphism) user interface. This app allows users to manage their daily tasks with full CRUD (Create, Read, Update, Delete) functionality while providing a highly tactile, glossy, and visually engaging experience.

## ✨ Features

- **Stunning 3D UI:** Utilizes advanced CSS `box-shadow` layering and animations to create a soft, thick, "floating clay" aesthetic without needing WebGL or external 3D libraries.
- **Dynamic Color Themes:** Every new task is automatically assigned one of four pastel glossy color themes (Blue, Pink, Orange, or White) to keep the list vibrant.
- **Task Timestamps:** Automatically records and displays the exact time (e.g., "02:01 PM") a task was added.
- **Local Storage Persistence:** Tasks are saved to the browser's `localStorage`. You can close the tab or refresh the page, and your tasks will still be there.
- **Full CRUD Capabilities:**
  - **Add:** Type a task and hit "Enter" or click the Add button.
  - **View:** Click the "View" button to see a summary popup of the task's status and creation time.
  - **Edit:** Inline editing allows you to modify the text of a task seamlessly.
  - **Delete:** Remove tasks you no longer need.
  - **Complete:** Check off tasks to strike them through.
- **Interactive Animations:** Buttons physically "press down" when clicked, simulating real-world tactile feedback.

## 🛠️ Technologies Used

- **HTML5:** Semantic structure of the application.
- **CSS3:** Advanced styling using CSS Variables (`:root`), Flexbox, keyframe animations (for floating background shapes), and complex box-shadows.
- **Vanilla JavaScript (ES6+):** Handles DOM manipulation, event listeners, state management, array mapping/filtering, and local storage integration. No external frameworks (like React or Vue) were used.

## 📂 Project Structure

Ensure all three files are in the same directory for the app to work correctly:

```text
📁 todo-app/
├── 📄 index.html    # The main structure and layout of the app
<<<<<<< HEAD
├── 📄 style.css    # The 3D styling, colors, and animations
├── 📄 script.js     # The logic for adding, editing, deleting, and saving tasks
└── 📄 README.md     # Project documentation
=======
├── 📄 styles.css    # The 3D styling, colors, and animations
├── 📄 script.js     # The logic for adding, editing, deleting, and saving tasks
└── 📄 README.md     # Project documentation
>>>>>>> a1d1ac6 (readme)

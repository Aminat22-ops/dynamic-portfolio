// script.js

// ✅ Task 1: Dynamic Year
const currentYearSpan = document.getElementById('current-year');
currentYearSpan.textContent = new Date().getFullYear();

// ✅ Task 2: Interactive Skill Buttons
const skillButtons = document.querySelectorAll('.skill-btn');
const skillDescription = document.getElementById('skill-description');

const skillInfo = {
  "HTML": "HTML is like the bones of every webpage. I use it to structure everything clean and clear 🦴.",
  "CSS": "CSS makes everything pretty. It's the digital makeup artist of my projects 💅.",
  "JavaScript": "JavaScript brings the drama — it adds life, motion, and fun to my web magic ✨."
};

skillButtons.forEach(button => {
  button.addEventListener('click', () => {
    const skill = button.dataset.skill;
    skillDescription.textContent = skillInfo[skill];
    skillDescription.style.color = '#b03060'; // rose text color
  });
});

// ✅ Task 3: Dark Mode Toggle
const themeToggleBtn = document.getElementById('themeToggle');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  // Save preference to local storage
  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Load saved theme on page load
window.addEventListener('load', () => {
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
  }
  loadProjects(); // Also load the projects JSON on page load
});

// ✅ Task 4: Load and Display Portfolio Projects from JSON
const projectsContainer = document.getElementById('projects-container');

async function loadProjects() {
  try {
    const response = await fetch('data/portfolio_items.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const projects = await response.json();

    projects.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('project-card');
      projectCard.innerHTML = `
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <a href="${project.link}" target="_blank">View Project</a>
      `;
      projectsContainer.appendChild(projectCard);
    });
  } catch (error) {
    console.error('Error loading projects:', error);
    projectsContainer.innerHTML = <p>Oops! Couldn’t load your lovely projects. Please try again later.</p>;
  }
}
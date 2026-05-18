const courses = [
  { code: 'WDD 130', name: 'Foundations of Web Design', credits: 2, subject: 'ALL', completed: true },
  { code: 'WDD 131', name: 'Web Development I', credits: 2, subject: 'CSE', completed: false },
  { code: 'WDD 231', name: 'Web Development II', credits: 2, subject: 'WDD', completed: false }
];

const coursesContainer = document.getElementById('courses');
const creditsDisplay = document.getElementById('credits');
const filterButtons = document.querySelectorAll('.filter-row button');
const menuToggle = document.querySelector('.menu-toggle');
const primaryNavigation = document.getElementById('primary-navigation');
const navLinks = primaryNavigation.querySelectorAll('a');

function displayCourses(courseList) {
  coursesContainer.innerHTML = '';
  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    if (course.completed) {
      card.classList.add('completed');
    }

    const title = document.createElement('p');
    title.className = 'course-title';
    title.textContent = course.code;
    card.appendChild(title);

    const name = document.createElement('p');
    name.className = 'course-name';
    name.textContent = course.name;
    card.appendChild(name);

    const detailRow = document.createElement('div');
    detailRow.className = 'course-meta';
    detailRow.innerHTML = `
      <span>${course.subject}</span>
      <span>${course.credits} credits</span>
    `;
    card.appendChild(detailRow);

    if (course.completed) {
      const status = document.createElement('span');
      status.className = 'course-status';
      status.textContent = 'Completed';
      card.appendChild(status);
    }

    coursesContainer.appendChild(card);
  });
  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  creditsDisplay.textContent = totalCredits;
}

function setActive(button) {
  filterButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.setAttribute('aria-pressed', 'false');
  });
  button.classList.add('active');
  button.setAttribute('aria-pressed', 'true');
}

function toggleMenu() {
  const isOpen = primaryNavigation.getAttribute('data-visible') === 'true';
  primaryNavigation.setAttribute('data-visible', String(!isOpen));
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Open main navigation' : 'Close main navigation';
}

function closeMenu() {
  primaryNavigation.setAttribute('data-visible', 'false');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.querySelector('.sr-only').textContent = 'Open main navigation';
}

menuToggle.addEventListener('click', toggleMenu);

navLinks.forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.getElementById('allBtn').addEventListener('click', (event) => {
  setActive(event.currentTarget);
  displayCourses(courses);
});

document.getElementById('cseBtn').addEventListener('click', (event) => {
  setActive(event.currentTarget);
  displayCourses(courses.filter(course => course.subject === 'CSE'));
});

document.getElementById('wddBtn').addEventListener('click', (event) => {
  setActive(event.currentTarget);
  displayCourses(courses.filter(course => course.subject === 'WDD'));
});

displayCourses(courses);

document.getElementById('year').textContent = `© ${new Date().getFullYear()} · Hyeyendele Rashidi · Kampala, Uganda`;

document.getElementById('modified').textContent = `Last Modified: ${document.lastModified}`;

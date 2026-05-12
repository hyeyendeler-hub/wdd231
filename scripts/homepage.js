const courses = [
  { code: 'WDD 130', credits: 2, subject: 'ALL' },
  { code: 'WDD 131', credits: 2, subject: 'CSE' },
  { code: 'WDD 231', credits: 2, subject: 'WDD' }
];

const coursesContainer = document.getElementById('courses');
const creditsDisplay = document.getElementById('credits');
const filterButtons = document.querySelectorAll('.filter-row button');

function displayCourses(courseList) {
  coursesContainer.innerHTML = '';
  courseList.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.textContent = course.code;
    coursesContainer.appendChild(card);
  });
  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);
  creditsDisplay.textContent = totalCredits;
}

function setActive(button) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

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

document.getElementById('year').textContent = '© 2026 · Hyeyendele Rashidi · Uganda';

document.getElementById('modified').textContent = `Last Modified: ${document.lastModified}`;

const courses = [
  {
    code: 'WDD 230',
    credits: 3,
    subject: 'WDD',
    completed: true
  },
  {
    code: 'WDD 231',
    credits: 3,
    subject: 'WDD',
    completed: false
  },
  {
    code: 'CSE 110',
    credits: 3,
    subject: 'CSE',
    completed: true
  },
  {
    code: 'CSE 111',
    credits: 3,
    subject: 'CSE',
    completed: false
  }
];

const coursesContainer = document.getElementById('courses');
const creditsDisplay = document.getElementById('credits');

function displayCourses(courseList) {
  coursesContainer.innerHTML = '';

  courseList.forEach(course => {
    const card = document.createElement('div');
    card.classList.add('course-card');

    if (course.completed) {
      card.classList.add('completed');
    }

    card.innerHTML = `
      <h4>${course.code}</h4>
      <p>${course.credits} Credits</p>
      <p>${course.completed ? 'Completed' : 'In Progress'}</p>
    `;

    coursesContainer.appendChild(card);
  });

  const totalCredits = courseList.reduce((total, course) => {
    return total + course.credits;
  }, 0);

  creditsDisplay.textContent = totalCredits;
}

const filterButtons = document.querySelectorAll('.buttons button');

function setActiveFilter(button) {
  filterButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

document.getElementById('allBtn').addEventListener('click', (event) => {
  setActiveFilter(event.currentTarget);
  displayCourses(courses);
});

document.getElementById('wddBtn').addEventListener('click', (event) => {
  setActiveFilter(event.currentTarget);
  const filtered = courses.filter(course => course.subject === 'WDD');
  displayCourses(filtered);
});

document.getElementById('cseBtn').addEventListener('click', (event) => {
  setActiveFilter(event.currentTarget);
  const filtered = courses.filter(course => course.subject === 'CSE');
  displayCourses(filtered);
});

displayCourses(courses);

document.getElementById('year').textContent =
  `© ${new Date().getFullYear()} | WDD 231 Course Home Page`;

document.getElementById('modified').textContent =
  `Last Modified: ${document.lastModified}`;
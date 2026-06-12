const directoryElement = document.getElementById('directory');
const memberCountElement = document.getElementById('member-count');
const viewButtons = document.querySelectorAll('[data-view]');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.getElementById('main-navigation');

const membershipLabel = {
  1: 'Member',
  2: 'Silver',
  3: 'Gold'
};

async function fetchMembers() {
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) {
      throw new Error(`Unable to load members: ${response.status}`);
    }
    const data = await response.json();
    return data.members || [];
  } catch (error) {
    directoryElement.innerHTML = '<p class="error-message">Unable to load the directory at this time.</p>';
    console.error(error);
    return [];
  }
}

function createMemberCard(member, viewType) {
  const card = document.createElement('article');
  card.className = 'member-card';
  if (viewType === 'list') {
    card.classList.add('list-view');
  }

  const imageWrapper = document.createElement('div');
  imageWrapper.className = 'member-photo';
  const image = document.createElement('img');
  image.src = `images/${member.image}`;
  image.alt = `${member.name} logo`;
  imageWrapper.appendChild(image);

  const info = document.createElement('div');
  info.className = 'member-info';
  info.innerHTML = `
    <h3>${member.name}</h3>
    <div class="member-meta">
      <span class="member-chip ${membershipLabel[member.membershipLevel].toLowerCase()}">${membershipLabel[member.membershipLevel]}</span>
      <span class="member-chip">${member.category}</span>
    </div>
    <p>${member.address}</p>
    <p>${member.phone}</p>
    <p><a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit website</a></p>
  `;

  card.append(imageWrapper, info);
  return card;
}

function renderMembers(members, viewType = 'grid') {
  directoryElement.innerHTML = '';
  directoryElement.className = viewType === 'list' ? 'directory-list' : 'directory-grid';
  const displayed = members.map(member => createMemberCard(member, viewType));
  displayed.forEach(card => directoryElement.appendChild(card));
  memberCountElement.textContent = `${members.length} chamber members listed`;
}

function setActiveView(button) {
  viewButtons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');
}

function applyView(members, viewType) {
  setActiveView(document.querySelector(`[data-view="${viewType}"]`));
  renderMembers(members, viewType);
}

async function initDirectory() {
  const members = await fetchMembers();
  if (!members.length) return;
  applyView(members, 'grid');

  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      applyView(members, button.dataset.view);
    });
  });
}

function updateFooter() {
  const authorElement = document.getElementById('author');
  const modifiedElement = document.getElementById('modified');
  const year = new Date().getFullYear();
  authorElement.textContent = `© ${year} Hyeyendele Rashidi`;
  modifiedElement.textContent = `Last Modified: ${document.lastModified}`;
}

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  mainNav.classList.toggle('open');
});

initDirectory();
updateFooter();

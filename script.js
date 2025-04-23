document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Projects Viewer
// Pull repos from GitHub API
const projectsBox = document.getElementById('projectsBox');
const btnPrev = document.getElementById('projectNavButtonLeft')
const btnNext = document.getElementById('projectNavButtonRight');

let page = 1
const itmPerPage = 1

async function fetchProjects() {
  const url = `https://api.github.com/users/xprotonium/repos?per_page=${itmPerPage}&page=${page}&sort=updated`;

  const response = await fetch(url);
  const repositories = await response.json();
  renderProjectCard(repositories);

  btnPrev.disabled = page <= 1;
  btnNext.disabled = repositories.length < itmPerPage;
}

function renderProjectCard(repositories) {
  projectsBox.innerHTML = '';  // clear out old cards

  repositories.forEach(repositories => {
    const card = document.createElement('div');
    card.className = 'projectCard';

    card.innerHTML = `
      <h3 class="cardTitle">${repositories.name}</h3>
      <p>${repositories.description || ''}</p>
      <a href="${repositories.html_url}" target="_blank" class="cardLink">View on GitHub</a>
    `;

    projectsBox.appendChild(card);
  });
}

btnPrev.onclick = () => {
  if (page > 1) {
    page--;
    fetchProjects();
  }
}

btnNext.onclick = () => {
  page++;
  fetchProjects();
}

fetchProjects();
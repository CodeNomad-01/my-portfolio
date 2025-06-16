document.addEventListener("DOMContentLoaded", function () {
  const username = "CodeNomad-01";
  const projectsContainer = document.getElementById("projects-list");
  const maxRepos = 10;

  fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=${maxRepos}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("GitHub API request failed");
      }
      return response.json();
    })
    .then(repos => {
      projectsContainer.innerHTML = "";
      if (repos.length === 0) {
        projectsContainer.innerHTML = "<p>No repositories found.</p>";
        return;
      }
      repos.forEach(repo => {
        if (repo.fork) return;
        const div = document.createElement("div");
        div.className = "project-tile";
        const link = document.createElement("a");
        link.href = repo.html_url;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = repo.name;
        div.appendChild(link);
        if (repo.description) {
          const p = document.createElement("p");
          p.textContent = repo.description;
          div.appendChild(p);
        }
        projectsContainer.appendChild(div);
      });
      if (!projectsContainer.hasChildNodes()) {
        projectsContainer.innerHTML = "<p>No non-fork repositories to display.</p>";
      }
    })
    .catch(error => {
      console.error(error);
      projectsContainer.innerHTML = "<p>Unable to load projects at this time.</p>";
    });
});

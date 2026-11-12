const repositoryList = document.querySelector("#repository-list");
const statusMessage = document.querySelector("#status");

function createRepositoryCard(repository) {
  const item = document.createElement("li");
  item.className = "repository-card";

  const link = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url;
  link.textContent = repository.name;

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const meta = document.createElement("div");
  meta.className = "repository-meta";

  if (repository.language) {
    const language = document.createElement("span");
    language.textContent = repository.language;
    meta.append(language);
  }

  const starredAt = document.createElement("time");
  starredAt.dateTime = repository.starredAt;
  starredAt.textContent = `Starred ${new Date(repository.starredAt).toLocaleDateString()}`;
  meta.append(starredAt);

  item.append(link, description, meta);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a JSON array");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));
    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.textContent = "Repositories couldn't be loaded. Please try again later.";
  }
}

loadRepositories();

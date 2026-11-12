constrepositoryList = document.querySelector("#repository-list");
conststatusMessage = document.querySelector("#status");

functioncreateRepositoryCard(repository) {
  constitem = document.createElement("li");
  item.className = "repository-card";

  constlink = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url || "#";
  link.textContent = repository.name || "Unnamed repository";

  constdescription = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description || "";

  constmeta = document.createElement("div");
  meta.className = "repository-meta";

  if (repository.language) {
    constlanguage = document.createElement("span");
    language.textContent = repository.language;
    meta.append(language);
  }

  if (repository.starredAt) {
    conststarredAt = document.createElement("time");
    starredAt.dateTime = repository.starredAt;

    constdate = new Date(repository.starredAt);
    starredAt.textContent = `Starred ${Number.isNaN(date.getTime()) ? "unknown date" : date.toLocaleDateString()}`;

    meta.append(starredAt);
  }

  item.append(link, description, meta);
  return item;
}

async function loadRepositories() {
  if (!repositoryList || !statusMessage) {
    console.error("Required DOM elements not found.");
    return;
  }

  try {
    constresponse = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    constrepositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a JSON array");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));

    statusMessage.textContent = repositories.length ? "" : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.textContent = "Repositories couldn't be loaded. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", loadRepositories);const repositoryList = document.querySelector("#repository-list");
conststatusMessage = document.querySelector("#status");

function RepositoryCard(repository) {
  constitem = document.createElement("li");
  item.className = "repository-card";

  constlink = document.createElement("a");
  link.className = "repository-name";
  link.href = repository.url || "#";
  link.textContent = repository.name || "Unnamed repository";

  constdescription = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description || "";

  constmeta = document.createElement("div");
  meta.className = "repository-meta";

  if (repository.language) {
    constlanguage = document.createElement("span");
    language.textContent = repository.language;
    meta.append(language);
  }

  if (repository.starredAt) {
    conststarredAt = document.createElement("time");
    starredAt.dateTime = repository.starredAt;

    constdate = new Date(repository.starredAt);
    starredAt.textContent = `Starred ${Number.isNaN(date.getTime()) ? "unknown date" : date.toLocaleDateString()}`;

    meta.append(starredAt);
  }

  item.append(link, description, meta);
  return item;
}

async function loadRepositories() {
  if (!repositoryList || !statusMessage) {
    console.error("Required DOM elements not found.");
    return;
  }

  try {
    constresponse = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    constrepositories = await response.json();
    if (!Array.isArray(repositories)) {
      throw new Error("Repository data must be a JSON array");
    }

    repositoryList.replaceChildren(...repositories.map(createRepositoryCard));

    statusMessage.textContent = repositories.length ? "" : "No starred repositories yet.";
  } catch (error) {
    console.error("Could not load starred repositories:", error);
    statusMessage.textContent = "Repositories couldn't be loaded. Please try again later.";
  }
}

document.addEventListener("DOMContentLoaded", loadRepositories);
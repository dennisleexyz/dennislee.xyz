import { html } from "https://esm.sh/@arrow-js/core"
html`
  <thead>
    <tr>
      ${["name", "description", "language"].map((key) => `<th>${key}</th>`)}
    </tr>
  </thead>
  <tbody>
    ${await fetch("https://api.github.com/users/dennisleexyz/repos")
      .then((response) => response.json())
      .then((data) =>
        data
          .sort((a, b) => b.size - a.size)
          .map(
            (repo) => `<tr>
      <td><a href=${repo.html_url}>${repo.name}</a></td>
      <td>${repo.description + (repo.homepage ? ` <a href=${repo.homepage}>${repo.homepage}</a>` : "")}</td>
      <td>${repo.language}</td>
    </tr>`,
          ),
      )}
  </tbody>
`(document.querySelector("table"))

import { html } from "https://esm.sh/@arrow-js/core"
const owners = ["dennisleexyz", "moduloindustries"]
html`
  <thead>
    <tr>
      ${["name", "description", "language"].map((key) => `<th>${key}</th>`)}
    </tr>
  </thead>
  <tbody>
    ${await Promise.all(owners.map((owner) => fetch(`https://api.github.com/users/${owner}/repos`)))
      .then((responses) => Promise.all(responses.map((response) => response.json())))
      .then((data) =>
        data
          .flat()
          .sort((a, b) => b.size - a.size)
          .map(
            (repo) => `<tr>
      <td><a href=${repo.html_url}>${repo.name}</a></td>
      <td>${
        repo.description + (repo.homepage ? ` <a href=${repo.homepage}>${repo.homepage}</a>` : "")
      }</td>
      <td>${repo.language}</td>
    </tr>`,
          ),
      )}
  </tbody>
`(document.querySelector("table"))

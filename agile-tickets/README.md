This directory is for updated static exports of our Trello agile board in json and html format, as well as out Github issue queue.

The Trello board itself is publicly available at https://trello.com/b/IlUoml5c/nebula and may also be used for convenient reference/search/filtering.
The Github issue queue is publicly available at https://github.com/CivicActions/nebula/issues and may also be used for convenient reference/search/filtering.

To update these files for Trello:

* Use Trello json export function to update json file. Rename to "trello.json".
* Use tool at http://connie-clark.github.io/print-trello/ to produce a HTML report by pasting in the json.
* Save the resulting page as "trello.html" - do not save the complete page, just HTML.
* Review and commit the results.

To update these files for Github:

* Install gh-issue-export using the command `npm i gh-issue-export`
* Apply the github/gh-issue-export-md.patch patch to node_modules/gh-issue-export - this changes the template to export in Markdown format.
* From this directory run `./node_modules/.bin/gh-issue-export -u CivicActions -r nebula -o github`
* To update the json exports, install the HTTPie http client, and run: `http --pretty=format 'https://api.github.com/repos/CivicActions/nebula/issues?state=open' > github-open-issues.json` and `http --pretty=format 'https://api.github.com/repos/CivicActions/nebula/issues?state=closed' > github-closed-issues.json` 
* Review and commit the results.

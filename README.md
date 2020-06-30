# ![Scale-Up Velocity](./readme-files/logo-main.png)   Final 1/5 - Tickets Manager
This project will include most of the topics we have learnt so far.
This repository includes a basic skeleton with automated tests, use it for you submissions.
In this project you will create a Ticket Manager Web Application, with React.js and Express


## Instructions
 - Go [here](https://github.com/new/import) and import this repository into your account. Make sure to select the private option
 - Clone your new repository to your computer
 - Install the project dependencies by running npm install from the client folder and the server folder
 - Create new brunch
 - Change the project to meet the requirements
 - [Commit Early, Push Often](https://www.worklytics.co/commit-early-push-often/) - your work might be evaluated by your push history
 - Good Luck!



## Running tests
We have created automated tests for your convenience, use it to check your progression.

Note that the automated tests rely on your code having the exact class names and Ids as specified below.
Feel free to add your own.

To run the server tests simply run
```
$ npm run test
```
on server folder

To run the client tests make sure you started the "create-react-app" server that serve on 3000 (npm start)
And then
```
$ npm run test
```
On the client folder



## Requirements Backend
The express app should locate in `server` folder in file named app.js and expose app object (`module.exports = app;`).
- The server should run on port `8080` serve the react app on `http://localhost:8080/` and expose those APIs:
  - [GET] api/tickets - will return array of tickets from `server/data.json`. If called with [query param](https://en.wikipedia.org/wiki/Query_string) `searchText` the API will [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) out tickets that haven't title that include the value of `searchText` - should be [case-insensitive](https://en.wikipedia.org/wiki/Case_sensitivity)
  - [POST] api/tickets/[:ticketId](https://stackoverflow.com/a/20089634/10839175)/done - will set `done` property true for the given ticketId
  - [POST] api/tickets/[:ticketId](https://stackoverflow.com/a/20089634/10839175)/undone - will set `done` property false for the given ticketId

## Requirements Client
- The app title should be `Tickets Manager` with custom [favicon](https://en.wikipedia.org/wiki/Favicon) you can create one [here](https://favicon.io/)
- The app should load (from backend) and show all Tickets.
- Ticket component should have className `ticket` and look like:
  ![ticketcomponent](./readme-files/ticketcomponent.png)
- App ticket's data might also contain labels (tags) any label should have the class `label`, add the labels according to the following design below. PS: feel free to add more labels to the data (data.json) if you need.

  ![tags](./readme-files/tags.png)

- The app should have input with id `searchInput` that onChange will call the server with relevant `searchText` param and update the list by the results
- Add a hide button with className `hideTicketButton` that will hide the tickets from view. Add a counter of the hiding tickets with class `hideTicketsCounter`. Add an element to restore the list on click with id `restoreHideTickets`

  ![hide](./readme-files/hideit.gif)


## Bonus
1. Add a new feature - any cool functionality you want to add to the app
2. Add a test to the new feature



## Grading policy
* Your project will be graded by the number of automatic tests you pass
* Visual creativity, use css to make this app app awesome 💅🏿
* Bonus - Please add an explanation about the bonus task in the PR.
* Code quality <!-- variable names, comments, function names? -->
* Git usage <!-- commit messages -->



## Submitting
 - Run on windows `$env:RECORD_TEST='true'; npm run test` on mac `RECORD_TEST=true npm run test` inside the client folder, that will create gif file of your UI testing may take up to 4min, don't forget to push this generated file as well (`ui-testing-recording.gif`)
 - Create a Pull Request from the new brunch into master in your duplicated repository
 - add username: f4s-master, email: ? as collaborators to your imported repo. 
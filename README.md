# Step6

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Express server
Server Folder and main entry point will be app.js. To run this file node app.js.

## Application Build & Run with Express Routes
Run `npm run build`

## Boilerplate for Movies App Assignment - 10 Movies to Watch Before I Die

The folders and files you see in this repositories, is how it is expected to be in projects, which are submitted for Automated Evaluations

    Angular CLI Project additional files and folders
    |
    ├── config // For all configuration
    |
    ├── server          // All server code should be inside this folder
    |
    ├── index.js            // The main entry point for the project contains the default express code with certain middlewares
    |
    ├── .hobbes             // Please do not delete - meant for Automated Evaluation
    |
    └── PROBLEM.md          // The problem of the assignment/project

    server  // Contains several other folders and files
    ├── test            //  No Test cases in this step but folder should be there
    ├── model // Contains Schema for Movie DBs    
    |
    ├── routes // Contains Express Route Logic


> PS: All lint rule files are by default copied during the evaluation process, however if need to be customizing, you should copy from this repo and modify in your project repo


#### To use this as a boilerplate for your new project, you can follow these steps

1. Clone the base boilerplate in your local

    `git clone https://gitlab-mt.stackroute.in/stack_js_movieapp/movie-app-step-5-boilerplate.git` (If you are using the Cloud Based Dev Environment)

2. Remove its remote or original reference

    `git remote rm origin`

3. Add your new repository reference as remote

    `git remote add origin ssh://git@gitlab-mt.stackroute.in:2222/<USERNAME>/<your-new-project-repo.git>`

4. Commit and Push the project to git

    `git commit -a -m "Initial commit | or place your comments according to your need"`

    `git push -u origin master`

5. Check on the git repo online, if the files have been pushed

### Important
> - We expect you to write the assignment on your own by following through the guidelines, learning plan, and the practice exercises
> - The code must not be plagiarised, the mentors will randomly pick the submissions and may ask you to explain the solution
> - The code must be properly indented, code structure maintained as per the boilerplate and properly commented
> - Follow through the problem statement and stories shared with you



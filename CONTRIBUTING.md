# CONTRIBUTING

When contributing to this repository, please first discuss the change you wish to make via [issues](https://github.com/Pelkhier/typest-app/issues).

Please note if you are working on a certain issue then make sure to stay active with development.

## Git Commit, Branch, and PR Naming Conventions

When you are working with git, please be sure to follow the conventions below on your pull requests, branches, and commits:

```text
PR: [#ISSUE ID] Title of the PR
Branch: [ISSUE ID]-title-of-the-pr (shorter)
Commit: [[ISSUE ID]] [ACTION]: what was done
```

Examples:

```text
PR: #2 updating documents
Branch: 2-updating-documents
Commit: [2] feature: adding missing sections
```

## Prerequisites

You will need to [install Rust Language and Cargo](https://www.rust-lang.org/tools/install) on your local machine.

If you want to follow the main repo enviroment config you need to [install pnpm](https://pnpm.io/installation).

Also you need to [install Tauri cli](https://tauri.app/) to run and build Typest app, you can use your package manager (such NPM or Yarn) but it's not recommended by Tauri maintainers, So it's better to work with Cargo and Tauri cli.

## Installation

To get started with Typest locally, follow these steps

1. Make sure you have installed Rust and Cargo locally (See above Prerequisites), run this command to see the version installed:

    ```sh
    cargo --version
    ```

    also see if Tauri cli installed right by running:

    ```sh
    cargo tauri -V
    ```

2. Fork the repo

3. Clone your fork

    ```sh
     git clone https://github.com/<YOUR_GITHUB_ACCOUNT_NAME>/typest-app.git
    ```

4. Navigate to the project directory

    ```sh
    cd typest-app
    ```

5. Install node_modules packages

    - (Recommended)

    ```sh
    pnpm i
    ```

    - Or

    ```sh
    npm i
    ```

    If you run into any problem, visit [Tauri Documentation](https://tauri.app/v1/guides/getting-started/setup) or rise an [issue](https://github.com/Pelkhier/typest-app/issues).

6. Start the dev server

    - (Recommended)

    ```sh
    cargo tauri dev
    ```

7. Build the app
   If you want to generate the installer and executable app, you can build by running:

    ```sh
    cargo tauri dev
    ```

    You will find the installer in app-root\src-tauri\target\release\bundle\nsis

## Note

If you're new to Github and working with open source repositories, You can watch this video by freeCodeCamp.org :

[![Complete Guide to Open Source - How to Contribute](https://img.youtube.com/vi/yzeVMecydCE/0.jpg)](https://youtu.be/yzeVMecydCE?si=qMEOAFKT32qqHS4y)

If you know better source, please feel free to add it here
<br/>

## Working on New Features

If you want to work on a new feature, follow these steps.

1. Fork the repo
2. Clone your fork
3. Checkout a new branch
4. Do your work
5. Commit
6. Push your branch to your fork
7. Go into github UI and create a PR from your fork & branch, and merge it into upstream MAIN (main branch from typest-app)

## Pulling in changes from upstream

You should pull in the changes that we add in daily, preferably before you checkout a new branch to do new work. here is how:

1. Make sure that your repo pointed to upstream main

```sh
git remote add upstream main
```

2. If your current branch is not main in your enviroment, checkout to main by running

```sh
git checkout main
```

3. Synchronize your main branch with the upstream main branch (the main branch of typest repo) by running

```sh
git pull upstream main
```

Note that all git and github commands that mentioned before you can run them from Vscode Source Control UI (user interface) if you are not comfortable with the command line interface.

## Before Submitting a Pull Request

Before submitting a **Pull Request**, you should

-   Check your code safety with Linter and TypeScript, and make sure your code can build successfully.
    (Recommended)

```sh
pnpm run build
```

Or

```sh
npm run build
```

## Roud Map, Goals and Priority

The following points are meant to be the essential targets and goals for the future, so you should keep them in mind while developing new feature, fixing bugs, adding or removing from the repo codebase.

-   This project aims to support Arabic and English typing. And Arabic is the base stone of this project.
-   The project should have 3 to 5 mini games by the time version 1.0.0 of the app published.
-   Low bundle and latency are priority.
-   The project would have a desktop version at some point!
-   Technologies related to hosting will be shifting towords building dependent infostructure.

## Code of Conduct

### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a friendly experience for everyone, regardless of any experience
to give everyone an opportunity to contribute in this project.

### Our Responsibilities

The primary responsibility of contributors is to provide high-quality code contributions to the project. This involves writing, reviewing, and submitting code changes that improve the project's functionality, fix bugs, or implement new features.

Contributors should actively participate in project discussions and communicate effectively with other contributors, maintainers, and users.

Contributors can play a role in the long-term maintenance of the project by actively monitoring the project's issue tracker, addressing bug reports and feature requests, and collaborating with other contributors to ensure the project remains healthy and sustainable.

### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

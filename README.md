# MERN MyFlix

I've used this project as a dual-pronged refresher and learning project for the popular MERN technology stack.

Netflix is my feature set inspiration as it covers a broad range of common requirements found in web applications:

* Responsive, reactive UI
* Content navigation, filtering, searching
* User authentication and authorisation
* Account management
* Admin CRUD
* Data storage
* Caching
* Media handling (upload, streaming, thumbnailing) and CDN usage

# Other READMEs

* [API](api/README.md)
* [UI](ui/README.md)
* [Data](data/README.md)

# Architecture

The project employs API-driven frontend architecture.

* Frontend: React single page app (SPA); for users of MyFlix, including an "admin" context that will enable CRUD
* API: Node/Express; provisioning features via API for the frontend

Since the project is in the first instance to refresh/learn some MERN, I have avoided microservice architecture, though a fork of this project to break the monolithic API into services may be a nice follow-on project.

# Approach

I'll start out with a Miro board and get a sense of what the user journey and features that I want to support will be and also the data that underpins the service. I'll use a couple of methods for pulling these together; story mapping and data modelling.

## Story mapping

The story map is a nice way to think of the system from the user journey perspective in varying degrees of abstraction. It is then possible to take a horizontal slice through this map to create releases.

## Data modelling

I like to think about the data model early on, and will create a rough entity relationship diagram (ERD) for what I think will underpin all features.

## Iterations

I'll then get into a rhythm of implementing deliverable iterations following the story map release slices.

# Story Map

I created a Miro board and pulled in some screen captures of the Netflix films area which will form the basis of my  feature set.

## V1

There's a handy built-in story map template to get going

![Story Map V1](user-story-map-v1%403x.png)

# Data Model

## V1

![Data Model V1](data-model-v1@3x.jpg)

# Iterations

I've used a private Github project board to track my progress:

![Board](project-board.png)

I realised after having implemented the movies list functionality that the board supports pairing cards to Github project issues which I felt would be better aligned to professional development, where an issue can be described and labeled, given a milestone, and made into a pull request for review if needed. Whilst the project is only personal, it's good to practice these organisational practices, too.

![Board](project-issue.png)
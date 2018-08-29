# Node Forest

## Project Introduction
This project are build upon Vue.js and its relevant 
plugins including Vuex, Vue-router, Vue-resource, 
@vue/cli, and Muse-UI. 

Server side are built using express, body-parser, and CORS. 

To ensure the performance under High concurrency 
(if occur in future), we use MySQL instead of MongoDB. 
In our personal respective, relationship database 
makes more sense when it comes to object oriented programming. 

We assume the terminal that will run this project have NodeJS and npm properly configured.
Before running the application you have to have the mysql database setup. 
You should refer to /db/DBConfig.js file to set up your database as required. 
We will show you exactly how to configure this project so that you 
can run locally. 
## Project setup
### Install all dependencies
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

##Project key programming principles

1. Files occur more than one time which contribute to the same functionality should
be placed under the same directory.
2. Directory name should indicate their purpose clearly within 1-3 words.
3. Common shorthand are allowed for naming directories and variables.
4. Naming directory should follow underline nomenclature.
5. Vue plugins should have their own files apart from the main.js to adapt 
modular programming principles.
6. Vue plugins should be injected into the vue instance so that other module can use 
it via syntax:"this.$plugin" in scripts and syntax:"plugin" in templates. 
7. Individual views reflecting a single page should go under:"/src/views"
8. Components that form the view should go under:"/src/components"
9. All data models defined in the database tables should be defined
under:"/src/model" directory as templates for usage. 
10. Data that shared more than two components must be managed
using Vuex. 
11. Data passed as single data stream between two components should use
components' props. 
12. Database configuration should go under:"/db" directory.
13. SQL query mappers should go under:"/db" directories.
14. Server APIs should go under:"/server" directories. 
15. APIs regarding different entities should be separated as individual files. 
16. Script naming conventions should follow hump ​​nomenclature.
17. For templates that refer to script variables, use underline nomenclature instead. 
18. We should always maximise the use of arrow functions to increase simplicity (in places like functions 
defined within methods object for Vue components, use no arrow function to prevent vue from using the 
fields defined from its ancestor).
19. Add semicolon wherever it's needed. 
20. Complicate control flows and API calls should be fairly commented.
21. When importing from vue, use "import" keyword. When importing from express, use "require" keyword.
22. Middle-ware for express should be defined within the index file because server side coding is relatively simple.
23. Database file should be synchronized using other tools.
24. No Eslint configuration should be enabled.
25. Comment for commit should explain all the work a contributor done during development, not only the most important part.
26. A class should have one and only one reason to change, meaning that one class should only have one job.
27. We should be able to add new features or components to the existing application without breaking the existing code.
28. In other words, as simple as that, a subclass should override the parent class methods in a way that does not break
functionality from a client’s point of view.
29. A client should never be forced to implement an interface that it doesn’t use or
clients shouldn’t be forced to depend on methods they do not use.
30. Entities must depend on abstractions not on concretions. It states that the high level module must not depend on the
 low level module, but they should depend on abstractions.

 
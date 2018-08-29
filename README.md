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

1. Files occur more than one contribute to the same functionality should 
placed under the same directory. 
2. Directory name should indicate their purpose clearly within 1-3 words. 
3. Common shorthand are allowed for naming directories.
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
17. For templates that refers to the script variables, use underline nomenclature instead. 
18. We should always maximise the use of arrow functions to increase simplicity (in places like functions 
defined within methods object for vue components, use no arrow function to prevent vue from using the 
fields defined from its ancestor.).
19. Add semicolon wherever it's needed. 
20. Complicate control flows and API calls should be fairly commented. 
 
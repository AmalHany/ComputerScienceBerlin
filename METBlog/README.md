# MEAN-stack-MVC-sample-application


A template for MEAN stack application, implemented in the MVC architecture


+ All application components(called app modules), reside in AppModules directory,
  each module implemented in an MVC pattern.

+ node_modules && public/bower_components are libraries javascript, css etc... to make programer's life easier.

+ model_index.js contains reference to all models in the application to glue them easily to the main app.

+ routes.js contains routing directions and reference to all controllers in the application to glue them later to the main app.

+ app.js main application code, initialize database connection, server code, manage assets and connects all app modules together.

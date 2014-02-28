NodeExpressMongoStarter
=======================

Simple CRUD application using NodeJS, ExpressJS, Mongoose, and MongoDB.

Templating engine = Jade.

After getting the code and putting it in a project folder ...  

1. INSTALL NODE.JS - http://nodejs.org/
2. INSTALL EXPRESS - cmd 'npm install -g express'.
3. INSTALL DEPENDENCIES - cmd to where this project lives and run ... 'npm install'.

Get MongoDB and start it up.

1. INSTALL MONGODB - http://mongodb.org/ and place downloaded files at c:\mongo

2. RUN MONGOD AND MONGO

    a. In your project, create a subdirectory named "data" at the root.
    
    b. Cmd to C:\mongodb and run 'mongod --dbpath c:\[your project dir]\data'. Mongo Server is now running.
    
    c. Open a second command prompt. Navigate again to your Mongo installation directory (c:\mongo), and run 'mongo'. You have now connected to it.

Should be good to go. Launch the app by opening a third command prompt and run 'grunt'. Nodemon, via grunt, should start your webserver and run the App.js file. 

Check out http://localhost:3000/ and see if anything shows up.



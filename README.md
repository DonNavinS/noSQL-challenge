# noSQL-challenge

Part 1: https://drive.google.com/file/d/1OR7uV8P1I7CH0XuBZxcgy8NWaJWhNeQH/view
Part 2: https://drive.google.com/file/d/1d1v4iPkuadfVwf6fc8yEpA9UbHriiuNG/view

This challenge required us to create a social networking application using MongoDB to create databases that would store information about users and their thoughts, as 
well as mongoose ODM to execute the MongoDB functions. Express was also used to create the various routes that would be used to post and retrieve information, and 
Insomnia core was used to execute the CRUD operations since there was no front-end. 

To use this application, you must first connect to the MongoDB database by running "npm start" in the VS Code terminal, at which point you can use Insomnia Core to 
perform CRUD operations with the "User" and "Thoughts" models, as well as add and remove users from another existing user's friends list, and post reactions to a 
user's thoughts.

One part of the application I could not get working was the ability to delete reactions from a user's thoughts after they had been posted. This route would appear to work
and would not log any errors in the console, but the reaction would remain in the "reactions" property of the posted thought. 

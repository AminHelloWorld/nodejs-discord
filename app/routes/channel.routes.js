const { authJwt } = require("../middleware");

module.exports = app => {
    const channels = require("../controllers/channel.controller.js");
  
    var router = require("express").Router();
  
  /*
   *  CREATE CHANNEL
   *  Creates a channel with specific roles
   *  Input : 
   *    Body :
   *      - [REQUIRED] name
   *      - [REQUIRED] type
   *      - [REQUIRED] [Array] roles (ids)
   *  Output :
   *      - 200 OK -- { "message": "Channel created successfully." }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }
   * 
   *            - 403 Forbidden -- { "message" : "Require Admin Role!" }
   *            - 400 Bad Request -- { "message" : "Roles must be assigned to the channel for it to be created." }
   *            - 400 Bad Request -- { "message" :  "At least one of the roles that were assigned to the channel were not found." }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user has to be an admin
  */
    router.post(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.create
    );
    

  /*
   *  READ CHANNELS (List/Pagination) 
   *  List channels available to the user
   *  Input : 
   *    Query params : 
   *      - [REQUIRED] perPage -- Number of items in a page a.k.a. the number of messages that should be returned by the query
   *      - [REQUIRED] page -- Number of the page returned a.k.a. the range of the messages returned (from page*perPage to page*perPage+1)
   *  Output :
   *      - 200 OK 
   *      - Pagination info : page, perPage, and total number of messages
   *      - List of channel objects
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }
   * 
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user has to be logged in
  */
    router.get(
      "/list",
      [authJwt.verifyToken],
      channels.list
    );
    

  /*
   *  UPDATE CHANNEL
   *  Updates a channel
   *  Input : 
   *    Query params : 
   *      - [REQUIRED] channelId  
   *    Body :
   *      - [REQUIRED] name
   *  Output :
   *      - 200 OK -- { "message": "Channel updated successfully." }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }
   *          
   *            - 403 Forbidden -- { "message" : "Require Admin Role!" }
   *            - 400 Bad Request -- { "message" : "Channel not found." }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user has to be an admin
  */
    router.put(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin],
      channels.update
    );
    

  /*
   *  DELETE CHANNEL
   *  Deletes a channel
   *  Input : 
   *    Query params : 
   *      - [REQUIRED] channelId  
   *  Output :
   *      - 200 OK -- { "message": "Channel deleted successfully." }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }
   * 
   *            - 403 Forbidden -- { "message" : "Require Admin Role!" }
   *            - 400 Bad Request -- { "message" : "Channel not found." }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user has to be an admin
  */
    router.delete(
      "/",
      [authJwt.verifyToken, authJwt.isAdmin], 
      channels.delete
    );
   
    
    app.use('/api/discord/channel', router);
  };
  
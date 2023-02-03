const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  

  /*
   *  CREATE MESSAGE (Send Message)
   *  Creates a message associated with an existing channel
   *  Input : 
   *    Query params : 
   *      - [REQUIRED] channelId 
   *    Body :
   *      - [REQUIRED] text
   *  Output :
   *      - 200 OK -- { "message" : "Message sent successfully!" }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }
   * 
   *            - 400 Bad Request -- { "message" : "Channel doesn't exist" }
   *            - 403 Forbidden -- { "message" : "You don't have the required role to do this !" }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user's roles have to grant them access to the channel
  */
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    messages.send
  );

  /*
   *  READ MESSAGES (List/Pagination) 
   *  List messages on a channel in reverse chronological order
   *  Input :
   *    Query params : 
   *      - [REQUIRED] channelId 
   *      - [REQUIRED] perPage -- Number of items in a page a.k.a. the number of messages that should be returned by the query
   *      - [REQUIRED] page -- Number of the page returned a.k.a. the range of the messages returned (from page*perPage to page*perPage+1)
   *  Output :
   *      - 200 OK 
   *      - Pagination info : page, perPage, and total number of messages
   *      - List of message objects
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }

   *            - 400 Bad Request -- { "message" : "Channel doesn't exist" }
   *            - 403 Forbidden -- { "message" : "You don't have the required role to do this !" }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - The user's roles have to grant them access to the channel
   */
  router.get(
    "/list", 
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    messages.list
  );


  /* 
   *  UPDATE MESSAGE
   *  Updates the text of a message
   *  Input :
   *    Query params : 
   *      - [REQUIRED] messageId 
   *    Body :
   *      - [REQUIRED] text
   *  Output :
   *      - 200 OK -- { "message" : "Message updated successfully!" }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }

   *            - 400 Bad Request -- { "message" : "Message doesn't exist." }
   *            - 403 Forbidden -- { "message" : "You are not allowed to perform this action because you're not the sender of this message." }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - User sending the query has to be the one who sent the message
   */
  router.put(
    "/",
    [authJwt.verifyToken, authJwt.verifyMessageUser],
    messages.update
  );
  
  /*  
   *  DELETE MESSAGE
   *  Deletes a message
   *  Input :
   *    Query params : 
   *      - [REQUIRED] messageId 
   *  Output :
   *      - 200 OK -- { "message" : "Message deleted successfully!" }
   *      Errors : 
   *            - 401 Unauthorized -- { "message" : "Unauthorized!" }
   *            - 403 Forbidden -- { "message" : "No token provided!" }

   *            - 400 Bad Request -- { "message" : "Message doesn't exist." }
   *            - 403 Forbidden -- { "message" : "You are not allowed to perform this action because you're not the sender of this message nor an admin." }
   *            - 500 Internal Server Error
   *  Auth : 
   *    - User sending the query has to be the one who sent the message
   */
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.verifyMessageUserOrAdmin], 
    messages.delete
  );

  

    app.use('/api/discord/message', router);
  };
  
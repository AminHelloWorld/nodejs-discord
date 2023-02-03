const authJwt = require("../middleware/authJwt.js");

module.exports = app => {
    const messages = require("../controllers/message.controller.js");
  
    var router = require("express").Router();
  

  // CREATE MESSAGE (send message)
  router.post(
    "/",
    [authJwt.verifyToken, authJwt.verifyChannelRole],
    messages.send
  );

  /*
   *  READ MESSAGES (list) 
   *  List messages on a channel in reverse chronological order
   *  Input :
   *    Query params : 
   *      - [REQUIRED] channelId 
   *      - [REQUIRED] perPage -- Number of items in a page a.k.a. the number of messages that should be returned by the query
   *      - [REQUIRED] page -- Number of the page returned a.k.a. the range of the messages returned (from page*perPage to page*perPage+1)
   *  Output :
   *      - Pagination info : page, perPage, and total number of messages
   *      - List of message objects
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
   *    OK or not
   *  Auth : 
   *    - User sending the query has to be the one who sent the message
   * 
   *  TODO AUTH MAYBE CHECK IF USER STILL HAS ACCES TO THE CHANNEL THE MESSAGE WAS SENT TO
   */
  router.put(
    "/",
    [authJwt.verifyToken, authJwt.verifyMessageUser],
    messages.update
  );
  
  /*  
   *  DELETE MESSAGE
   *  TODO AUTH
   */
  router.delete(
    "/",
    [authJwt.verifyToken, authJwt.verifyMessageUserOrAdmin], 
    messages.delete
  );

  

    app.use('/api/discord/message', router);
  };
  
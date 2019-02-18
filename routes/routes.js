var Controllers = require("../controllers/controllers.js");

var appRouter = function (app) {

  // root
  app.get("/", Controllers.Index);
  
  // login GET
  app.get("/login", Controllers.loginGet);
  
  //login POST
  app.post("/v1/auth/token", Controllers.authToken);
 
  //login POST
  app.post("/lockdown", Controllers.lockdown);
  
  app.get("/v1/logout", Controllers.logout);
  
  // the sub of the environment to check.
  app.get("/viro/:viro/:page", Controllers.getViro);

}

module.exports = appRouter;

import * as dao from "./dao.js";
let currentUserLocal = null;
export default function UserRoutes(app) {
  const createUser = async (req, res) => {
    console.log("DID WE HIT CREATE ON THE SERVER")
    const user = await dao.createUser(req.body);
    res.json(user);
  };

  const deleteUser = async (req, res) => {
    const status = await dao.deleteUser(req.params.username);
    res.json(status);

   };
  const findAllUsers = async (req, res) => {
    console.log("Server attempting get all users")
    const users = await dao.findAllUsers();
    res.json(users);
  };

  const findUserById = async (req, res) => { };
  const updateUser = async (req, res) => {
    const { username } = req.params;
    const status = await dao.updateUser(username, req.body);
    currentUserLocal = await dao.findUserByUsername(username);
    res.json(status);
  };

  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json(
        { message: "Username already taken" });
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      currentUserLocal = currentUser;
      res.json(currentUser);
    } else {
      res.sendStatus(401);
    }
  };


  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };


  const profile = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUserLocal) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUserLocal);
  };



  
  app.get("/api/users", findAllUsers);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:username", updateUser);
  app.delete("/api/users/:username", deleteUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.post("/api/users/profile", profile);
  app.post("/api/users", createUser);
}

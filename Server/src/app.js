const express = require("express");
const knex = require("knex")(require("../knexfile").development);
const app = express();
const cors = require('cors');
const port = 8081;
//test
app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Application up and running!");
});




//---------------------------------------------Login Page-------------------------------------------


app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex("user_account").where({ UserName: username, Password: password }).first();
    if (user) {
      res.json(user);
    } else {
      res.status(401).send('Invalid username or password');
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//// 01_USERS TABLE CRUD ////-----------------------------------------------------------------------------------------------------
//Id, FirstName, LastName, UserName, Password

// Create a User: POST /users
app.post("/users", async (req, res) => {
  //Logic to add a user
  const {
    FirstName,
    LastName,
    UserName,
    Password,
  } = req.body;

  if ((!FirstName || !LastName || !UserName || !Password)) {
    return res.status(400).send("Missing or incorrect UserName!");
  }
  //ACTION add additional data validation

  try {
    const [newUser] = await knex("user_account")
      .insert({
        FirstName,
        LastName,
        UserName,
        Password,
      })
      .returning("*");

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Users: GET /users
app.get("/users", async (req, res) => {
  // Logic to get all users
  try {
    const users = await knex("user_account").select("*");
    res.json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a Single User: GET /users/:id
app.get("/users/:Id", async (req, res) => {
  // Logic to get a single user
  try {
    const user = await knex("user_account").where("Id", req.params.Id).first();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a user: PUT /users/:id
app.put("/users/:Id", async (req, res) => {
  // Logic to update a user
  const {
    FirstName,
    LastName,
    UserName,
    Password,
  } = req.body;

  try {
    const updatedUser = await knex("user_account")
      .where("Id", req.params.Id)
      .update({
        FirstName,
        LastName,
        UserName,
        Password,
      })
      .returning("*");

    if (!updatedUser.length) {
      return res.status(404).send("User not found");
    }

    res.json(updatedUser[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a user: DELETE /users/:id
app.delete("/users/:Id", async (req, res) => {
  // Logic to delete a user
  try {
    const deleted = await knex("user_account").where("Id", req.params.Id).del();
    if (!deleted) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//// items TABLE CRUD ////-------------------------------------------------------------------------------------------------------------------
//id, UserID, ItemName, Description, Quantity

// table.increments('id').primary();
// table.integer('UserID');
// table.string('ItemName');
// table.string('Description');
// table.integer('Quantity');

// Create a item: POST /items
app.post("/items", async (req, res) => {
  //Logic to add a user
  const { UserID, ItemName, Description, Quantity} = req.body;

  if (!ItemName || !Description) {
    return res.status(400).send("Missing Item Name or Description");
  }
  if (!UserID) {
    return res
      .status(400)
      .send("Missing the Inventory Owner ID of that Item. Enter as user Id of the corresponding store owner");
  }
  if (!Quantity) {
    return res
      .status(400)
      .send("Missing Quantity. Enter a number for the amount of that particular item you will have stocked.");
  }

  try {
    const [newItem] = await knex("items")
      .insert({
        UserID,
        ItemName,
        Description,
        Quantity,
      })
      .returning("*");

    res.status(201).send(newItem);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All items: GET /items
app.get("/items", async (req, res) => {
  // Logic to get all items
  const userId = req.query.userId; // get the userId from the query parameter
  try {
    let items;
    if (userId) { //if there is a userID present in the url
      items = await knex("items").where("UserID", userId).select("*"); //get all the items for that corresponding userid
    } else {
      items = await knex("items").select("*");//if empty in case of visitor, return everything.
    }
    res.json(items);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a Single item: GET /items/:id
app.get("/items/:id", async (req, res) => {
  // Logic to get a single item
  try {
    const item = await knex("items")
      .where("id", req.params.id)
      .first();
    if (!item) {
      return res.status(404).send("Item not found");
    }
    res.json(item);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a item: PUT /items/:id
app.put("/items/:id", async (req, res) => {
  // Logic to update a item
  const { UserID, ItemName, Description, Quantity } = req.body;

  try {
    const updatedItem = await knex("items")
      .where("id", req.params.id)
      .update({
        UserID,
        ItemName,
        Description,
        Quantity,
      })
      .returning("*");

    if (!updatedItem.length) {
      return res.status(404).send("Item not found");
    }

    res.json(updatedItem[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//NEED TO KNEXIFY
// Delete a item: DELETE /items/:id
app.delete("/items/:id", async (req, res) => {
  // Logic to delete a items
  try {
    const deleted = await knex("items")
      .where("id", req.params.id)
      .del();
    if (!deleted) {
      return res.status(404).send("Item not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

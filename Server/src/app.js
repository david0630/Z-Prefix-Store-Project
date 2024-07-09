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

//// USERS TABLE CRUD ////-----------------------------------------------------------------------------------------------------
//id, isNewMember, isAppAdmin, isTaskAdmin, isLeadership, Member Name, Member Email, isInProcessed

// Create a User: POST /users
app.post("/users", async (req, res) => {
  //Logic to add a user
  const {
    isNewMember,
    isAppAdmin,
    isTaskAdmin,
    isLeadership,
    MemberName,
    MemberEmail,
    isInProcessed,
  } = req.body;

  if (!MemberName || !MemberEmail) {
    return res.status(400).send("Missing User Name or Email");
  }
  //ACTION add additional data validation

  try {
    const [newUser] = await knex("user_account")
      .insert({
        isNewMember,
        isAppAdmin,
        isTaskAdmin,
        isLeadership,
        MemberName,
        MemberEmail,
        isInProcessed,
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
app.get("/users/:id", async (req, res) => {
  // Logic to get a single user
  try {
    const user = await knex("user_account").where("id", req.params.id).first();
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a Book: PUT /users/:id
app.put("/users/:id", async (req, res) => {
  // Logic to update a user
  const {
    isNewMember,
    isAppAdmin,
    isTaskAdmin,
    isLeadership,
    MemberName,
    MemberEmail,
    isInProcessed,
  } = req.body;

  try {
    const updatedUser = await knex("user_account")
      .where("id", req.params.id)
      .update({
        isNewMember,
        isAppAdmin,
        isTaskAdmin,
        isLeadership,
        MemberName,
        MemberEmail,
        isInProcessed,
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

// Delete a Book: DELETE /users/:id
app.delete("/users/:id", async (req, res) => {
  // Logic to delete a user
  try {
    const deleted = await knex("user_account").where("id", req.params.id).del();
    if (!deleted) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//// TASKS TABLE CRUD ////-------------------------------------------------------------------------------------------------------------------
//id, Task Name, Task Details, Task Admin

// Create a Task: POST /tasks
app.post("/tasks", async (req, res) => {
  //Logic to add a user
  const { taskName, taskDetail, taskAdmin, taskPriority } = req.body;

  if (!taskName || !taskDetail) {
    return res.status(400).send("Missing Task Name or Details");
  }
  if (!taskAdmin) {
    return res
      .status(400)
      .send("Missing Task Administator. Enter as user id of Task Admin");
  }
  if (!taskPriority) {
    return res
      .status(400)
      .send("Missing Task Priority. Enter as number of days after arrival.");
  }

  try {
    const [newTask] = await knex("in_processing_task")
      .insert({
        taskName,
        taskDetail,
        idTaskAdmin,
        taskPriority,
      })
      .returning("*");

    res.status(201).send(newTask);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Tasks: GET /tasks
app.get("/tasks", async (req, res) => {
  // Logic to get all tasks
  try {
    const tasks = await knex("in_processing_task").select("*");
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a Single Task: GET /tasks/:id
app.get("/tasks/:id", async (req, res) => {
  // Logic to get a single task
  try {
    const task = await knex("in_processing_task")
      .where("id", req.params.id)
      .first();
    if (!task) {
      return res.status(404).send("User not found");
    }
    res.json(task);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Update a Task: PUT /tasks/:id
app.put("/tasks/:id", async (req, res) => {
  // Logic to update a task
  const { taskName, taskDetail, taskAdmin, taskPriority } = req.body;

  try {
    const updatedTask = await knex("in_processing_task")
      .where("id", req.params.id)
      .update({
        taskName,
        taskDetail,
        taskAdmin,
        taskPriority,
      })
      .returning("*");

    if (!updatedTask.length) {
      return res.status(404).send("Task not found");
    }

    res.json(updatedTask[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//NEED TO KNEXIFY
// Delete a Task: DELETE /tasks/:id
app.delete("/task/:id", async (req, res) => {
  // Logic to delete a task
  try {
    const deleted = await knex("in_processing_task")
      .where("id", req.params.id)
      .del();
    if (!deleted) {
      return res.status(404).send("Task not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

///// Joined task assignment table //// ------------------------------------------------------------------------------
//id, idMember, idTask, isComplete

// NEW needs testing
app.post("/assignments", async (req, res) => {
  // Logic to create new assignment
  const { idUser, idTask } = req.body;
  const isComplete = false; //new assignment not complete by defualt

  if (!idUser || !idTask) {
    return res
      .status(400)
      .send("User ID and Task ID are required to make an assignment");
  }

  // how to post to table NOT CONFIDENT in this one =>
  try {
    const [newAssignment] = await knex("member_task_assignment")
      .insert({
        idUser,
        idTask,
        isComplete,
      })
      .returning("*");

    res.status(201).send(newAssignment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Put isComplete Assignment Flag: Put /assignments/:id
app.put("/assignments/:id", async (req, res) => {
  //Logic to update the isComplete flag

  const { isComplete } = req.body; // only takkes in Boolean to set flag as true vs false

  try {
    const updatedAssignment = await knex("member_task_assignment")
      .where("id", req.params.id)
      .update({
        isComplete,
      })
      .returning("*");

    if (!updatedAssignment.length) {
      return res.status(404).send("Assignment not found");
    }

    res.json(updatedAssignment[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Assignments: GET /assignments
app.get("/assignments", async (req, res) => {
  // Logic to get all assignments
  try {
    const assignments = await knex("member_task_assignment").select("*");
    res.json(assignments);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get a Single assignment: GET /assignments/:id
app.get("/assignments/:id", async (req, res) => {
  // Logic to get a single assignment
  try {
    const assignment = await knex("member_task_assignment")
      .where("id", req.params.id)
      .first();
    if (!assignment) {
      return res.status(404).send("Assignment not found");
    }
    res.json(assignment);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Delete a assignment: DELETE /assignments/:id
app.delete("/assignments/:id", async (req, res) => {
  // Logic to delete a assignment
  try {
    const deleted = await knex("member_task_assignment")
      .where("id", req.params.id)
      .del();
    if (!deleted) {
      return res.status(404).send("Assignment not found");
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

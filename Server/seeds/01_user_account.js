/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_account").del();
  await knex("user_account").insert([
    {
      Id: 1,
      FirstName: "Thor",
      LastName: "Hammerson",
      UserName: "ThorH",
      Password: "thorh",
    },
    {
      Id: 2,
      FirstName: "Jonny",
      LastName: "Appleseed",
      UserName: "JonnyA",
      Password: "jonnya",
    },
    {
      Id: 3,
      FirstName: "Lance",
      LastName: "Ralot",
      UserName: "LanceR",
      Password: "lancer",
    },
    {
      Id: 4,
      FirstName: "Geo",
      LastName: "Dude",
      UserName: "GeoD",
      Password: "geod",
    }
    // Add more entries as needed
  ]);
};

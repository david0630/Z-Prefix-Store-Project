/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_account").del();
  await knex("user_account").insert([
    {
      FirstName: "Thor",
      LastName: "Hammerson",
      UserName: "ThorH",
      Password: "thorh",
    },
    {
      FirstName: "Jonny",
      LastName: "Appleseed",
      UserName: "JonnyA",
      Password: "jonnya",
    },
    {
      FirstName: "Lance",
      LastName: "Ralot",
      UserName: "LanceR",
      Password: "lancer",
    },
    {
      FirstName: "Geo",
      LastName: "Dude",
      UserName: "GeoD",
      Password: "geod",
    }
  ]);
};

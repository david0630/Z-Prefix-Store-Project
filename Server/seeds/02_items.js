/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
      {id: 1, UserID: 1, ItemName: 'Hammer', Description: 'A tool used to drive in a nail into other objects', Quantity: 10},
      {id: 2, UserID: 1, ItemName: 'Nails', Description: 'A sharp peice of iron used to pin into things', Quantity: 10000},
      {id: 3, UserID: 2, ItemName: 'Apples', Description: 'Sweet Red Fruit', Quantity: 100},
      {id: 4, UserID: 2, ItemName: 'Clemintines', Description: 'Sweet and sour orange fruit', Quantity: 200},
      {id: 5, UserID: 3, ItemName: 'Horse', Description: 'A large four legged animal that has been trained and is ready to ride and follow its master', TaskAdmin: 5},
      {id: 6, UserID: 3, ItemName: 'Lance', Description: 'Sharp long pointy stick', Quantity: 5},
      {id: 7, UserID: 4, ItemName: 'gravel', Description: 'a loose aggregation of small water-worn or pounded stones', Quantity: 5},
      {id: 8, UserID: 4, ItemName: 'sand', Description: 'Basically gravel but way smaller', Quantity: 99999}
      // Add more entries as needed
    ]);
};

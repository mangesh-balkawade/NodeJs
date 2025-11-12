const sequelize = require("./sequelize");
const { DataTypes } = require("sequelize");

const Author = sequelize.define(
    "Author",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        booksIds: {
            type: DataTypes.STRING,
        },
    }
);

const Book = sequelize.define(
    "Book",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
    }
);

// Sync the models with the database
//sequelize.sync();

sequelize.query(`
  SELECT * FROM Authors
  LEFT JOIN Books ON FIND_IN_SET(Books.id, Authors.booksIds) > 0
  WHERE Authors.id = 1;
`, { model: Author })
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err);
    });

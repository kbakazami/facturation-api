const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pool = require('./db');
const config = require('./config');
const app =express();

// Déclaration des middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));

// Route Personal_information //
let InfoPersoRouter = express.Router();

InfoPersoRouter.route("/all").get(async (req, res) => {
  try {
    const allInfoPerso = await pool.query(
      "SELECT * FROM personals_informations"
    );

    res.json(allInfoPerso.rows);
  } catch (err) {
    console.log(err.message);
  }
});

InfoPersoRouter.route("/:id")
  // Récupération d'une entrée personals_informations en fonction de son id
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const oneInfoPerso = await pool.query(
        "SELECT * FROM personals_informations WHERE infoperso_id = $1",
        [id]
      );

      res.json(oneInfoPerso.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  })

  //Modifie les paramètres de personals_informations en fonction de son id
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const {
        name,
        supplement_name,
        address,
        postcode,
        city,
        phone_number,
        siret,
        is_tva,
      } = req.body;

      const modifInfoPerso = await pool.query(
        "UPDATE personals_informations SET name = COALESCE($1, name), supplement_name = COALESCE($2, supplement_name), address = COALESCE($3, address), postcode = COALESCE($4, postcode), city = COALESCE($5, city), phone_number = COALESCE($6, phone_number), siret = COALESCE($7, siret), is_tva = COALESCE($8, is_tva) WHERE infoperso_id = $9",
        [
          name,
          supplement_name,
          address,
          postcode,
          city,
          phone_number,
          siret,
          is_tva,
          id,
        ]
      );

      res.status(201).json("Info perso update !");
    } catch (err) {
      console.log(err.message);
    }
  })

  // Suppression d'une entrée personals_information
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const deleteInfoPerso = await pool.query(
        "DELETE FROM personals_informations WHERE infoperso_id = $1",
        [id]
      );

      res.json("Delete effectued !");
    } catch (err) {
      console.log(err.message);
    }
  });

// Crée une nouvelle entrée personals_informations
InfoPersoRouter.route("/add").post(async (req, res) => {
  try {
    const {
      name,
      supplement_name,
      address,
      postcode,
      city,
      phone_number,
      siret,
      is_tva,
    } = req.body;

    const newInfoPerso = await pool.query(
      "INSERT INTO personals_informations (name, supplement_name, address, postcode,city, phone_number, siret, is_tva) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        name,
        supplement_name,
        address,
        postcode,
        city,
        phone_number,
        siret,
        is_tva,
      ]
    );

    res.status(201).json(newInfoPerso.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fin Route Personals_informations //

// Déclaration des middleware route
app.use(config.rootAPI + "infoperso", InfoPersoRouter);

app.listen(config.port, () => console.log("started on port " + config.port));

module.exports = app;


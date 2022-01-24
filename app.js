const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pool = require('./db');
const config = require('./config');
const app = express();
var cors = require('cors');
app.use(cors());

// definition information API
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation facturation API',
    version: '1.0.0',
    description:
      "Ceci est la documentation du back-end de l'application de facturation",
  },
  servers: [
    {
      url: 'http://localhost:8081',
      description: 'Serveur de développement',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

// Déclaration des middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extends: true }));



// Route Personal_information //
let InfoPersoRouter = express.Router();

/**
 * @swagger
 * /infoperso/all:
 *   get:
 *     summary: Retourne la liste de personals_informations
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *     - "inforperso"
 *     responses:
 *       200:
 *         description: Liste de personals_informations
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       infoperso_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom ou raison sociale
 *                         example: La Belle époque
 *                       supplement_name:
 *                         type: string
 *                         description: Complément raison sociale
 *                         example: S.A.R.L au capital de ...
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 15 côte du Ruis
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 92400
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Courbevoie
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       tva_number:
 *                         type: string
 *                         description: Numéro de TVA intracommunautaire
 *                         example: FR895645875
 *                       is_tva:
 *                         type: boolean
 *                         description: Exonération à la TVA
 *                         example: true
*/  

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
  
/**
 * @swagger
 * /infoperso/{id}:
 *   get:
 *     summary: Retourne un utilisateur de personals_informations.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "inforperso"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      infoperso_id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 0
 *                      name:
*                         type: string
*                         description: Nom ou raison sociale
*                         example: La Belle époque
*                      supplement_name:
*                         type: string
*                         description: Complément raison sociale
*                         example: S.A.R.L au capital de ...
*                      address:
*                         type: string
*                         description: Adresse du siège
*                         example: 15 côte du Ruis
*                      postcode:
*                         type: string
*                         description: Code postal
*                         example: 92400
*                      city:
*                         type: string
*                         description: Ville
*                         example: Courbevoie
*                      phone_number:
*                         type: integer
*                         description: Téléphone
*                         example: 06 27 71 00 00
*                      siret:
*                         type: string
*                         description: Numéro de siret
*                         example: 519 787 999 00011
*                      tva_number:
*                         type: string
*                         description: Numéro de TVA intracommunautaire
*                         example: FR895645875
*                      is_tva:
*                         type: boolean
*                         description: Exonération à la TVA
*                         example: true
*/  

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

  /**
 * @swagger
 * /infoperso/{id}:
 *   put:
 *     summary: Modifie les paramètres de personals_informations en fonction de son id
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "inforperso"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modifie les paramètres de personals_informations en fonction de son id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      infoperso_id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 0
 *                      name:
*                         type: string
*                         description: Nom ou raison sociale
*                         example: La Belle époque
*                      supplement_name:
*                         type: string
*                         description: Complément raison sociale
*                         example: S.A.R.L au capital de ...
*                      address:
*                         type: string
*                         description: Adresse du siège
*                         example: 15 côte du Ruis
*                      postcode:
*                         type: string
*                         description: Code postal
*                         example: 92400
*                      city:
*                         type: string
*                         description: Ville
*                         example: Courbevoie
*                      phone_number:
*                         type: integer
*                         description: Téléphone
*                         example: 06 27 71 00 00
*                      siret:
*                         type: string
*                         description: Numéro de siret
*                         example: 519 787 999 00011
*                      tva_number:
*                         type: string
*                         description: Numéro de TVA intracommunautaire
*                         example: FR895645875
*                      is_tva:
*                         type: boolean
*                         description: Exonération à la TVA
*                         example: true
*/  

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
        tva_number,
        is_tva,
      } = req.body;

      const modifInfoPerso = await pool.query(
        "UPDATE personals_informations SET name = COALESCE($1, name), supplement_name = COALESCE($2, supplement_name), address = COALESCE($3, address), postcode = COALESCE($4, postcode), city = COALESCE($5, city), phone_number = COALESCE($6, phone_number), siret = COALESCE($7, siret), tva_number = COALESCE($8, tva_number), is_tva = COALESCE($9, is_tva) WHERE infoperso_id = $10",
        [
          name,
          supplement_name,
          address,
          postcode,
          city,
          phone_number,
          siret,
          tva_number,
          is_tva,
          id,
        ]
      );

      res.status(201).json("Info perso update !");
    } catch (err) {
      console.log(err.message);
    }
  })

  /**
 * @swagger
 * /infoperso/{id}:
 *   delete:
 *     summary: Suppression d'une entrée personals_information.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "inforperso"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id d'un utilisateur
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprime un utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      infoperso_id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 0
 *                      name:
*                         type: string
*                         description: Nom ou raison sociale
*                         example: La Belle époque
*                      supplement_name:
*                         type: string
*                         description: Complément raison sociale
*                         example: S.A.R.L au capital de ...
*                      address:
*                         type: string
*                         description: Adresse du siège
*                         example: 15 côte du Ruis
*                      postcode:
*                         type: string
*                         description: Code postal
*                         example: 92400
*                      city:
*                         type: string
*                         description: Ville
*                         example: Courbevoie
*                      phone_number:
*                         type: integer
*                         description: Téléphone
*                         example: 06 27 71 00 00
*                      siret:
*                         type: string
*                         description: Numéro de siret
*                         example: 519 787 999 00011
*                      tva_number:
*                         type: string
*                         description: Numéro de TVA intracommunautaire
*                         example: FR895645875
*                      is_tva:
*                         type: boolean
*                         description: Exonération à la TVA
*                         example: true
*/  

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

  /**
 * @swagger
 * /infoperso/add:
 *   post:
 *     summary: Crée une nouvelle entrée personals_informations.
 *     tags:
 *     - "inforperso"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
*                      name:
*                         type: string
*                         description: Nom ou raison sociale
*                         example: La Belle époque
*                      supplement_name:
*                         type: string
*                         description: Complément raison sociale
*                         example: S.A.R.L au capital de ...
*                      address:
*                         type: string
*                         description: Adresse du siège
*                         example: 15 côte du Ruis
*                      postcode:
*                         type: string
*                         description: Code postal
*                         example: 92400
*                      city:
*                         type: string
*                         description: Ville
*                         example: Courbevoie
*                      phone_number:
*                         type: integer
*                         description: Téléphone
*                         example: 06 27 71 00 00
*                      siret:
*                         type: string
*                         description: Numéro de siret
*                         example: 519 787 999 00011
*                      tva_number:
*                         type: string
*                         description: Numéro de TVA intracommunautaire
*                         example: FR895645875
*                      is_tva:
*                         type: boolean
*                         description: Exonération à la TVA
*                         example: true
 *     responses:
 *       201:
 *         description: Crée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                      infoperso_id:
 *                        type: integer
 *                        description: The user ID.
 *                        example: 0
 *                      name:
*                         type: string
*                         description: Nom ou raison sociale
*                         example: La Belle époque
*                      supplement_name:
*                         type: string
*                         description: Complément raison sociale
*                         example: S.A.R.L au capital de ...
*                      address:
*                         type: string
*                         description: Adresse du siège
*                         example: 15 côte du Ruis
*                      postcode:
*                         type: string
*                         description: Code postal
*                         example: 92400
*                      city:
*                         type: string
*                         description: Ville
*                         example: Courbevoie
*                      phone_number:
*                         type: integer
*                         description: Téléphone
*                         example: 06 27 71 00 00
*                      siret:
*                         type: string
*                         description: Numéro de siret
*                         example: 519 787 999 00011
*                      tva_number:
*                         type: string
*                         description: Numéro de TVA intracommunautaire
*                         example: FR895645875
*                      is_tva:
*                         type: boolean
*                         description: Exonération à la TVA
*                         example: true
*/ 

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
      tva_number,
      is_tva,
    } = req.body;

    const newInfoPerso = await pool.query(
      "INSERT INTO personals_informations (name, supplement_name, address, postcode,city, phone_number, siret, tva_number, is_tva) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        name,
        supplement_name,
        address,
        postcode,
        city,
        phone_number,
        siret,
        tva_number,
        is_tva,
      ]
    );

    res.status(201).json(newInfoPerso.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fin Route Personals_informations //

// Route Customer //

/**
 * @swagger
 * /customer/all:
 *   get:
 *     summary: Retourne la liste de customer
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *     - "customer"
 *     responses:
 *       200:
 *         description: Liste de customer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       customer_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       phone_number_secondary:
 *                         type: string
 *                         description: Numéro de téléphone secondaire
 *                         example: 05 25 36 45 21
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: C'est un bon client
*/  

let CustomerRouter = express.Router();

CustomerRouter.route("/all").get(async (req, res) => {
  try {
    const allCustomer = await pool.query("SELECT * FROM customer");

    res.json(allCustomer.rows);
  } catch (err) {
    console.log(err.message);
  }
});


/**
 * @swagger
 * /customer/{id}:
 *   get:
 *     summary: Retourne un client de customer.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "customer"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du client
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un client.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       customer_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       phone_number_secondary:
 *                         type: string
 *                         description: Numéro de téléphone secondaire
 *                         example: 05 25 36 45 21
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: C'est un bon client
*/  

CustomerRouter.route("/:id")
  // Récupération d'un customer en fonction de son id
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const oneCustomer = await pool.query(
        "SELECT * FROM customer WHERE customer_id = $1",
        [id]
      );

      res.json(oneCustomer.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  })


/**
 * @swagger
 * /customer/{id}:
 *   put:
 *     summary: Modifie les paramètres d'un client en fonction de son id
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "customer"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du client.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modifie les paramètres d'un client en fonction de son id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       customer_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       phone_number_secondary:
 *                         type: string
 *                         description: Numéro de téléphone secondaire
 *                         example: 05 25 36 45 21
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: C'est un bon client
*/  

  //Modifie les paramètres d'un customer en fonction de son id
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const {
        relation_type,
        siret,
        name,
        address,
        postcode,
        city,
        country,
        email,
        prefix_phone,
        phone_number,
        phone_number_secondary,
        remark,
      } = req.body;

      const modifInfoPerso = await pool.query(
        "UPDATE customer SET relation_type = COALESCE($1, relation_type), siret = COALESCE($2, siret), name = COALESCE($3, name), address = COALESCE($4, address), postcode = COALESCE($5, postcode), city = COALESCE($6, city), country = COALESCE($7, country), email = COALESCE($8, email), prefix_phone = COALESCE($9, prefix_phone), phone_number = COALESCE($10, phone_number), phone_number_secondary = COALESCE($11, phone_number_secondary), remark = COALESCE($12, remark) WHERE customer_id = $13",
        [
          relation_type,
          siret,
          name,
          address,
          postcode,
          city,
          country,
          email,
          prefix_phone,
          phone_number,
          phone_number_secondary,
          remark,
          id,
        ]
      );

      res.status(201).json("Info perso update !");
    } catch (err) {
      console.log(err.message);
    }
  })

    /**
 * @swagger
 * /customer/{id}:
 *   delete:
 *     summary: Suppression d'une entrée customer.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "customer"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du client.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprime un client.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       customer_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       phone_number_secondary:
 *                         type: string
 *                         description: Numéro de téléphone secondaire
 *                         example: 05 25 36 45 21
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: C'est un bon client
*/  

  //Suppression d'une entrée personals_information
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const deleteCustomer = await pool.query(
        "DELETE FROM customer WHERE customer_id = $1",
        [id]
      );

      res.json("Delete effectued !");
    } catch (err) {
      console.log(err.message);
    }
  });


    /**
 * @swagger
 * /customer/add:
 *   post:
 *     summary: Crée une nouvelle entrée customer.
 *     tags:
 *     - "customer"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *     responses:
 *       201:
 *         description: Crée un nouveau client
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       customer_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       relation_type:
 *                         type: string
 *                         description: Type de relation
 *                         example: Personnel
 *                       siret:
 *                         type: string
 *                         description: Numéro de siret
 *                         example: 519 787 999 00011
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       address:
 *                         type: string
 *                         description: Adresse du siège
 *                         example: 7 Avenue des croates
 *                       postcode:
 *                         type: string
 *                         description: Code postal
 *                         example: 12000
 *                       city:
 *                         type: string
 *                         description: Ville
 *                         example: Rodez
 *                       country:
 *                         type: string
 *                         description: Pays
 *                         example: FRANCE
 *                       email:
 *                         type: string
 *                         description: E-mail
 *                         example: david.durand@gmail.com
 *                       prefix_phone:
 *                         type: string
 *                         description: Préfixe numéro de téléphone
 *                         example: Rodez
 *                       phone_number:
 *                         type: integer
 *                         description: Téléphone
 *                         example: 06 27 71 00 00
 *                       phone_number_secondary:
 *                         type: string
 *                         description: Numéro de téléphone secondaire
 *                         example: 05 25 36 45 21
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: C'est un bon client
*/
// Crée une nouvelle entrée personals_informations
CustomerRouter.route("/add").post(async (req, res) => {
  try {
    const {
      relation_type,
      siret,
      name,
      address,
      postcode,
      city,
      country,
      email,
      prefix_phone,
      phone_number,
      phone_number_secondary,
      remark,
    } = req.body;

    const newCustomer = await pool.query(
      "INSERT INTO customer (relation_type, siret, name, address, postcode, city, country, email, prefix_phone, phone_number, phone_number_secondary, remark) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        relation_type,
        siret,
        name,
        address,
        postcode,
        city,
        country,
        email,
        prefix_phone,
        phone_number,
        phone_number_secondary,
        remark,
      ]
    );

    res.status(201).json(newCustomer.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fin Route Customer //

// Route Product //
let ProductRouter = express.Router();

/**
 * @swagger
 * /product/all:
 *   get:
 *     summary: Retourne la liste de product
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *     - "product"
 *     responses:
 *       200:
 *         description: Liste de product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: Ceci est un bon produit
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
*/  

ProductRouter.route("/all").get(async (req, res) => {
  try {
    const allProduct = await pool.query(
      "SELECT * FROM product"
    );

    res.json(allProduct.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Retourne un produit de product.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "product"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du produit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Un produit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       product_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: Ceci est un bon produit
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
*/  

ProductRouter.route("/:id")
  // Récupération d'un produit en fonction de son id
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const oneProduct = await pool.query(
        "SELECT * FROM product WHERE product_id = $1",
        [id]
      );

      res.json(oneProduct.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  })

  /**
 * @swagger
 * /product/{id}:
 *   put:
 *     summary: Modifie les paramètres d'un produit en fonction de son id
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "product"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du produit.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modifie les paramètres d'un produit en fonction de son id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       product_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: Ceci est un bon produit
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
*/  

  
  //Modifie les paramètres de product en fonction de son id
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, sale_price_ht, tva_rate, remark, purchase_cost, margin_coefficient } = req.body;

      const modifProduct = await pool.query(
        "UPDATE product SET name = COALESCE($1, name), sale_price_HT = COALESCE($2, sale_price_HT), tva_rate = COALESCE($3, tva_rate), remark = COALESCE($4, remark), purchase_cost = COALESCE($5, purchase_cost), margin_coefficient = COALESCE($6, margin_coefficient) WHERE product_id = $7",
        [name, sale_price_ht, tva_rate, remark, purchase_cost, margin_coefficient, id]
      );

      res.status(201).json("Product update !");
    } catch (err) {
      console.log(err.message);
    }
  })

      /**
 * @swagger
 * /product/{id}:
 *   delete:
 *     summary: Suppression d'une entrée product.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "product"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du produit.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprime un produit.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       product_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: Ceci est un bon produit
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
*/  

  // Suppression d'un product
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const deleteInfoPerso = await pool.query("DELETE FROM product WHERE product_id = $1", [id]);

      res.json("Delete effectued !")
    } catch (err) {
      console.log(err.message)
    }
  })

    /**
 * @swagger
 * /infoperso/add:
 *   post:
 *     summary: Crée une nouvelle entrée personals_informations.
 *     tags:
 *     - "inforperso"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
 *     responses:
 *       201:
 *         description: Crée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       product_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       name:
 *                         type: string
 *                         description: Nom prénom ou raison sociale
 *                         example: David Durand
 *                       sales_price_ht:
 *                         type: float
 *                         description: Prix de vente hors taxe
 *                         example: 2.5
 *                       tva_rate:
 *                         type: float
 *                         description: Taux de tva
 *                         example: 5.5
 *                       remark:
 *                         type: string
 *                         description: Remarque
 *                         example: Ceci est un bon produit
 *                       purchase_cost:
 *                         type: float
 *                         description: Coût d'achat
 *                         example: 4.0
 *                       margin_coefficient:
 *                         type: float
 *                         description: Coefficient de marge
 *                         example: 2.0
*/ 

// Crée un product
ProductRouter.route("/add").post(async (req, res) => {
  try {
    const { name, sale_price_ht, tva_rate, remark, purchase_cost, margin_coefficient } = req.body;

    const newProduct = await pool.query(
      "INSERT INTO product (name, sale_price_HT, tva_rate, remark, purchase_cost, margin_coefficient) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, sale_price_ht, tva_rate, remark, purchase_cost, margin_coefficient]
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fin Router Product //

// Route Facture //
let FactureRouter = express.Router();

/**
 * @swagger
 * /facture/all:
 *   get:
 *     summary: Retourne la liste de facture
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 *     tags:
 *     - "facture"
 *     responses:
 *       200:
 *         description: Liste de facture
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       facture_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
*/  

FactureRouter.route("/all").get(async (req, res) => {
  try {
    const allFacture = await pool.query("SELECT * FROM facture");

    res.json(allFacture.rows);
  } catch (err) {
    console.log(err.message);
  }
});

/**
 * @swagger
 * /facture/{id}:
 *   get:
 *     summary: Retourne une facture.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "facture"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id d'une facture
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Une facture.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       facture_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
*/  

FactureRouter.route("/:id")
  // Récupération d'une facture en fonction de son id
  .get(async (req, res) => {
    try {
      const { id } = req.params;

      const oneFacture = await pool.query(
        "SELECT * FROM Facture WHERE facture_id = $1",
        [id]
      );

      res.json(oneFacture.rows[0]);
    } catch (err) {
      console.log(err.message);
    }
  })

  /**
 * @swagger
 * /facture/{id}:
 *   put:
 *     summary: Modifie les paramètres d'une facture en fonction de son id
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "facture"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id d'une facture.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Modifie les paramètres d'une facture en fonction de son id.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       facture_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
*/  

  //Modifie les paramètres d'une facture en fonction de son id
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const { date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id } = req.body;

      const modifFacture = await pool.query(
        "UPDATE facture SET date_saisie = COALESCE($1, date_saisie), date_deadline = COALESCE($2, date_deadline), payment_method = COALESCE($3, payment_method), rate_discount = COALESCE($4, rate_discount), infoperso_Id = COALESCE($5, infoperso_Id), customer_Id = COALESCE($6, customer_Id) WHERE facture_id = $7",
        [date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id, id]
      );

      res.status(201).json("facture update !");
    } catch (err) {
      console.log(err.message);
    }
  })

      /**
 * @swagger
 * /facture/{id}:
 *   delete:
 *     summary: Suppression d'une entrée facture.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     tags:
 *     - "facture"
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id du facture.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supprime une facture.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       facture_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
*/  

  // Suppression d'une facture
  .delete(async (req, res) => {
    try {
      const { id } = req.params;

      const deleteFacture = await pool.query(
        "DELETE FROM facture WHERE facture_id = $1",
        [id]
      );

      res.json("Delete effectued !");
    } catch (err) {
      console.log(err.message);
    }
  });

    /**
 * @swagger
 * /facture/add:
 *   post:
 *     summary: Crée une nouvelle entrée facture.
 *     tags:
 *     - "facture"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
 *     responses:
 *       201:
 *         description: Crée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                       facture_id:
 *                         type: integer
 *                         description: Identifiant unique
 *                         example: 1
 *                       date_saisie:
 *                         type: date
 *                         description: Date de saisie de la facture
 *                         example: 18/01/2022
 *                       date_deadline:
 *                         type: date
 *                         description: Date de deadline de la facture
 *                         example: 18/02/2022
 *                       payment_method:
 *                         type: string
 *                         description: méthode de paiment
 *                         example: Virement bancaire
 *                       rate_discount:
 *                         type: float
 *                         description: Pourcentage de remise global sur la facture
 *                         example: 2.5
*/ 

// Crée un facture
FactureRouter.route("/add").post(async (req, res) => {
  try {
    const { date_saisie, date_deadline, payment_method, rate_discount, infoperso_id, customer_id } = req.body;

    const newFacture = await pool.query(
      "INSERT INTO facture (date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [date_saisie, date_deadline, payment_method, rate_discount, infoperso_id, customer_id]
    );

    res.status(201).json(newFacture.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// Fin Route Facture //

// Déclaration des middleware route
app.use(config.rootAPI + "infoperso", InfoPersoRouter);
app.use(config.rootAPI + "customer", CustomerRouter);
app.use(config.rootAPI + "product", ProductRouter);
app.use(config.rootAPI + "facture", FactureRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.port, () => console.log("started on port " + config.port));

module.exports = app;
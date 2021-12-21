const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const pool = require('./db');
const config = require('./config');
const app =express();
var cors = require('cors');
app.use(cors());

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

// Route Customer //
let CustomerRouter = express.Router();

CustomerRouter.route("/all").get(async (req, res) => {
  try {
    const allCustomer = await pool.query("SELECT * FROM customer");

    res.json(allCustomer.rows);
  } catch (err) {
    console.log(err.message);
  }
});

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

  // Suppression d'un product
.delete(async (req, res) => {
  try {
    const {id} = req.params;

    const deleteInfoPerso = await pool.query("DELETE FROM product WHERE product_id = $1", [id]);

    res.json("Delete effectued !")
  } catch (err) {
    console.log(err.message)
  }
})

// Crée un product
ProductRouter.route("/add").post(async (req, res) => {
  try {
    const {name, sale_price_ht, tva_rate, remark, purchase_cost, margin_coefficient} = req.body;

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

FactureRouter.route("/all").get(async (req, res) => {
    try {
        const allFacture = await pool.query("SELECT * FROM facture");

        res.json(allFacture.rows);
    } catch (err) {
        console.log(err.message);
    }
});

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

    //Modifie les paramètres d'une facture en fonction de son id
    .put(async (req, res) => {
        try {
            const { id } = req.params;
            const {date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id } = req.body;

            const modifFacture = await pool.query(
                "UPDATE facture SET date_saisie = COALESCE($1, date_saisie), date_deadline = COALESCE($2, date_deadline), payment_method = COALESCE($3, payment_method), rate_discount = COALESCE($4, rate_discount), infoperso_Id = COALESCE($5, infoperso_Id), customer_Id = COALESCE($6, customer_Id) WHERE facture_id = $7",
                [date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id , id ]
            );

            res.status(201).json("facture update !");
        } catch (err) {
            console.log(err.message);
        }
    })

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

// Crée un facture
FactureRouter.route("/add").post(async (req, res) => {
    try {
        const {date_saisie, date_deadline, payment_method, rate_discount, infoperso_id, customer_id  } = req.body;

        const newFacture = await pool.query(
            "INSERT INTO facture (date_saisie, date_deadline, payment_method, rate_discount, infoperso_Id, customer_Id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [date_saisie, date_deadline, payment_method, rate_discount, infoperso_id, customer_id  ]
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

app.listen(config.port, () => console.log("started on port " + config.port));

module.exports = app;


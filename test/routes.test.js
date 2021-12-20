const request = require("supertest");
const app = require("../app");

describe("Facturation API", () => {
  // CUSTOMER TEST  //
  test("GET /customer/all => Array customer", () => {
    return request(app)
      .get("/api/v1/customer/all")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              customer_id: expect.any(Number),
              relation_type: expect.any(String),
              name: expect.any(String),
              siret: expect.any(String),
              address: expect.any(String),
              postcode: expect.any(String),
              city: expect.any(String),
              country: expect.any(String),
              email: expect.any(String),
              prefix_phone: expect.any(String),
              phone_number: expect.any(Number),
              phone_number_secondary: expect.any(Number),
              remark: expect.any(String),
            }),
          ])
        );
      });
  });

  test("GET /customer/:id => Array customer", () => {
    return request(app)
      .get("/api/v1/customer/2")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            customer_id: expect.any(Number),
            relation_type: expect.any(String),
            name: expect.any(String),
            siret: expect.any(String),
            address: expect.any(String),
            postcode: expect.any(String),
            city: expect.any(String),
            country: expect.any(String),
            email: expect.any(String),
            prefix_phone: expect.any(String),
            phone_number: expect.any(Number),
            phone_number_secondary: expect.any(Number),
            remark: expect.any(String),
          })
        );
      });
  });

  test("POST /customer/add => Array customer", () => {
    return request(app)
      .post("/api/v1/customer/add")
      .send({
        relation_type: "Particulier",
        name: "Test Nom Entreprise",
        siret: "123456789dfg458",
        address: "32 Rue du test",
        postcode: "323232",
        city: "Testville",
        country: "TestPays",
        email: "test@gmail.com",
        prefix_phone: "+(45)",
        phone_number: 123562569,
        phone_number_secondary: 123568902,
        remark: "Bonjoour ceci est un test",
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            relation_type: "Particulier",
            name: "Test Nom Entreprise",
            siret: "123456789dfg458",
            address: "32 Rue du test",
            postcode: "323232",
            city: "Testville",
            country: "TestPays",
            email: "test@gmail.com",
            prefix_phone: "+(45)",
            phone_number: 123562569,
            phone_number_secondary: 123568902,
            remark: "Bonjoour ceci est un test",
          })
        );
      });
  });

  test("PUT /customer/:id => Array customer", () => {
    return request(app)
      .put("/api/v1/customer/1")
      .send({
        city: "Testville",
      })
      .expect(201);
  });

  test("DELETE /customer/:id => Array customer", () => {
    return request(app).delete("/api/v1/customer/35").send().expect(200);
  });

  // FIN CUSTOMER TEST  //

  // INFOPERSO TEST  //

  test("GET /infoperso/all => Array infoperso", () => {
    return request(app)
      .get("/api/v1/infoperso/all")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              infoperso_id: expect.any(Number),
              name: expect.any(String),
              supplement_name: expect.any(String),
              address: expect.any(String),
              postcode: expect.any(String),
              city: expect.any(String),
              phone_number: expect.any(Number),
              siret: expect.any(String),
              is_tva: expect.any(Boolean),
            }),
          ])
        );
      });
  });

  test("GET /infoperso/:id => Array infoperso", () => {
    return request(app)
      .get("/api/v1/infoperso/2")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            infoperso_id: expect.any(Number),
            name: expect.any(String),
            supplement_name: expect.any(String),
            address: expect.any(String),
            postcode: expect.any(String),
            city: expect.any(String),
            phone_number: expect.any(Number),
            siret: expect.any(String),
            is_tva: expect.any(Boolean),
          })
        );
      });
  });

  test("POST /infoperso/add => Array infoperso", () => {
    return request(app)
      .post("/api/v1/infoperso/add")
      .send({
        name: "EnerdiTest",
        supplement_name: "TEST",
        address: "45 avenue du test",
        postcode: "698574",
        city: "TestVille",
        phone_number: 125639874,
        siret: "123456789xsze85",
        is_tva: false,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            name: "EnerdiTest",
            supplement_name: "TEST",
            address: "45 avenue du test",
            postcode: "698574",
            city: "TestVille",
            phone_number: 125639874,
            siret: "123456789xsze85",
            is_tva: false,
          })
        );
      });
  });

  test("PUT /infoperso/:id => Array infoperso", () => {
    return request(app)
      .put("/api/v1/infoperso/1")
      .send({
        name: "EnerdiTest01",
      })
      .expect(201);
  });

  test("DELETE /infoperso/:id => Array infoperso", () => {
    return request(app).delete("/api/v1/infoperso/1").send().expect(200);
  });

  //  FIN INFOPERSO TEST  //

  //  PRODUCT TEST  //

  test("GET /product/all => Array product", () => {
    return request(app)
      .get("/api/v1/product/all")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              product_id: expect.any(Number),
              description: expect.any(String),
              sale_price_ht: expect.any(Number),
              tva_rate: expect.any(Number),
              remark: expect.any(String),
              purchase_cost: expect.any(Number),
              margin_coefficient: expect.any(Number),
            }),
          ])
        );
      });
  });

  test("GET /product/:id => Array product", () => {
    return request(app)
      .get("/api/v1/product/2")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            product_id: expect.any(Number),
            description: expect.any(String),
            sale_price_ht: expect.any(Number),
            tva_rate: expect.any(Number),
            remark: expect.any(String),
            purchase_cost: expect.any(Number),
            margin_coefficient: expect.any(Number),
          })
        );
      });
  });

  test("POST /product/add => Array product", () => {
    return request(app)
      .post("/api/v1/product/add")
      .send({
        description: "test de description",
        sale_price_ht: 10.0,
        tva_rate: 2.0,
        remark: "ceci est une bonne remark",
        purchase_cost: 10.21,
        margin_coefficient: 0.05,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            description: "test de description",
            sale_price_ht: 10.0,
            tva_rate: 2.0,
            remark: "ceci est une bonne remark",
            purchase_cost: 10.21,
            margin_coefficient: 0.05,
          })
        );
      });
  });

  test("PUT /product/:id => Array product", () => {
    return request(app)
      .put("/api/v1/product/1")
      .send({
        sale_price_ht: 20.0,
      })
      .expect(201);
  });

  test("DELETE /product/:id => Array product", () => {
    return request(app).delete("/api/v1/product/35").send().expect(200);
  });

  //  FIN PRODUCT TEST  //

  //  FACTURE TEST  //

  test("GET /facture/all => Array facture", () => {
    return request(app)
      .get("/api/v1/facture/all")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              facture_id: expect.any(Number),
              date_saisie: expect.any(Date),
              date_deadline: expect.any(Date),
              payment_method: expect.any(String),
              postcode: expect.any(String),
              rate_discount: expect.any(String),
              infoperso_id: expect.any(Number),
              customer_id: expect.any(Number),
            }),
          ])
        );
      });
  });

  test("GET /facture/:id => Array facture", () => {
    return request(app)
      .get("/api/v1/infoperso/2")
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            facture_id: expect.any(Number),
            date_saisie: expect.any(Date),
            date_deadline: expect.any(Date),
            payment_method: expect.any(String),
            rate_discount: expect.any(Number),
            infoperso_id: expect.any(Number),
            customer_id: expect.any(Number),
          })
        );
      });
  });

  test("POST /facture/add => Array facture", () => {
    return request(app)
      .post("/api/v1/facture/add")
      .send({
        date_saisie: "2021-12-14",
        date_deadline: "2021-12-16",
        payment_method: "Visa",
        rate_discount: 2.36,
        infoperso_id: 1,
        customer_id: 2,
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            date_saisie: "2021-12-14",
            date_deadline: "2021-12-16",
            payment_method: "Visa",
            rate_discount: 2.36,
            infoperso_id: 1,
            customer_id: 2,
          })
        );
      });
  });

  test("PUT /facture/:id => Array facture", () => {
    return request(app)
      .put("/api/v1/facture/1")
      .send({
        payment_method: "Mastercard",
      })
      .expect(201);
  });

  test("DELETE /facture/:id => Array facture", () => {
    return request(app).delete("/api/v1/facture/1").send().expect(201);
  });

  //  FIN FACTURE TEST  //
});

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

  test("GET /infoperso/all => Array infoperso", () => {});

  test("GET /infoperso/:id => Array infoperso", () => {});

  test("POST /infoperso/add => Array infoperso", () => {});

  test("PUT /infoperso/:id => Array infoperso", () => {});

  test("DELETE /infoperso/:id => Array infoperso", () => {});

  //  FIN INFOPERSO TEST  //

  //  PRODUCT TEST  //

  test("GET /product/all => Array product", () => {});

  test("GET /product/:id => Array product", () => {});

  test("POST /product/add => Array product", () => {});

  test("PUT /product/:id => Array product", () => {});

  test("DELETE /product/:id => Array product", () => {});

  //  FIN PRODUCT TEST  //

  //  FACTURE TEST  //

  test("GET /facture/all => Array facture", () => {});

  test("GET /facture/:id => Array facture", () => {});

  test("POST /facture/add => Array facture", () => {});

  test("PUT /facture/:id => Array facture", () => {});

  test("DELETE /facture/:id => Array facture", () => {});

  //  FIN FACTURE TEST  //
});

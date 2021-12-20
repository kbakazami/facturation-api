const request = require("supertest");
const app = require("../app");

describe("Facturation API", () => {
  // CUSTOMER TEST  //
  test("GET /customer/all => Array customer", () => {});

  test("GET /customer/:id => Array customer", () => {});

  test("POST /customer/add => Array customer", () => {});

  test("PUT /customer/:id => Array customer", () => {});

  test("DELETE /customer/:id => Array customer", () => {});

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

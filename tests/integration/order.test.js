const request = require("supertest");
let server;

describe("/order/", () => {
  beforeEach(() => {
    server = require("../../server");
  });
  afterEach(() => {
    server.close();
  });

  describe("GET /", () => {
    it("should return all orders", async () => {
      Order.collection.insrtMany([{ name: order1 }]);
      const res = await request(server).get("/order");
      expect(res.status).toBe(200);
    });
  });
});

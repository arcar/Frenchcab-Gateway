const { test, mock, afterEach } = require("node:test");
const assert = require("node:assert");
const axios = require("axios");

const testService = require("../src/services/testService.js");

process.env.BACKEND_URL = "http://backend:8000";

afterEach(() => {
    mock.restoreAll();
});

test("getTests appelle BACKEND_URL/test et renvoie les données", async () => {
    const getMock = mock.method(axios, "get", async () => ({ data: { message: "ok" } }));

    const result = await testService.getTests();

    assert.deepStrictEqual(result, { message: "ok" });
    assert.strictEqual(getMock.mock.callCount(), 1);
    assert.strictEqual(getMock.mock.calls[0].arguments[0], "http://backend:8000/test");
});

test("getTests lève une erreur si l'API Python est injoignable", async () => {
    mock.method(axios, "get", async () => {
        throw new Error("connect ECONNREFUSED");
    });

    await assert.rejects(testService.getTests(), {
        message: "Impossible de contacter l'API Python",
    });
});

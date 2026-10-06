const { test, mock, before, after, afterEach } = require("node:test");
const assert = require("node:assert");
const axios = require("axios");

const app = require("../index.js");

let server;
let baseUrl;

before(async () => {
    // Port 0 : le système choisit un port libre
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
    server.close();
});

afterEach(() => {
    mock.restoreAll();
});

test("GET /test renvoie 200 avec les données du backend", async () => {
    mock.method(axios, "get", async () => ({ data: [{ id: 1 }] }));

    const res = await fetch(`${baseUrl}/test`);
    const body = await res.json();

    assert.strictEqual(res.status, 200);
    assert.deepStrictEqual(body, { success: true, data: [{ id: 1 }] });
});

test("GET /test renvoie 500 si le backend est injoignable", async () => {
    mock.method(axios, "get", async () => {
        throw new Error("connect ECONNREFUSED");
    });

    const res = await fetch(`${baseUrl}/test`);
    const body = await res.json();

    assert.strictEqual(res.status, 500);
    assert.strictEqual(body.success, false);
    assert.strictEqual(body.message, "Impossible de récupérer le test");
});

test("les en-têtes CORS sont présents", async () => {
    mock.method(axios, "get", async () => ({ data: {} }));

    const res = await fetch(`${baseUrl}/test`);

    assert.strictEqual(res.headers.get("access-control-allow-origin"), "*");
});

test("une route inconnue renvoie 404", async () => {
    const res = await fetch(`${baseUrl}/route-inexistante`);

    assert.strictEqual(res.status, 404);
});

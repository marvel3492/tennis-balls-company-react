import request, { agent as _agent } from 'supertest';
import app from '../backend/src/app.js';
import db from '../backend/src/db.js';

const maxCustomerFieldLengths = /** @type Record<string, number> */ ({
    firstname: 20,
    lastname: 20,
    email: 25,
    phone: 20,
    address: 50,
    city: 20,
    state: 50,
    zip: 10,
    username: 20,
    password: 20
});

describe('Authentication & Authorization', () => {
    const adminUrls = [
        "/customer",
        "/customer/1/show",
        "/customer/1/edit",
        "/image",
        "/image/1/show",
        "/image/1/edit",
        "/product",
        "/product/1/edit",
        "/saleorder",
        "/saleorder/1/show",
        "/saleorder/1/edit",
        "/orderdetail",
        "/orderdetail/1/show",
        "/orderdetail/1/edit",
        "/promotion",
        "/promotion/1/edit",
        "/report/customer",
        "/report/product",
        "/report/sale"
    ];

    adminUrls.forEach(function (url) {
        test('Test admin-only middleware correctly rejects non-admin users and redirects to homepage: ' + url, async () => {
            const res = await request(app).get(url);
            expect(res.statusCode).toBe(401);
        });
    });
});

/**
 * @param {string} field 
 * @param {string} [invaldField]
 */
function getLength(field, invaldField) {
    if (maxCustomerFieldLengths[field]) {
        return field === invaldField ? maxCustomerFieldLengths[field] + 1 : maxCustomerFieldLengths[field];
    } else {
        return 0;
    }
}

const symbols = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()";

/**
 * @param {string} field 
 * @param {string} [invaldField]
 */
function generateValue(field, invaldField) {
    let value = "";
    for (let i = 0; i < getLength(field, invaldField); i++) {
        value += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }

    return value;
}

/**
 * @param {string} [invaldField]
 */
function generateRandomCustomer(invaldField) {
    return {
        customer_id: 0,
        firstname: generateValue("firstname", invaldField),
        lastname: generateValue("lastname", invaldField),
        email: generateValue("email", invaldField),
        phone: generateValue("phone", invaldField),
        address: generateValue("address", invaldField),
        city: generateValue("city", invaldField),
        state: generateValue("state", invaldField),
        zip: generateValue("zip", invaldField),
        username: generateValue("username", invaldField),
        password: generateValue("password", invaldField),
        isadmin: 0
    };
}

async function loginAsAdmin() {
    const agent = _agent(app);
    const res = await agent.post("/customer/login").send({ username: admin.username, password: admin.password });
    expect(res.statusCode).toBe(200);
    return agent;
}

const admin = generateRandomCustomer();

describe('Customer Routes', () => {
    test('Create valid customer: /customer', async () => {
        const res = await request(app).post("/customer").send(admin);
        expect(res.statusCode).toBe(200);

        // Make customer admin
        try {
            db.exec("UPDATE customer SET isadmin = 1 WHERE customer_id = 1");
        } catch (err) {
            throw new Error("db.run Error");
        }
    });

    for (const field in maxCustomerFieldLengths) {
        if (field !== "password") {
            test(`Create invalid customer (${field}): /customer`, async () => {
                const res = await request(app).post("/customer").send(generateRandomCustomer(field));
                expect(res.statusCode).toBe(400);
                expect(res.text).toContain('Error');
            });
        }
    }

    test('Test /customer/login POST with invalid credentials (username): /customer/login', async () => {
        const res = await request(app).post("/customer/login").send({ username: "", password: generateRandomCustomer().password });
        expect(res.statusCode).toBe(401);
        expect(res.text).toContain('Wrong Username');
    });

    test('Test /customer/login POST with invalid credentials (password): /customer/login', async () => {
        const res = await request(app).post("/customer/login").send({ username: admin.username, password: "" });
        expect(res.statusCode).toBe(401);
        expect(res.text).toContain('Wrong Password');
    });

    test('Test /customer/login POST with valid credentials: /customer/login', async () => {
        const res = await request(app).post("/customer/login").send({ username: admin.username, password: admin.password });
        expect(res.statusCode).toBe(200);
    });
});

describe('Test NULL/empty result handling', () => {
    const urls = [
        "/customer/0/show",
        "/product/0/show",
        "/saleorder/0/show",
        "/orderdetail/0/show",
        "/promotion/0/show",
        "/customer/0/edit",
        "/product/0/edit",
        "/saleorder/0/edit",
        "/orderdetail/0/edit",
        "/promotion/0/edit"
    ];

    urls.forEach(function (url) {
        test('Test NULL/empty result handling: ' + url, async () => {
            const agent = await loginAsAdmin();
            const res = await agent.get(url);
            expect(res.statusCode).toBe(500);
            expect(res.text).toContain('Not found');
        });
    });

    const urls2 = [
        "/product",
        "/saleorder",
        "/orderdetail",
        "/promotion",
    ];

    urls2.forEach(function (url) {
        test('Test NULL/empty result handling: ' + url, async () => {
            const agent = await loginAsAdmin();
            const res = await agent.get(url);
            expect(res.statusCode).toBe(200);
            expect(res.text).toContain('[]');
        });
    });
});
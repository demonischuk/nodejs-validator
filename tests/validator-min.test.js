const Validator = require("../validator")();
const instance = new Validator();

const expectSuccess = (result) => {
    expect(result.passed).toBe(true);
    expect(result.issues.length).toBe(0);
};

const expectFail = (result, ruleAmount) => {
    expect(result.passed).toBe(false);
    expect(result.issues.length).toBe(1);
    expect(result.issues[0].field).toBe("name");
    expect(result.issues[0].message).toBe(`Must be greater than or equal to ${ruleAmount}`);
};

test("Min field - is undefined", () => {
    expectSuccess(instance.validate({ alias: "Demonisch"}, [{ field: "name", min: 0}]));    
});

test("Min field - is null", () => {
    expectSuccess(instance.validate({ name: null}, [{ field: "name", min: 0}]));
});

test("Min field - is object", () => {
    expectSuccess(instance.validate({ name: {}}, [{ field: "name", min: 0}]));
});

test("Min fiekd - is blank string", () => {
    expectSuccess(instance.validate({ name: ""}, [{ field: "name", min: 0}]));
});

test("Min field - is string and not blank", () => {
    expectSuccess(instance.validate({ name: "Andrew"}, [{ field: "name", min: 0}]));
    expectSuccess(instance.validate({ name: "Andrew"}, [{ field: "name", min: 15}]));
});

test("Min field - is false boolean", () => {
    expectSuccess(instance.validate({ name: false}, [{ field: "name", min: 0}]));
});

test("Min field - is true boolean", () => {
    expectSuccess(instance.validate({ name: true}, [{ field: "name", min: 0}]));
});

test("Min field - is zero number", () => {
    expectSuccess(instance.validate({ name: 0}, [{ field: "name", min: -1}]));
    expectSuccess(instance.validate({ name: 0}, [{ field: "name", min: -0.5}]));
    expectSuccess(instance.validate({ name: 0}, [{ field: "name", min: -0.1}]));
    expectSuccess(instance.validate({ name: 0}, [{ field: "name", min: 0}]));
    expectFail(instance.validate({ name: 0}, [{ field: "name", min: 0.1}]), 0.1);
    expectFail(instance.validate({ name: 0}, [{ field: "name", min: 1}]), 1);
});

test("Min field - is minus number", () => {
    expectSuccess(instance.validate({ name: -1}, [{ field: "name", min: -2}]));
    expectSuccess(instance.validate({ name: -1}, [{ field: "name", min: -1}]));
    expectFail(instance.validate({ name: -1}, [{ field: "name", min: -0.9}]), -0.9);
    expectFail(instance.validate({ name: -1}, [{ field: "name", min: 0}]), 0);
    expectFail(instance.validate({ name: -1}, [{ field: "name", min: 1}]), 1);
});

test("Min field - is positive number", () => {
    expectSuccess(instance.validate({ name: 1}, [{ field: "name", min: 0}]));
    expectSuccess(instance.validate({ name: 1}, [{ field: "name", min: 0.9}]));
    expectSuccess(instance.validate({ name: 1}, [{ field: "name", min: 1}]));
    expectFail(instance.validate({ name: 1}, [{ field: "name", min: 1.1}]), 1.1);
    expectFail(instance.validate({ name: 1}, [{ field: "name", min: 2}]), 2);
});
const Validator = require("../validator")();
const instance = new Validator();

const expectSuccess = (result) => {
    expect(result.passed).toBe(true);
    expect(result.issues.length).toBe(0);
};

const expectFail = (result) => {
    expect(result.passed).toBe(false);
    expect(result.issues.length).toBe(1);
    expect(result.issues[0].field).toBe("name");
    expect(result.issues[0].message).toBe("Field is required");
};

test("Required field - is not provided", () => {
    expectFail(instance.validate({ alias: "Demonisch"}, [{ field: "name", required: true}]));    
});

test("Required field - is null", () => {
    expectFail(instance.validate({ name: null}, [{ field: "name", required: true}]));
});

test("Required field - is object", () => {
    expectSuccess(instance.validate({ name: {}}, [{ field: "name", required: true}]));
});

test("Required field - is blank string", () => {
    expectFail(instance.validate({ name: ""}, [{ field: "name", required: true}]));
});

test("Required field - is string and not blank", () => {
    expectSuccess(instance.validate({ name: "Andrew"}, [{ field: "name", required: true}]));
});

test("Required field - is false boolean", () => {
    expectSuccess(instance.validate({ name: false}, [{ field: "name", required: true}]));
});

test("Required field - is true boolean", () => {
    expectSuccess(instance.validate({ name: true}, [{ field: "name", required: true}]));
});

test("Required field - is zero number", () => {
    expectSuccess(instance.validate({ name: 0}, [{ field: "name", required: true}]));
});

test("Required field - is minus number", () => {
    expectSuccess(instance.validate({ name: -1}, [{ field: "name", required: true}]));
});

test("Required field - is positive number", () => {
    expectSuccess(instance.validate({ name: 1}, [{ field: "name", required: true}]));
});
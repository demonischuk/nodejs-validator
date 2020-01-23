const Validator = require("../validator")();
const instance = new Validator();

test("Rules is not an array", () => {
    const model = {name: "Andrew"};
    expect(() => instance.validate(model)).toThrow();
    [null, {}].forEach(x => {
        expect(() => instance.validate(model, x)).toThrow();
    });
});

test("Model is not an object", () => {
    const result = instance.validate("abc", []);

    expect(result.passed).toBe(false);
    expect(result.issues.length).toBe(1);
});

test("No rules returns success", () => {
    const result = instance.validate({ name: "Andrew"}, []);

    expect(result.passed).toBe(true);
    expect(result.issues.length).toBe(0);
});
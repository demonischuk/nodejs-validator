module.exports = (() => {
    const Validator = function () {
        const ValidationResponse = function (passed, issues) {
            this.passed = passed;
            this.issues = issues;
        };

        ValidationResponse.error = (error) => new ValidationResponse(false, [{ field: null, message: error }]);

        this.validate = (model, rules) => {
            if (Array.isArray(rules) === false) {
                throw "Validator validate method expects a rules array to be passed in";
            }

            if (typeof model !== "object") {
                return ValidationResponse.error("Invalid request");
            }

            const issues = [];
            const addIssue = (rule, message) => {
                issues.push({
                    field: rule.field,
                    message: message
                });
            };

            for (let i = 0; i < rules.length; i++) {
                const rule = rules[i];
                const match = model[rule.field];

                if (rule.required &&
                    (typeof match === "undefined" ||
                        match === null ||
                        (typeof match === "string" && match === ""))) {
                    addIssue(rule, "Field is required");
                }
            }

            return new ValidationResponse(issues.length === 0, issues);
        };
    };

    return Validator;
});
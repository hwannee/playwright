let options = [
    '--require-module ts-node/register',    // Load TypeScript module
    '--require ./e2e/steps/*.ts',           // Load step definitions
    '--format progress',                    // Load custom formatter
].join(' ');

let run_features = [
    './e2e/features/',  // Specify feature files
    options,
].join(' ');

module.exports = {
    test_runner: run_features
};

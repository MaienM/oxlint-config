import { defineConfig } from 'oxlint';
import airbnb from 'oxlint-config-presets/airbnb.json' with { type: 'json' };
import tsStrict from 'oxlint-config-presets/@typescript-eslint/strict-type-checked.json' with { type: 'json' };

export default defineConfig({
	extends: [
		airbnb,
		tsStrict,
	],
	plugins: [
		'oxc',
		'typescript',
		'unicorn',
	],
	jsPlugins: [
		{
			name: 'import-sort',
			specifier: 'eslint-plugin-simple-import-sort',
		},
	],
	categories: {
		correctness: 'error',
		suspicious: 'error',
		pedantic: 'warn',
		restriction: 'warn',
		style: 'warn',
	},
	rules: {
		// I don't understand why people consider this to be an issue, it's functionally very similar to having as an early return in a function which isn't considered problematic.
		'no-continue': 'off',

		// I don't like enforcing this as a rule. In cases where these returns are used as a guard of sorts I absolutely agree with the rule, but in cases where the if chain handles a bunch of simple cases where each block is a few lines I do not find this rule to be beneficial.
		'no-else-return': 'off',

		// Explicit extensions (as is required by TS6.x) for local files.
		'import/extensions': ['error', {
			'ignorePackages': true,
		}],

		// Requiring this for internal functions is a bit overkill, but we do keep the one that requires it for exported functions and public class methods.
		'typescript/explicit-function-return-type': 'off',

		// Using basic types in templates is fine, but using nullish isn't since this could too easily be a mistake or missing guard condition.
		'typescript/restrict-template-expressions': ['error', {
			allowBoolean: true,
			allowNumber: true,
			allowNullish: false,
		}],

		// This comes up frequently enough (whenever an interface doesn't properly define its types) that it's just too noisy.
		'typescript/no-unsafe-type-assertion': 'off',

		// There are _way_ too many functions/types that cannot easily be made readonly for this to be enabled globally.
		'typescript/prefer-readonly-parameter-types': 'off',

		// A default case is by definition exhaustive.
		'typescript/switch-exhaustiveness-check': ['warn', {
			considerDefaultExhaustiveForUnions: true,
		}],

		// I think this is fine as long as the await-ed expression is very simple.
		'unicorn/no-await-expression-member': 'off',

		// While I agree with the idea that in most cases undefined should be used instead of null I do not agree with banning its use entirely as there are valid usecases for allowing both and treating both differently.
		'unicorn/no-null': 'off',

		// This seems broken in some cases, where it removes an non-optional argument from a typescript function and causes a compiler error in doing so.
		'unicorn/no-useless-undefined': 'off',

		// I prefer the look with the dash.
		'unicorn/text-encoding-identifier-case': ['warn', {
			withDash: true,
		}],
	},
	overrides: [
		{
			files: [
				'**/test/**/*.ts',
				'**/test/**/*.js',
				'**/benchmark/**/*.ts',
				'**/benchmark/**/*.js',
				'**/*.test.ts',
				'**/*.test.js',
				'**/*.spec.ts',
				'**/*.spec.js',
			],
			rules: {
				// It's pretty common to define one-use internal functions within tests, and lifting these to the top would make the tests harder to read and not provide any benefits.
				'unicorn/consistent-function-scoping': 'off',
			},
		},
	],
	env: {
		builtin: true,
	},
});

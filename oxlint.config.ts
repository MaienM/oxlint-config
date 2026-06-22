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
	categories: {
		correctness: 'error',
	},
	env: {
		builtin: true,
	},
});

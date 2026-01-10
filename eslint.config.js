import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier";

export default [
    {
        ignores: ["dist/**", "node_modules/**"],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        files: ["**/*.ts", "**/*.tsx"],
        plugins: {
            prettier,
        },
        rules: {
            "prettier/prettier": "error",
        },
    },
];

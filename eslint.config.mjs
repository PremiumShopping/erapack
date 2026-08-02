import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Turn off ESLint rules that would fight Prettier (formatting is Prettier's job).
  prettier,
  // React Three Fiber mutates three.js objects every frame inside useFrame —
  // the standard, correct pattern. The new react-hooks purity rules assume
  // React render semantics that don't apply to imperative WebGL animation, so
  // we scope them off for the 3D layer only (the rest of the app stays strict).
  {
    files: ["components/three/**/*.{ts,tsx}"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/refs": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;

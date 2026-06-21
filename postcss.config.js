import postcssGlobalData from "@csstools/postcss-global-data";
import postcssCustomMedia from "postcss-custom-media";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    postcssGlobalData({
      files: ["./src/styles/breakpoints.css"],
    }),
    postcssCustomMedia(),
    tailwindcss,
    autoprefixer,
  ],
};

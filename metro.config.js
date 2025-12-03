const path = require("path");
const fs = require("fs");
const { getDefaultConfig } = require("@expo/metro-config");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

const hasExpoImagePicker = fs.existsSync(
  path.join(projectRoot, "node_modules", "expo-image-picker")
);

config.resolver = config.resolver || {};
config.resolver.extraNodeModules = config.resolver.extraNodeModules || {};

if (!hasExpoImagePicker) {
  config.resolver.extraNodeModules["expo-image-picker"] = path.resolve(
    projectRoot,
    "shims",
    "expo-image-picker"
  );
}

module.exports = config;

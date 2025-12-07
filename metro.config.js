const path = require("path");
const fs = require("fs");
const { getDefaultConfig } = require("expo/metro-config");
const { resolve } = require("metro-resolver");

const projectRoot = __dirname;
const config = getDefaultConfig(projectRoot);

const hasExpoImagePicker = fs.existsSync(
  path.join(projectRoot, "node_modules", "expo-image-picker")
);
const shimDir = path.join(projectRoot, "shims", "expo-image-picker");
const shimPath = path.join(shimDir, "index.js");

config.resolver = config.resolver || {};
config.resolver.extraNodeModules = config.resolver.extraNodeModules || {};

if (!hasExpoImagePicker) {
  config.watchFolders = Array.from(new Set([...(config.watchFolders || []), path.join(projectRoot, "shims")]));

  // Alias the package name to the shim directory so Metro can resolve it like a normal module.
  config.resolver.extraNodeModules["expo-image-picker"] = shimDir;

  const upstreamResolveRequest = config.resolver.resolveRequest;

  config.resolver.resolveRequest = (context, moduleName, platform) => {
    if (moduleName === "expo-image-picker") {
      return {
        type: "sourceFile",
        filePath: shimPath,
      };
    }

    if (upstreamResolveRequest) {
      return upstreamResolveRequest(context, moduleName, platform);
    }

    return resolve(context, moduleName, platform);
  };
}

module.exports = config;

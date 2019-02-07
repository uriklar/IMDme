/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

require("@babel/runtime/helpers/esm/applyDecoratedDescriptor");
require("@babel/runtime/helpers/esm/initializerDefineProperty");

AppRegistry.registerComponent(appName, () => App);

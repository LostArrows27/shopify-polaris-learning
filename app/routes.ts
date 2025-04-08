import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./layout/layout.tsx", [
    route("account", "./routes/account.tsx"),
    route("addresses", "./routes/address.tsx"),
  ]), 
] satisfies RouteConfig;

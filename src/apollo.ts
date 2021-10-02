import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { History } from "history";
import routes from "./routes";
import { IState } from "./types";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const darkModeVar = makeVar(false);

export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: History<IState>) => {
  localStorage.removeItem(TOKEN);
  history?.replace(routes.home);
  window.location.reload();
};

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

export default client;

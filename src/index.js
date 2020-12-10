import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  makeVar,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          testList: (existing, { readField }) => {
            const direction = sortOrder();
            if (direction === "DESC") {
              return [{ cnt: 1 }];
            } else {
              return [{ cnt: 2 }];
            }
          },
          sortedCountries: (existing, { readField }) => {
            const direction = sortOrder();
            const countires = [...(readField("countries") ?? [])];

            return countires.sort((a, b) => {
              const aName = readField("name", a);
              const bName = readField("name", b);

              if (direction === "DESC") {
                if (aName < bName) return 1;
                if (aName > bName) return -1;
                return 0;
              } else {
                return b - a;
                if (aName < bName) return -1;
                if (aName > bName) return 1;
                return 0;
              }
            });
          },
          country: {
            read: (existing, { toReference, args }) => {
              const countryRef = toReference({
                __typename: "Country",
                code: args.code,
              });
              return existing ?? countryRef;
            },
          },
        },
      },
      Country: {
        keyFields: ["code"],
        fields: {
          nameWithEmoji: {
            read: (_, { readField }) => {
              const name = readField("name");
              const emoji = readField("emoji");

              return `${name} ${emoji}`;
            },
          },
        },
      },
    },
  }),
});

export const sortOrder = makeVar("DESC");

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

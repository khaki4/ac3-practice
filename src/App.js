import React, { useState, useEffect } from "react";
import "./App.css";
import { gql, useLazyQuery, useQuery, useReactiveVar } from "@apollo/client";
import { sortOrder } from "./index";

const COUNTRY = gql`
  query Country($code: ID!) {
    country(code: $code) {
      code
      name
      emoji
      nameWithEmoji @client
    }
  }
`;

const COUNTRIES = gql`
  query Countires {
    testList @client {
      cnt
    }
    sortedCountries @client {
      code
      name
      emoji
      nameWithEmoji
    }
    countries {
      code
      name
      emoji
      nameWithEmoji @client
    }
  }
`;

const App = () => {
  const direction = sortOrder();
  const [code, setCode] = useState("");
  // const { data: countryData, loading: countryLoading, error } = useQuery(
  //   COUNTRY,
  //   {
  //     variables: { code },
  //     skip: code.length !== 2,
  //   }
  // );

  // const { data, loading } = useQuery(COUNTRIES); // 왜 안될까?
  const [exec, { data, loading }] = useLazyQuery(COUNTRIES);
  useEffect(() => {
    exec();
  }, [exec]);
  useEffect(() => {
    setTimeout(() => {
      console.log("sortOrder:ASC");
      sortOrder("ASC");
    }, 2000);
  }, []);

  console.log("countries data", data);
  // const handleChange = (e) => {
  //   setCode(e.target.value);
  // };
  console.log("data.testList", data?.testList);
  return (
    <div className="App">
      {/*{error && <h1>You broke it! {error.message}</h1>}*/}
      {/*<input type="text" value={code} onChange={handleChange} />*/}
      {/*{!countryData || countryLoading ? (*/}
      {/*  <h1>loading country...</h1>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <h1>Country</h1>*/}
      {/*    <h2>{countryData.country.nameWithEmoji}</h2>*/}
      {/*  </>*/}
      {/*)}*/}

      {!data || loading ? (
        <h1>Loading countries...</h1>
      ) : (
        <>
          <h1>Countires with Flags</h1>
          {/*<ul>*/}
          {/*  {data.sortedCountries.map((country, idx) => {*/}
          {/*    return (*/}
          {/*      <li key={idx}>*/}
          {/*        <h2>{country.nameWithEmoji}</h2>*/}
          {/*      </li>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</ul>*/}
          {data?.testList?.[0].cnt}
        </>
      )}
    </div>
  );
};

export default App;

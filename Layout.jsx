import React, {useEffect, useState, useContext } from "react";
import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { DataContext } from "./src/context/DataContext";
import { useToast } from "@chakra-ui/react";

const Layout = () => {
  const [nav, setNav] = useState("Crypto");
  const navigate = useNavigate();
  const value = useContext(DataContext);
  const toast = useToast();
  const savedData = value.savedData;
  const tabMap = { "Crypto": 0, "Trending": 1, "Saved": 2 };

  useEffect(() => {
    if (nav === "Crypto") {
      navigate("/");
    } else if (nav === "Trending") {
      navigate("/trending");
    } else if (nav === "Saved") {
      navigate("/saved");
    } else {
      navigate("/");
    }
  }, [nav]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, color: "#4A5568"}}>
      <div
        style={{
          height: 60,
          backgroundColor: "#27005D",
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
        }}
      >
        <h1 style={{ marginLeft: 50 }}>
          <span style={{ fontSize: 30, fontWeight: 700, color: "#fff" }}>
            CryptoCurrency - Live
          </span>
        </h1>
      </div>
      <Tabs variant={"soft-rounded"} colorScheme={"purple"} align="center" index={tabMap[nav]}>
        <TabList
          style={{
            display: "inline-flex",
            gap: 30,
            border: "1px solid #808080",
            borderRadius: 25,
            boxSizing: "border-box",
            padding: "10px 15px",
          }}
        >
          <Link onClick={() => setNav("Crypto")}>
            <Tab>Crypto</Tab>
          </Link>
          <Link onClick={() => setNav("Trending")}>
            <Tab>Trending</Tab>
          </Link>
          <Link
            onClick={() => {
              if (savedData.length !== 0) {
                setNav("Saved");
              } else {
                setNav("Crypto");
                navigate("/");
                toast({
                  title: "No saved data found!",
                  status: "error",
                  isClosable: true,
                });
              }
            }}
          >
            <Tab>Saved</Tab>
          </Link>
        </TabList>
      </Tabs>

      <Outlet />
    </div>
  );
};

export default Layout;

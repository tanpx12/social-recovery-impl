import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import CreateShare from "./CreateShares.js";
import Recover from "./Recover.js";

function App() {
  const [tab, setTab] = useState(0);
  const [shares, setShares] = useState([]);
  const [numberOfShares, setNumberOfShare] = useState(0);
  const [threshold, setThreshold] = useState(0);

  const [recoveryShares, setRecoveryShares] = useState([]);

  function handleChangeTab(event, value) {
    setTab(value);
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-around"
        sx={{ width: "100%", height: "100vh" }}
      >
        <Box
          sx={{ background: "#B9F3FC", overflowY: "scroll" }}
          my={5}
          width="30%"
          border="1px solid #AEE2FF"
          borderRadius="20px"
        >
          <Box p={1}>
            <Tabs value={tab} onChange={handleChangeTab}>
              <Tab label="Create shares" />
              <Tab label="Recover" />
            </Tabs>
          </Box>
          {tab === 0 ? (
            <CreateShare
              shares={shares}
              setShares={setShares}
              numberOfShares={numberOfShares}
              setNumberOfShare={setNumberOfShare}
              threshold={threshold}
              setThreshold={setThreshold}
            />
          ) : (
            <Recover
              recoveryShares={recoveryShares}
              setRecoveryShares={setRecoveryShares}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;

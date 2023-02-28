import * as secret from "./verifiableSecret.js";
import { Typography, Box, Button, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useState } from "react";

function CreateShare({
  shares,
  setShares,
  threshold,
  setThreshold,
  numberOfShares,
  setNumberOfShare,
}) {
  const id = "302fb7f59ef0eb16a9bd9a1dc7412ce0b59208a0974d525cd0f91318b00000";
  const key =
    "d04b7605614264f756574f7d6ab408bcedac58f65c1b7ce27f80485f88552f6c";
  const [msg, setMsg] = useState("No shares created");
  function createShares() {
    if (numberOfShares < threshold || numberOfShares <= 0 || threshold <= 0) {
      setMsg("Invalid inputs values");
    } else {
      let newShares = secret.share(key, numberOfShares, threshold);
      setShares(newShares);
      setMsg("Shares created");
    }
  }

  function handleChangeNumberOfShares(e) {
    setNumberOfShare(parseInt(e.target.value));
  }

  function handleChangeThreshold(e) {
    setThreshold(parseInt(e.target.value));
  }

  return (
    <>
      <Box py={3} display="flex" flexDirection="column" alignItems="center">
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "11rem",
          }}
        >
          ID:{id}
        </Typography>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "11rem",
          }}
        >
          Key:{key}{" "}
        </Typography>
      </Box>

      <Box py={3} display="flex" justifyContent="center">
        <TextField
          required
          type="number"
          label="Total number of shares"
          variant="outlined"
          value={numberOfShares}
          onChange={handleChangeNumberOfShares}
        />
        <Box px={5}></Box>
        <TextField
          required
          type="number"
          label="Recover threshold"
          variant="outlined"
          value={threshold}
          onChange={handleChangeThreshold}
        />
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Button
          variant="contained"
          onClick={() => {
            console.log("clicked");
            createShares();
          }}
        >
          Create share
        </Button>
        <Box py={2}></Box>
        <Typography>Share lists:</Typography>
        {shares.length === 0 ? (
          <>{msg}</>
        ) : (
          shares.map((s) => {
            console.log(s);
            return (
              <Box
                sx={{ background: "#AEE2FF" }}
                display="flex"
                alignItems="center"
                borderRadius="10px"
                my={1}
                p={1}
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "20rem",
                  }}
                >
                  {s}
                </Typography>
                <IconButton onClick={() => navigator.clipboard.writeText(s)}>
                  <ContentCopyIcon />
                </IconButton>
              </Box>
            );
          })
        )}
      </Box>
    </>
  );
}

export default CreateShare;

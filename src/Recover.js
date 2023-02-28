import { Typography, Box, Button, TextField, IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { combine, verify } from "./verifiableSecret.js";

function Recover({ recoveryShares, setRecoveryShares }) {
  const [share, setShare] = useState();
  const [recoveredKey, setRecoveredKey] = useState();
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box py={2}></Box>
        <Typography>Share lists:</Typography>
        {recoveryShares.length === 0
          ? "Share list empty"
          : recoveryShares.map((s) => {
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
                  <IconButton
                    onClick={() =>
                      setRecoveryShares(recoveryShares.filter((e) => e !== s))
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
      </Box>
      <Box py={3} display="flex" flexDirection="column" alignItems="center">
        <TextField
          type="string"
          label=""
          variant="outlined"
          value={share}
          onChange={(e) => setShare(e.target.value)}
        />
        <Box py={1}></Box>
        <Button
          variant="contained"
          onClick={() => {
            if (recoveryShares.includes(share)) {
              alert("share already added");
            } else {
              setRecoveryShares([...recoveryShares, share]);
            }
          }}
        >
          Add share
        </Button>
        <Box py={1} />
        <Button
          variant="contained"
          onClick={() => {
            if (verify(recoveryShares)) {
              setRecoveredKey(combine(recoveryShares));
            } else alert("invalid shares");
          }}
        >
          Recover
        </Button>
        <Box py={1} />
        {recoveredKey ? (
          <Typography
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "20rem",
            }}
          >
            Key recover successfully: <br />
            {recoveredKey}
          </Typography>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}

export default Recover;

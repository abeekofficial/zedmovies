import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { imagePath } from "../../services/api-service";
import { cast } from "../../interface/media";

interface CastCardProps {
  castMember: cast;
}

const CastCard: React.FC<CastCardProps> = ({ castMember }) => {
  return (
    <Box
      sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Avatar
        src={
          castMember.profile_path
            ? `${imagePath}${castMember.profile_path}`
            : "/default-avatar.png"
        }
        alt={castMember.name}
        sx={{ width: 150, height: 150 }}
      />
      <Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          {castMember.name}
        </Typography>
        <h3 className="text-rose-500 text-center font-medium text-sm">
          {castMember.character || "Unknown"}
        </h3>
      </Box>
    </Box>
  );
};

export default CastCard;

import { Add, Edit } from "@mui/icons-material";
import { Fab } from "@mui/material";

interface FloatButtonProps {
  onClick: () => void;
  iconType?: string;
}

export function FloatButton({ onClick, iconType }: FloatButtonProps) {
  return (
    <Fab
      sx={{ position: "fixed", bottom: 20, right: 20 }}
      color="primary"
      aria-label="add"
      onClick={onClick}
    >
      {iconType === "edit" ? <Edit /> : <Add />}
    </Fab>
  );
}

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { green, red } from "@mui/material/colors";

interface BalanceCardProps {
  balance: number; // Saldo total
}

export function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: balance >= 0 ? green[50] : red[50],
        color: balance >= 0 ? green[800] : red[800],
        boxShadow: 3,
        borderRadius: 2,
        mb: 3,
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding={0}
        >
          <Typography variant="h6" sx={{ display: { xs: "none", sm: "flex" } }}>
            Saldo da Conta
          </Typography>
          <Typography variant="h6" sx={{ display: { xs: "flex", sm: "none" } }}>
            Saldo
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {balance.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
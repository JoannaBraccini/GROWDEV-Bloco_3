import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../store/hooks";
import { typeFormat } from "../../utils/functions/type.format";
import { Loading } from "../Loading";

export default function DetailsCard() {
  const { studentDetail, loading } = useAppSelector(
    (state) => state.studentDetail
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        {loading ? (
          <Loading />
        ) : (
          <CardContent>
            <Typography
              gutterBottom
              sx={{ color: "text.secondary", fontSize: 14 }}
            >
              {typeFormat(studentDetail.studentType)}
            </Typography>
            <Typography variant="h5" component="div">
              {studentDetail.name}
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
              Registrado em {studentDetail.registeredAt}
            </Typography>
            <Typography variant="body2">
              {studentDetail.assessments.length > 0
                ? `${studentDetail.assessments.length} avaliações`
                : "Nenhuma avaliação"}
            </Typography>
          </CardContent>
        )}
        <CardActions>
          <Button size="small">Editar</Button>
          <Button size="small">Excluir</Button>
        </CardActions>
      </Card>
    </Box>
  );
}

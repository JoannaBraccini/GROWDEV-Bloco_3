import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteAssessmentAsyncThunk } from "../../store/modules/assessments/assessments.action";
import { setAssessentDetail } from "../../store/modules/assessmentDetail/assessmentDetailSlice";
import { Assessment } from "../../utils/types";
import { Loading } from "../Loading";

export function DetailsAcordion() {
  const dispatch = useAppDispatch();
  const { students } = useAppSelector((state) => state.students);
  const { assessmentDetail, loading } = useAppSelector(
    (state) => state.assessmentDetail
  );
  const userLogged = useAppSelector((state) => state.userLogged);

  function handleEdit(assessment: Assessment) {
    dispatch(setAssessentDetail(assessment));
  }

  function handleDelete(id: string) {
    dispatch(deleteAssessmentAsyncThunk({ id }));
  }

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="data-content"
              id="data-header"
            >
              <Typography component="span">Criação</Typography>
            </AccordionSummary>
            <AccordionDetails>
              Criada em {assessmentDetail.createdAt} por{" "}
              {
                students.find((user) => user.id === assessmentDetail.createdBy)
                  ?.name
              }
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="grade-content"
              id="grade-header"
            >
              <Typography component="span">Nota</Typography>
            </AccordionSummary>
            <AccordionDetails>{assessmentDetail.grade}</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="description-content"
              id="description-header"
            >
              <Typography component="span">Descrição</Typography>
            </AccordionSummary>
            <AccordionDetails>{assessmentDetail.description}</AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="title-content"
              id="title-header"
            >
              <Typography component="span">Título</Typography>
            </AccordionSummary>
            <AccordionDetails>{assessmentDetail.title}</AccordionDetails>
            {userLogged.student.studentType === "T" && (
              <AccordionActions>
                <Button onClick={() => handleDelete(assessmentDetail.id)}>
                  Excluir
                </Button>
                <Button onClick={() => handleEdit(assessmentDetail)}>
                  Editar
                </Button>
              </AccordionActions>
            )}
          </Accordion>
        </>
      )}
    </div>
  );
}

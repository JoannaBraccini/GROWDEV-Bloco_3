import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectTypeProps {
  title?: string;
  value: string;
  onChange: (value: string) => void;
}

export function SelectType({ title, value, onChange }: SelectTypeProps) {
  const [type, setType] = React.useState(value);

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selection = event.target.value;
    setType(selection); //atualiza o estado
    onChange(selection); // Passa o valor selecionado para o pai
  };

  // Atualiza o setType quando o valor da prop value mudar
  React.useEffect(() => {
    setType(value);
  }, [value]);

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel
        id="demo-select-small-label"
        sx={{
          color: "white",
          fontWeight: "500",
          fontSize: 18,
          lineHeight: "1.5rem",
        }}
      >
        {title || "Tipo"}
      </InputLabel>
      <Select
        sx={{
          color: "white",
          fontWeight: "500",
          fontSize: 18,
          lineHeight: "1.5rem",
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={type}
        label="Tipo"
        onChange={handleSelectChange}
      >
        {/* Renderiza "Todos" apenas se o título não for fornecido */}
        {!title && <MenuItem value="Todos">Todos</MenuItem>}
        <MenuItem value={"Entrada"}>Entrada</MenuItem>
        <MenuItem value={"Saída"}>Saída</MenuItem>
      </Select>
    </FormControl>
  );
}

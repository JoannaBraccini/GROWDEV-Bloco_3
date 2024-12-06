import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface SelectTypeProps {
  title?: string;
  onChange: (value: string) => void;
}

export function SelectType({ title, onChange }: SelectTypeProps) {
  const [type, setType] = React.useState("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    const selection = event.target.value;
    setType(selection); //atualiza o estado
    onChange(selection); // Passa o valor selecionado para o pai
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">{title || "Filtrar"}</InputLabel>
      <Select
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

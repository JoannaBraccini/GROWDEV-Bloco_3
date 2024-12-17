//characters
//character/:id
//characters/staff
//characters/students
//characters/house/gryffindor | /hufflepuff | /slytherin | /ravenclaw

export interface Character {
  id: string;
  name: string;
  alternate_names: string[];
  species: string;
  gender: string;
  house: string;
  wizard: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  alive: boolean;
  image: string;
}

export interface ResponseCharAPI {
  data: Character[];
}

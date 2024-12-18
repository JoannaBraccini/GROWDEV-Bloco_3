//characters
//character/:id
//characters/house/gryffindor | /hufflepuff | /slytherin | /ravenclaw

export interface Character {
  id: string;
  name: string;
  alternateNames: string[];
  species: string;
  gender: string;
  house: string;
  wizard: boolean;
  hogwartsStudent: boolean;
  hogwartsStaff: boolean;
  alive: boolean;
  image: string;
}

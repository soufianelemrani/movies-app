export interface Movie {
  endYear: string;
  genres: string;
  isAdult: string;
  originalTitle: string;
  primaryTitle: string;
  runtimeMinutes: string;
  startYear: string;
  tconst: string;
  titleType: string;
}
export interface PaginationAction {
  [action: string]: (args?: unknown) => void;
}

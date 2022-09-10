// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;

export default Diff;

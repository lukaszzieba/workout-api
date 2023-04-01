const exerciseQuery = (id: number) =>
  `select e.id, e.created_at, e.name, e.description, json_build_object('id', u.id, 'name', u."name", 'lastname', u.lastname, 'email', u.email) as creator from public.exercise e join public.users u on e.user_id = u.id group by e.id, u.id having e.id = ${id}`;

const allExerciseQuery = () =>
  `select e.id, e.created_at, e.name,  e.description, json_build_object('id', u.id, 'name', u."name", 'lastname', u.lastname, 'email', u.email) as creator from public.exercise e join public.users u on e.user_id = u.id group by e.id, u.id`;

export { exerciseQuery, allExerciseQuery };

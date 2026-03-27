let profiles = [
  { id: 1, name: "Ava Lee", major: "CS", year: 2, gpa: 3.6 },
  { id: 2, name: "Ben Park", major: "CGT", year: 3, gpa: 3.2 },
];

export async function GET(request, { params }) {
  const { id } = params;
  //TODO: find the profile by id
  const profile = profiles.find((profile) => profile.id === Number(id));

  //const profile = ;

  if (!profile) {
    return Response.json({ error: "Profile not found" }, { status: 404 });
  }

  return Response.json(profile, { status: 200 });
}

export async function PATCH(request, { params }) {
  const updates = await request.json();
  const { id } = params;

  const index = profiles.findIndex((profile) => profile.id === Number(id));

  if (index === -1) {
    return Response.json({ error: "Profile not found" }, { status: 404 });
  }

  // TODO: add validation for year or gpa before updating
    if (updates.year && (updates.year < 1 || updates.year > 4)) {
      return Response.json({ error: "Invalid year" }, { status: 400 });
    }

    if (updates.gpa && (updates.gpa < 0 || updates.gpa > 4)) {
      return Response.json({ error: "Invalid GPA" }, { status: 400 });
    } 
       
  profiles[index] = {
    ...profiles[index],
    ...updates,
    id: updates.id,
  };

  return Response.json(profiles[index], { status: 201 });
}

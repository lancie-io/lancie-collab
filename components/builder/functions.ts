// export async function getProject(projectId: string) {
//   const user = await getAuthUser();
//   const project = await prisma.project.findUnique({
//     where: {
//       id: projectId,
//     },
//     include: {
//       members: true,
//     },
//   });

//   if (!project) {
//     notFound();
//   }

//   const isMemberOfProject = project?.members.some(
//     (member) => member.id === user?.id
//   );

//   if (!isMemberOfProject) {
//     redirect('/app/unauthorized');
//   }
//   return project;
// }

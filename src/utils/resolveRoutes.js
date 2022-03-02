const resolveRoutes = (route) => {
  if (route.length == 0) {
    return "generation/1/";
  }
  return `${route}`;
};

export default resolveRoutes;

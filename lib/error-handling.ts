export const defaultErrorHandler = (err: any) => {
  console.error("Prisma error name: " + err.name);

  switch (err.name) {
    case "PrismaClientKnownRequestError":
      switch (err.code) {
        case "P2023":
          return console.error(
            "Expected element id must be exactly 12 bytes"
          );
        case "P2025":
          return console.error("Element not found.");

        default:
          return console.error(err.code);
      }
    default:
      return console.error("Internal error, please investigate." + err);
  }
};

export const catchErrors = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args);
    } catch (err) {
      return defaultErrorHandler(err);
    }
  };
};

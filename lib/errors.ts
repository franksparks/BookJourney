// Prisma errors manager file

export const defaultErrorHandler = (err: any) => {
  console.log("Prisma error name: " + err.name);

  switch (err.name) {
    case "PrismaClientKnownRequestError":
      switch (err.code) {
        case "P2023":
          return console.log(
            "Expected element id must be exactly 12 bytes"
          );
        case "P2025":
          return console.log("Element not found.");

        default:
          return console.log(err.code);
      }
    default:
      return console.log("Internal error, please investigate." + err);
  }
};

export const catchErrors = (fn: Function) => {
  return async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (err) {
      return defaultErrorHandler(err);
    }
  };
};

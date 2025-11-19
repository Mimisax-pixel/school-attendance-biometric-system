const isRole = (routerole) => {
  // routerole must be a string in this applicatio
  return function (req, res, next) {
    const user = req.user;

    // If there's no authenticated user attached, respond 401 (unauthenticated)
    if (!user || typeof user.role !== "string") {
      return res
        .status(401)
        .json({ status: "failed", error: "Authentication required" });
    }

    const { role } = user;
    let isRole = routerole.includes(role)
    console.log(isRole)
    if (isRole || routerole === role) {
      return next();
    }

    // Authenticated but not allowed
    return res
      .status(403)
      .json({ status: "failed", error: "Forbidden: insufficient role" });
  };
};

export default isRole;

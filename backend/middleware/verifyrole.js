const isRole = (routerole) => {
  // routerole must be a string in this application
  if (typeof routerole !== "string") {
    throw new TypeError("isRole middleware requires routerole to be a string");
  }

  return function (req, res, next) {
    const user = req.user;

    // If there's no authenticated user attached, respond 401 (unauthenticated)
    if (!user || typeof user.role !== "string") {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { role } = user;
    if (routerole === role) {
      return next();
    }

    // Authenticated but not allowed
    return res.status(403).json({ error: "Forbidden: insufficient role" });
  };
};

export default isRole;

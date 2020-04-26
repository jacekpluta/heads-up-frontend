module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect("/mainpage");
    }

    res.redirect("/login");
  },
};

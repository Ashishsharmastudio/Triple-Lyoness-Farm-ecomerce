const Yup = require("yup");

exports.validateRegistration = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(8).required(),
      phone: Yup.string().required(),
    });

    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.validateLogin = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    await schema.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

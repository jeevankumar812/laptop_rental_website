const parseLaptopFormData = (req, res, next) => {
  try {
    // ✅ Parse JSON fields
    if (typeof req.body.specs === "string") {
      req.body.specs = JSON.parse(req.body.specs);
    }

    if (typeof req.body.pricing === "string") {
      req.body.pricing = JSON.parse(req.body.pricing);
    }

    if (typeof req.body.tags === "string") {
      req.body.tags = JSON.parse(req.body.tags);
    }

    // ✅ Convert numbers
    if (req.body.totalUnits) req.body.totalUnits = Number(req.body.totalUnits);

    if (req.body.availableUnits)
      req.body.availableUnits = Number(req.body.availableUnits);

    if (req.body.securityDeposit)
      req.body.securityDeposit = Number(req.body.securityDeposit);

    if (req.body.pricing) {
      req.body.pricing.perDay = Number(req.body.pricing.perDay);
      req.body.pricing.perWeek = Number(req.body.pricing.perWeek);
      req.body.pricing.perMonth = Number(req.body.pricing.perMonth);
    }

    next();
  } catch (err) {
    return res.status(400).json({ error: "Invalid JSON format" });
  }
};

export default parseLaptopFormData;

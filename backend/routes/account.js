const express = require("express");

const AccountController = require("../controllers/account");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/", checkAuth, AccountController.createAccount);

router.put("/:id", AccountController.updateAccount);

router.get("/:id", AccountController.getAccount);

module.exports = router;

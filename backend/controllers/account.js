const Account = require("../models/account");

exports.createAccount = (req, res, next) => {
  const account = new Account({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    balance: req.body.balance,
    creator: req.userData.userId
  });
  account
    .save()
    .then(createdAccount => {
      res.status(201).json({
        message: "Account added successfully",
        account: {
          ...createdAccount,
          id: createdAccount._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a account failed!"
      });
    });
};

exports.updateAccount = (req, res, next) => {
  const account = new Account({
    _id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    balance: req.body.balance,
    creator: req.userData.userId
  });
  Account.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    account
  )
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't update server!"
      });
    });
};

exports.getAccount = (req, res, next) => {
  Account.findById(req.params.id)
    .then(account => {
      if (account) {
        res.status(200).json(account);
      } else {
        res.status(404).json({ message: "Account not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching account failed!"
      });
    });
};

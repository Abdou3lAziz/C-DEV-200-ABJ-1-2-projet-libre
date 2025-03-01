const { json } = require("body-parser");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10; // Facteur de travail
const jwt = require("jsonwebtoken");

exports.getAllUsers = function (req, res) {
  User.getAllUsers((err, users) => {
    if (err) throw err;
    res.json(users);
  });
};

exports.getUserById = function (req, res) {
  User.getUserById(req.params.id, (err, user) => {
    if (err) throw err;
    res.json(user);
  });
};

exports.loginUser = function (req, res) {
  let token;
  User.loginUser(req.body.email, async (err, user) => {
    try {
      if (err) {
        throw err;
      } else {
        const hashPass = user[0].password;
        async function verifyPassword(plainPassword, hashedPassword) {
          try {
            const match = await bcrypt.compare(plainPassword, hashedPassword);
            if (match) {
              console.log("Mot de passe valide");
            } else {
              console.log("Mot de passe invalide");
            }
            return match;
          } catch (error) {
            console.error(
              "Erreur lors de la vérification du mot de passe :",
              error
            );
            throw error;
          }
        }
        const V = await verifyPassword(req.body.password, hashPass);
        if (V) {
          console.log(user[0]);

          token = jwt.sign({ user: user[0] }, "dscvsd004Xzd)&85", {
            expiresIn: "1h",
          });
          res.json({
            user: user[0],
            token: token,
          });
        } else {
          res.send("Mot de passe incorrecte");
        }
      }
    } catch (error) {
      console.log(error);

      res.send("Utilisateur introuvable");
    }
  });
};

exports.createUser = async function (req, res) {
  try {

    if (req.body.nom.length < 3) throw "Entrez un nom valide";
    if (req.body.prenom.length < 3) throw "Entrez un prenom valide";
    if (!req.body.email.includes("@")) throw "Entrez une addresse mail valide";
    if (req.body.dateDeNaissance == "") throw "Veillez saisir votre date de naissance";
    if (req.body.telephone == "") throw "Veillez saisir votre date de numero";
    if (req.body.password != req.body.confir_password) throw "Mot de passe non conforme";

    async function hashPassword(plainPassword) {
      try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(plainPassword, salt);
        console.log("Mot de passe haché :", hashedPassword);
        return hashedPassword;
      } catch (error) {
        console.error("Erreur lors du hachage du mot de passe :", error);
        throw error;
      }
    }

    const newUser = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      genre: req.body.genre,
      dateDeNaissance: req.body.dateDeNaissance,
      telephone: req.body.telephone,
      isAdmin: 0,
    };

    User.createUser(newUser, (err, result) => {
      if (err) throw err;
      res.json({ message: "Utilisateur crée avec succès" });
    });
  } catch (error) {
    res.send(error);
  }
};

exports.updateUser = function (req, res) {
  const updatedUser = {};
  if (req.body.nom) {
    updatedUser["nom"] = req.body.nom;
  }
  if (req.body.prenom) {
    updatedUser["prenom"] = req.body.prenom;
  }
  if (req.body.prenom) {
    updatedUser["email"] = req.body.email;
  }
  if (req.body.prenom) {
    updatedUser["password"] = req.body.password;
  }
  if (req.body.genre) {
    updatedUser["genre"] = req.body.genre;
  }
  if (req.body.dateDeNaissance) {
    updatedUser["dateDeNaissance"] = req.body.dateDeNaissance;
  }
  if (req.body.telephone) {
    updatedUser["telephone"] = req.body.telephone;
  }
  if (req.body.isAdmin) {
    updatedUser["isAdmin"] = req.body.isAdmin;
  }

  User.updateUser(req.params.id, updatedUser, (err, result) => {
    if (err) throw err;
    res.json({ message: "User updated successfully" });
  });
};

exports.deleteUser = function (req, res) {
  User.deleteUser(req.params.id, (err, result) => {
    if (err) throw err;
    res.json({ message: "User deleted successfully" });
  });
};

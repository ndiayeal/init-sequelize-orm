const { Sequelize, DataTypes, Model, where } = require("sequelize");

const sequelize = new Sequelize("sequelize_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

/* try {
	sequelize.authenticate();
} catch (e) {
	console.log("Erreur lors de l'authentification");
} */

sequelize
  .authenticate()
  .then(() => {
    console.log("Connexion réussie");
  })
  .catch((err) => {
    console.log("Erreur lors de l'authentification");
  });

const Etudiant = sequelize.define(
  "Etudiant",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      field: "id_etudiant",
    },
    prenom: DataTypes.STRING,
    nom: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 20],
      },
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 7,
				max: 35
      },
    },
  },
  {
    freezeTableName: true,
    tableName: "isep_etudiant",
    timestamps: true,
  }
);

class Utilisateur extends Model {}
Utilisateur.init(
  {
    login: {
      type: DataTypes.STRING,
    },
    mot_de_passe: {
      type: DataTypes.STRING,
    },
  },

  {
    sequelize: sequelize,
    modelName: "isep_utilisateur",
  }
);

const etudiants = [
  {
    prenom: "Fatou",
    nom: "DIOP",
    age: 16,
  },
  {
    prenom: "Alioune",
    nom: "FAYE",
    age: 19,
  },
  {
    prenom: "Pape",
    nom: "DIOP",
    age: 8,
  },
];
//Etudiant.sync();
//sequelize.drop();
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connexion réussie");
/*     Etudiant.create(
      {
        prenom: "Fatou2",
        nom: "DIO",
        age: 8,
      },
      { validate: true }
    ); */

    //Etudiant.bulkCreate(etudiants, {validate: true});
		
		Etudiant.findOne({where: {id: 1}, raw: true})
		//Etudiant.findAll({raw: true})
		.then((response)=> {
			console.log(response);
		})
		.catch((error)=> {
			console.log(error);
		})
  })
  .catch((err) => {
    console.log("Erreur lors de l'authentification");
  });

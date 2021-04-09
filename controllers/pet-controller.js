const { Router } = require('express')
const {PetModel} = require('../models')

let PetController = Router()


PetController.post("/newPet", async (req, res) => {
    try {
    const { petName, petAge, ageMetric, typeOfPet, breed } = req.body
      
      let newPet = await PetModel.create({
        petName,
        petAge, 
        ageMetric,
        typeOfPet,
        breed,
        userId: req.user.id,
      });
      console.log(req.user)
      res.json({
        message: "List Created",
        list: newPet,
      });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "failed",
      });
    }
  });
  
  
PetController.get("/all", async (req, res) => {
    try {
      const pets = await PetModel.findAll({
        where: {
          userId: req.user.id,
        },
      });
      if (pets) {
        res.status(200).json({
          results: pets,
        });
      } else {
        res.status(404).json({
          message: "no pets found for user",
        });
      }
    } catch (e) {
      res.status(500).message({
        message: "failed to retrieve pets for user",
      });
    }
  });



  
PetController.route("/:id")
.get(async (req, res) => {
  try {
    const petId = req.params.id;
    const foundPet = await PetModel.findOne({
      where: {
        id: petId,
        userId: req.user.id,
      },
    });
    if (foundPet) {
      res.status(200).json({
        result: foundPet.toJSON(),
      });
    } else {
      res.status(404).json({
        message: "pet not found",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to get pet",
    });
  }
})
.put(async (req, res) => {
    const { petName, petAge, ageMetric, typeOfPet, breed } = req.body
  try {
    const toUpdate = await PetModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    console.log(toUpdate)
    if (toUpdate && petName) {
      toUpdate.petName = petName 
      toUpdate.petAge = petAge 
      toUpdate.ageMetric = ageMetric 
      toUpdate.typeOfPet = typeOfPet 
      toUpdate.breed = breed 
      console.log(toUpdate)
      await toUpdate.save();
      res.status(200).json({
        message: "updated pet successfully",
      });
    } else {
      res.status(404).json({
        message:
          "required fields missing, pet not found, or user is unauthorized to edit",
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "failed to edit pet",
    });
  }
})
.delete(async (req, res) => {
  try {
    const petToRemove = await PetModel.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    petToRemove
      ? petToRemove.destroy()
      : res.status(404).json({
          message: "pet not found, or does not belong to user",
        });
    res.status(200).json({
      message: "removed pet successfully",
    });
  } catch (e) {
    res.status(500).json({
      message: "failed to remoeve pet",
    });
  }
});


module.exports = PetController
const User = require('./user');
const PetModel = require('./pet')


User.hasMany(PetModel)
PetModel.belongsTo(User)


module.exports = {
    User,
    PetModel,
}

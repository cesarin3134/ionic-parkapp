module.exports = {
  '/parks': require('../controllers/getParkListController'),
  '/park/:id': require('../controllers/getParkController'),
  '/park/user/:id': require('../controllers/getParkByUserIdController'),
  '/parks/toAllocate/': require('../controllers/getParksToAllocateController'),
  '/parks/allocated/': require('../controllers/getParksAllocatedController'),
  '/park': require('../controllers/newParkController'),
  '/parks/:date': require('../controllers/getParkByDateController'),

  '/employees': require('../controllers/getEmployeeListController'),
  '/employee': require('../controllers/newEmployeeController'),
  '/employee/:id': require('../controllers/getEmployeeByIdController')

};
/*
 '/park': require('../controllers/newParkController'),
 '/park/:id': require('../controllers/updateListParkController'),
 '/park/:id': require('../controllers/deleteParkController')*/

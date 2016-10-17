module.exports = {
  '/park/list': require('../controllers/getParkListController'),
  '/park/:id': require('../controllers/getParkController'),
  '/park/user/:id': require('../controllers/getParkByUserIdController'),
  '/park/list/toAllocate/': require('../controllers/getParksToAllocateController'),
  '/parks/list/allocated/': require('../controllers/getParksAllocatedController'),
  '/park': require('../controllers/newParkController'),
  '/parks/date/:date': require('../controllers/getParkByDateController'),

  '/employee/list': require('../controllers/getEmployeeListController'),
  '/employee': require('../controllers/newEmployeeController'),
  '/employee/:id': require('../controllers/getEmployeeByIdController')

};
/*
 '/park': require('../controllers/newParkController'),
 '/park/:id': require('../controllers/updateListParkController'),
 '/park/:id': require('../controllers/deleteParkController')*/

module.exports = {
  //get park list
  '/park/list': require('../controllers/getParkListController'),

  //get park list by Id i.e 10 oe 1
  '/park/:id': require('../controllers/getParkController'),

  //get user if by employeeNumber
  '/park/user/:id': require('../controllers/getParkByUserIdController'),

  '/park/list/toAllocate/': require('../controllers/getParksToAllocateController'),
  '/park/list/allocated/': require('../controllers/getParksAllocatedController'),

  //create a new park
  '/park': require('../controllers/newParkController'),

  '/parks/date/:date': require('../controllers/getParkByDateController'),

  //get employee list
  '/employee/list': require('../controllers/getEmployeeListController'),

  //add a new employee
  '/employee': require('../controllers/newEmployeeController'),

  //get employee bye employeeCode (i.e "J5M140")
  '/employee/:id': require('../controllers/getEmployeeByIdController'),

  '/parks/:employeeCode/:allocationDate': require('../controllers/verifyParksController'),

  //generate list of parks
  '/parksGenerator/': require('../controllers/parksGeneratorController'),

  //update parks allocations
  '/parks/update/:parkNumber': require('../controllers/updateParkController')

};
/*
 '/park': require('../controllers/newParkController'),
 '/park/:id': require('../controllers/updateListParkController'),
 '/park/:id': require('../controllers/deleteParkController')*/

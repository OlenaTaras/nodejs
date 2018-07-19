const express = require( 'express' );
const router = express.Router();

const checkAuth = require( '../middleware/check-auth' );
const ClientController = require('../controllers/clients.controller');

/*
create new client
*  @api {post} /clients
*  @apiName CREATE_NEW_CLIENT
*  @apiDescription create new client
*  @apiParamExample {json} Request-Example:
*  {
*  "firstName": "Olena",
*  "lastName": "Taras,
*  "groupId": "12345"
*  }
 */
router.post( '/', checkAuth, ClientController.CREATE_NEW_CLIENT);

/*
* @api {get} /clients?groupId=5ae719abdf3653098f6e230f
* @apiName GET_CLIENTS_INFO
* @apiDescription get all clients for chosen group or get information for chosen client
* @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 OK
* {"count": 1,
    "result": [
        {
            "personalInfo": {
                "firstName": "Olena",
                "lastName": "Taras"
            },
            "_id": "5ae8c1cccce0485bcbe9c5da",
            "group": {
                "name": "third created by taras",
                "_id": "5ae719abdf3653098f6e230f",
                "trainer": {
                    "_id": "5ae70b5a8c521b04c067b30f",
                    "email": "taras@taras.com"
                },
                "__v": 0
            },
            "__v": 0
        }
  }
  * @api {get} http://localhost:8000/clients?clientId=5ae78288e4ce26164602d096
 */
router.get( '/', checkAuth, ClientController.GET_CLIENTS_INFO);

/*
find client by query
@param {string} firstName or lastName
 */
//TODO: is not working
router.get('/search', checkAuth, ClientController.FIND_CLIENT_BY_QUERY);
/*
* @api {delete} /clients/_id=5ae70c098c521b04c067b312
* @apiDescription remove client by idawq
 */
router.delete('/', checkAuth, ClientController.REMOVE_CLIENT_BY_ID);
module.exports = router;

const express = require( 'express' );
const router = express.Router();

const ClientDataController = require('../controllers/clientData.controller');
const checkAuth = require( '../middleware/check-auth' );

/*
* @api {post} /clientData
* @apiDescription add data to chosen client
* @apiPermission loginTrainer
* @apiExample {json} {
*   "clientId": "5ae70c098c521b04c067b312",
*   "date": "" //default Date.now(),
*   "weight": "60",
*   "waist": "60",
*   "thighs": "90",
*   "height": "165",
*   "password": "olena"
* }
 */
router.post( '/', checkAuth, ClientDataController.ADD_NEW_DATA_TO_CLIENT);

/*
* @api {get} /clientData?clientId=
* @apiDescription return all data be chosen client
* @apiSuccessExample {json} Success-Response:
*{
    "result": [
        {
            "results": [
                {
                    "date": "2018-05-03T08:48:03.558Z",
                    "_id": "5aeaccf1558d03cd6bf7462e",
                    "weight": 98
                }
            ],
            "_id": "5aeaccf1558d03cd6bf7462c",
            "client": {
                "_id": "5aeab4970820f4c7a60a03d7",
                "group": {
                    "name": "Olha updated group",
                    "_id": "5ae7779a5dba1313b9c55618",
                    "trainer": null
                },
                "firstName": "Olena",
                "lastName": "Taras",
            },
        }
    ]
}
 */
router.get( '/', checkAuth, ClientDataController.GET_ALL_CLIENT_DATA );

module.exports = router;

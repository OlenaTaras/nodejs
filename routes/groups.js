const express = require( 'express' );
const router = express.Router();

const checkAuth = require( '../middleware/check-auth' );
const GroupsController = require('../controllers/groups.controller');

/*
* @api {post} /groups
* @apiName CREATE_NEW_GROUP
* @apiDescription create a new group for current trainer
 */
router.post( '/', checkAuth,  GroupsController.CREATE_NEW_GROUP);

/*
* @api {put} groups/?_id=123456
* @apiName UPDATE_EXISTING_GROUP
* @apiDescription update fields that was sent in req body for chosen group by id
  */
router.put( '/', checkAuth, GroupsController.UPDATE_EXISTING_GROUP);

/*
* @api {get} /groups
* @apiName GET_GROUPS_FOR_TRAINER
* @apiDescription return all or chosen by id groups for current trainer
* @apiSampleRequest http://localhost:8000/groups?_id=123456
 */
router.get( '/', checkAuth, GroupsController.GET_GROUPS_FOR_TRAINER);

/*
* @api {delete}
* @apiName REMOVE_SELECTED_GROUP
* @apiDescription remove group by id
* @apiSampleRequest http://localhost:8000/groups?_id=123456
  */
router.delete( '/', checkAuth,  GroupsController.REMOVE_SELECTED_GROUP );

/*
* @api {get} groups/search
* @apiName SEARCH_GROUP
* @apiDescription search groups by any params, which are passing in query
* @apiSampleRequest http://localhost:8000/groups/search?name=Olh
 */
router.get( '/search', checkAuth, GroupsController.SEARCH_GROUP);

module.exports = router;

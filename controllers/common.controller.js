const lodash = require( 'lodash' );

    module.exports.QUERY_BY_ID = ( reqQuery ) => {
    return reqQuery ? lodash.mapKeys( reqQuery, ( key ) => {
        return '_id'
    } ) : {};
};
    module.exports.QUERY_BY_REGEX = (reqQuery ) => {
    return reqQuery ? lodash.mapValues( reqQuery, ( value ) => {
        return new RegExp( value )
    } ) : {};
};
/**
 * Created by neo on 2017/4/4.
 */
/**
 *
 * Created by neo on 2017/3/7.
 */
var _ = require('lodash');
var logger = require('log4js').getLogger('json-map');

function getClazzNameOfObjectArray(obj) {
    if (_.isObject(obj)) {
        var keys = _.keys(obj);
        if (keys.length == 1 && _.isArray(obj[keys[0]])) {
            return keys[0];
        }
    }
    return false;
}

function jsonMap(obj, clazzName, clazzMaps) {

    function parseOneClazz(obj, clazzName) {
        var clz = clazzMaps[clazzName];
        var result = new clz();
        _.each(_.keys(obj), function (key) {
                if (obj[key] == undefined) {
                    logger.warn(key, 'is empty');
                }
                if (!result.hasOwnProperty(key)) {
                    logger.warn(key, 'is not in ', clazzName);
                }
                var subClzName = getClazzNameOfObjectArray(obj[key]);
                if (subClzName == false) {
                    if (_.isObject(obj[key])) {
                        result[key] = parseOneClazz(obj[key], key);
                    } else result[key] = obj[key];
                } else {
                    result[key] = _.map(obj[key][subClzName], function (subClzObj) {
                        return parseOneClazz(subClzObj, subClzName)
                    })
                }
            }
        );
        return result;
    }

    return parseOneClazz(obj, clazzName)

}

module.exports = jsonMap;
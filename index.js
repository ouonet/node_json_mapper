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
        var clz = _.isFunction(clazzName) ? clazzName : clazzMaps[clazzName];
        var result = new clz();
        _.each(_.keys(obj), function (key) {
                var propValue = obj[key];
                if (propValue == undefined) {
                    logger.trace(key, 'is empty');
                }
                if (!result.hasOwnProperty(key)) {
                    logger.trace(key, 'is not in ', clazzName);
                }
                var subClzName = getClazzNameOfObjectArray(propValue);
                if (subClzName == false) {
                    if (_.isArray(propValue) && clazzMaps.hasOwnProperty(key)) {
                        result[key] = _.map(propValue, function (oneObj) {
                            return parseOneClazz(oneObj, key);
                        })
                    } else if (_.isObject(propValue) && !_.isArray(propValue)) {
                        result[key] = parseOneClazz(propValue, key);
                    } else  result[key] = propValue;
                } else {
                    result[key] = _.map(propValue[subClzName], function (subClzObj) {
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
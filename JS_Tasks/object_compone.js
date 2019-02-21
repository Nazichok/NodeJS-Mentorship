'use strict'

/**
 * Compones arrays of objects by id or third param
 * @param {array} targetArr
 * @param {array} addedObj
 * @param {string} componeField
 */
function componeObj(targetArr, addedObj, componeField) {
  let key = componeField ? componeField : 'id';
  return targetArr.map(el => {
    let result = Object.assign({}, el);
    let descript = addedObj.find(descr => el[key] === descr[key]);
    if (descript) {
      result.discovery = descript;
    }
    return result;
  });
}

module.exports = componeObj;

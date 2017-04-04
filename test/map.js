/**
 * Created by neo on 2017/4/4.
 */
'use strict';
const chai = require('chai');
const Department = require('./Department');
const Person = require('./Person');
const jsonMap = require('../index');
var map1 = {
    department: Department,
    person: Person,
    persons: Person
};
var obj = {
    id: 1,
    name: undefined,
    location: 'town1',
    isMale:true,
    persons: {
        person: [
            {
                id: 1,
                age: 10,
                name: 'bob'
            },
            {
                id: 2,
                age: 20,
                name: 'tom'
            }
        ]
    }
};
var obj2 = {
    id: 1,
    name: undefined,
    location: 'town1',
    persons: [
        {
            id: 1,
            age: 10,
            name: 'bob',
            isMale:true,
        },
        {
            id: 2,
            age: 20,
            name: 'tom'
        }
    ]
};
chai.should();
describe('map1', function () {
    it('department', function () {
        var jsonString = JSON.stringify(obj2);
        console.log(jsonString);
        var result = jsonMap(JSON.parse(jsonString), Department, map1);
        console.log(result);
    })
});
const express = require('express')
const Joi = require('@hapi/joi')

const server = express()
server.use(express.json())
server.get("/courses/all", getAll)
server.get("/courses/get/:id", getCourse)
server.put("/courses/add", addCourse)
server.delete("/courses/delete/:id", deleteCourse)

server.listen(3001, () => {
    console.log("Server started on port 3001.")
})

var allCourses = [{ id: 1, name: 'OS', price: 20 },
{ id: 2, name: 'Network', price: 30 },
{ id: 4, name: 'Nodejs', price: 100 },]

//Returns all courses
function getAll(req, res) {
    res.send(allCourses)
}

function getCourse(req, res) {
    const schema = Joi.object().keys({
        id: Joi.number().min(1)
    })
    //console.log(req.params)
    let result = Joi.validate(req.params, schema)
    console.log(result)
    if (result.error) {
        sendResponse(res, 200, true, "Invalid input")
        return
    } else {
        let retValue = findMatchingCourse(result.value.id)
        console.log(retValue)

        if (retValue) {
            sendResponse(res, 200, false, "Success", retValue)
        } else {
            sendResponse(res, 200, true, "Not Found")
        }
        return
    }
}

function findMatchingCourse(toFind) {
    return allCourses.find((item) => {
        return item.id === toFind
    })
}

function addCourse(req, res) {
    const schema = Joi.object().keys({
        id: Joi.number().min(1).required(),
        name: Joi.string().min(3).max(50).required(),
        price: Joi.number().min(0).required()
    })
    //console.log(req)
    let result = Joi.validate(req.body, schema)
    console.log(result)
    if (result.error) {
        sendResponse(res, 200, true, "Invalid input")
    } else {
        let existingCourse = findMatchingCourse(result.value.id)
        if (existingCourse)
            sendResponse(res, 200, true, "Course already exists.")
        else {
            allCourses.push({ id: result.value.id, name: result.value.name, price: result.value.price })
            sendResponse(res, 200, false, "Successfully added new course.")
        }
    }
}

function deleteCourse(req, res) {
    const schema = Joi.object().keys({
        id: Joi.number().min(1)
    })
    //console.log(req.params)
    let result = Joi.validate(req.params, schema)
    console.log(result)
    if (result.error) {
        sendResponse(res, 200, true, "Invalid input")
        return
    } else {
        let isFound = false
        for (index = 0; index < allCourses.length; index++) {
            if (allCourses[index].id === result.value.id) {
                allCourses.splice(index, 1)
                isFound = true
                break
            }
        }
        console.log(allCourses)
        if (isFound)
            sendResponse(res, 200, false, "Successfully deleted course.")
        else
            sendResponse(res, 200, true, "Course not found.")
    }
}

function sendResponse(res, statusCode, isError, message, body) {
    let response
    if (isError) {
        response = { msgTyp: "E", message: message }
    } else {
        response = { msgTyp: "S", message: message, data: body }
    }
    //res.removeHeader('X-Powered-By')
    res.statusCode = statusCode
    res.send(response)
}
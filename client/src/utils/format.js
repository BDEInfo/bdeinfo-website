import dateformat from 'dateformat'
import React from 'react'

export function formatDate (date) { return dateformat(date, 'dd/mm à HH:MM') }

export function formatJSONResponse (object) {
    object = object?.data || object
    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            object[i] = formatJSONResponse(object[i])
        }
        return object
    } else {
        if (!object || !object.attributes) return object
        for (const attribute of Object.keys(object.attributes || {})) {
            if (object.attributes[attribute]?.data)
                object.attributes[attribute] = formatJSONResponse(object.attributes[attribute])
        }
        object.attributes.id = object.id
        return object.attributes
    }
}

export function escapeNewLine (string) {

    if (!string) return "⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀"
    return string.split('\n').map((item, index) => {
        return (index === 0) ? item : [<br key={index} />, item]
    })
}

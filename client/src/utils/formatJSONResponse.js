export default function formatJSONResponse (object) {

    object = object.data || object
    if (Array.isArray(object)) {
        for (let i = 0; i < object.length; i++) {
            object[i] = formatJSONResponse(object[i])
        }
        return object
    } else {
        for (const attribute of Object.keys(object.attributes)) {
            if (object.attributes[attribute]?.data) 
                object.attributes[attribute] = formatJSONResponse(object.attributes[attribute])
        }
        object.attributes.id = object.id
        return object.attributes
    }
}
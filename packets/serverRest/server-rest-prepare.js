module.exports.prepare_profile = function (data){
    if ("tag" in data && !("name" in data))
    return {"status": 200, "error": 1, "message": "Profile not found!"}

    result = Object.assign({}, data)
    result["status"] = 200
    return result
}

module.exports.prepare_clan = function (data){
    result = Object.assign({}, data)
    result["status"] = 200
    return result
}

module.exports.prepare_top_players = function (data){
    result = Object.assign({}, data)
    result["status"] = 200
    return result
}

module.exports.prepare_top_clans = function (data){
    result = Object.assign({}, data)
    result["status"] = 200
    return result
}

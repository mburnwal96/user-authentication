const greetingsAPI = function(req, res, next){
    return res.send("Greetings From Node");
}

const greetings = function(req, res, next){
    return "Hello World"
}
 module.exports = { greetingsAPI, greetings}
/**
 * module.exports = {
    greetingsAPI : function(req, res, next){
        return res.send("Greetings From Node");
    }
}

module.exports = {
    greetings : function(req, res, next){
        return "Hello World"
    }
}
 */
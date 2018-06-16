const utils = require('../utils')


var getMethodById = (methods, id) => {
    for( var i = 0; i < methods.length; i++){
        if( methods[i].execute_id == id)
            return methods[i]
    }
}

module.exports = async function () {
    while(true){
        (async() => {
            var executingMethods = []
            for(var i = 0; i < 25; i++){
                if( this.methods.length > 0)
                    executingMethods.push( this.methods.shift() )  
            }
            if( executingMethods.length > 0 ){
                    var codeStrings = []

                    executingMethods.forEach( (method) => {
                        codeStrings.push(`\"${method.execute_id}\": API.${method.method_name}(${JSON.stringify(method.options)})`)
                    })

                    var { response, execute_errors, error } = await this.api('execute', { 
                        code: `return { ${codeStrings.join(',\n')} };`
                    }) 
                    Object.entries(response).forEach( element => {
                        if( element[1] !== false) {
                            this.executePromises[element[0]].resolve(element[1])
                            delete this.executePromises[element[0]]
                        }
                    });
                    var tempMethods = Object.entries(this.executePromises)
                    
                    if( execute_errors != undefined && execute_errors){
                        for( var i = 0; i < tempMethods.length; i++){
                            var method = getMethodById(executingMethods, tempMethods[i][0])
                            method.options['v'] = this.settings.v
                            method.options['oauth'] = 1
                            method.options['method'] = method.method_name
                            execute_errors[i].request_params = Object.entries(method.options).map( e => {
                                return {key: e[0], value: e[1] }
                            })
                        }
                        Object.entries(execute_errors).forEach( element => {
                            if( element.method != 'execute')
                                Object.entries( this.executePromises).forEach( (prom) => {
                                    prom[1].reject(element[1])
                                })
                        });
                    }
                
                
            }
        })()
        await utils.delay(this.settings.executePause)
    }
        
}
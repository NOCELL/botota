module.exports = async function (method_name, options = {}) {
    if(!method_name){
        throw new Error('Need method\'s name for execute API calling!')
    }
    if( method_name === 'execute'){
        var { response, error} = await this.api('execute', options)
        if( error )
            throw new erorr(error)
        return response
    }
    var execute_id = `method${this.execute_counter++}`
    var executePromise = new Promise( (resolve,reject) => {
        this.executePromises[execute_id] = { resolve, reject}
        setTimeout( resolve, this.settings.executeTimeout * 1000)
    })
    this.methods.push({
        method_name,
        options,
        execute_id
    })
    return executePromise
}
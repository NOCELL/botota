module.exports = (delay) => {
    return new Promise( (r,o) =>{
        setTimeout( r, delay)
    })
}
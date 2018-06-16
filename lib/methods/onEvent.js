module.exports = function (event_name, callback) {
    this.actions.events.push({
        event_name,
        callback
    })
}
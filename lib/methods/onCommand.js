module.exports = function (command, callback) {
    this.actions.commands.push({
        command,
        callback
    })
}
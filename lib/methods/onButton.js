module.exports = function (button, callback) {
    this.actions.buttons.push({
        button,
        callback
    })
}
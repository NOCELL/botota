module.exports = async function () {
    return (await this.execute('groups.getById'))[0].id
}
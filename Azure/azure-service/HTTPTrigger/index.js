module.exports = function (context, data) {
    context.log('GitHub Webhook triggered!', data.comment.body);
    context.res = { body: 'New GitHub pusht: ' + data.comment.body };
    context.done();
};
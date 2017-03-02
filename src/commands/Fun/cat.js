const got = require('got');

exports.getCat = (callback) => {
    got('http://www.random.cat/meow').then(res => {
        try {
            callback(undefined, JSON.parse(res.body).file);
        } catch (err) {
            callback(err);
        }
    }).catch(callback);
};

exports.run = function (bot, msg) {
    msg.edit(':arrows_counterclockwise:');
    this.getCat((err, res) => {
        if (err) {
            console.error(err);
            return msg.error();
        }

        msg.channel.sendFile(res).then(() => msg.delete()).catch(err2 => {
            console.error(err2);
            msg.error('Failed to send the file!');
        });
    });
};

exports.info = {
    name: 'cat',
    usage: 'cat',
    description: 'Shows you pictures of random cats'
};
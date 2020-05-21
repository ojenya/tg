const telegraf = require('telegraf')
const data = require('./data')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const Scene = require('telegraf/scenes/base')
const { leave } = Stage
const stage = new Stage()
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://j3nqa:093zheka4067@cluster0-ksudn.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });



var request = require("request")

var url = "http://raspmath.isu.ru/getSchedule"
const SocksAgent = require('socks5-https-client/lib/Agent');
const socksAgent = new SocksAgent({
    socksHost: data.proxy.host,
    socksPort: data.proxy.port,
    socksUsername: data.proxy.login,
    socksPassword: data.proxy.psswd,
});
const bot = new telegraf(data.token, {
    telegram: { agent: socksAgent }
});

const getGroup = new Scene('getGroup')
stage.register(getGroup)
const getGroupM = new Scene('getGroupM')
stage.register(getGroupM)
const getStage = new Scene('getStage')
stage.register(getStage)
const getSchedule = new Scene('getSchedule')
stage.register(getSchedule)
const getDay = new Scene('getDay')
stage.register(getDay)
const getDayCurr = new Scene('getDayCurr')
stage.register(getDayCurr)
var day = '';
var group = '';


bot.use(session())
bot.use(stage.middleware())

bot.start((ctx) => {
    ctx.reply(
        'Для того чтобы получить расписание нужно указать группу и выбрать день недели', {
            reply_markup: {
                keyboard: [
                    ['️🤡Бакалавриат', '🤓Магистратура']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }
    )

    ctx.scene.enter('getStage')
})

bot.hears('️◀️ Назад', (ctx) => {
    ctx.reply(
        'Для того чтобы получить расписание нужно указать группу и выбрать день недели', {
            reply_markup: {
                keyboard: [
                    ['️🤡Бакалавриат', '🤓Магистратура']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }
    )
    ctx.scene.enter('getStage')
})

getStage.hears('️🤡Бакалавриат', async(ctx) => {
    ctx.reply(
        'Осталось выбрать курс и группу', {
            reply_markup: {
                keyboard: [
                    ['️🤡Первач', '🤓Двач'],
                    ['️👽Трич', '😈Форч'],
                    ['◀️ Назад']

                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )
    await ctx.scene.leave('getStage')
    ctx.scene.enter('getGroup')
})


getStage.hears('🤓Магистратура', async(ctx) => {
    ctx.reply(
        'Осталось выбрать курс и группу', {
            reply_markup: {
                keyboard: [
                    ['️🤡Первач', '🤓Двач'],
                    ['◀️ Назад']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )
    await ctx.scene.leave('getStage')
    ctx.scene.enter('getGroupM')
})
getGroup.hears('◀️ Назад', async(ctx) => {
    ctx.reply(
        'Для того чтобы получить расписание нужно указать группу и выбрать день недели', {
            reply_markup: {
                keyboard: [
                    ['️🤡Бакалавриат', '🤓Магистратура']

                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )
    ctx.scene.enter('getStage')
})
getGroupM.hears('◀️ Назад', async(ctx) => {
    ctx.reply(
        'Для того чтобы получить расписание нужно указать группу и выбрать день недели', {
            reply_markup: {
                keyboard: [
                    ['️🤡Бакалавриат', '🤓Магистратура']

                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )
    ctx.scene.enter('getStage')
})
getDay.hears('◀️ Назад', async(ctx) => {
    ctx.reply(
        'Для того чтобы получить расписание нужно указать группу и выбрать день недели', {
            reply_markup: {
                keyboard: [
                    ['️🤡Бакалавриат', '🤓Магистратура']

                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )
    ctx.scene.enter('getStage')
})



//надо подгрузить из бд группы
getGroup.hears('️🤡Первач', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];

        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)


        });

        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "1" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroup')

    ctx.scene.enter('getDay')

})
getGroupM.hears('️🤡Первач', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];

        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)

            // bot.sendMessage(element.user_id, "test");
            // console.log(element.user_id)
        });

        console.log(arr)
        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "5" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroupM')

    ctx.scene.enter('getDay')

})


getGroup.hears('🤓Двач', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];


        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)

        });

        console.log(arr)
        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "2" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroup')

    ctx.scene.enter('getDay')

})


getGroupM.hears('🤓Двач', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];

        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)
        });

        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "6" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroup')

    ctx.scene.enter('getDay')

})

getGroup.hears('️👽Трич', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];
        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)
        });

        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "3" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroup')

    ctx.scene.enter('getDay')

})

getGroup.hears('😈Форч', async(ctx) => {
    function send_course(group) {
        arr = [];
        array = [];

        group.forEach(element => {
            array = [];
            array.push(element.group_id)
            arr.push(array)

        });

        console.log(arr)
        ctx.reply(
            'Выбери группу:', {
                reply_markup: {
                    keyboard: arr,
                    resize_keyboard: true,
                    one_time_keyboard: true
                }
            }

        )

    }

    client.connect(err => {
        const collection = client.db("schedule").collection("group");
        // perform actions on the collection object

        collection.find({ course: "4" }).toArray(function(err, results) {
            send_course(results);
        });
        client.close();
    });

    await ctx.scene.leave('getGroup')

    ctx.scene.enter('getDay')

})

getDay.on('text', async(ctx) => {
    group = ctx.message.text

    ctx.reply(
        'Выбери день', {
            reply_markup: {
                keyboard: [
                    ['Понедельник', 'Вторник'],
                    ['Среда', 'Четверг'],
                    ['Пятница', 'Суббота'],
                    ['Сменить группу']
                ],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        }

    )

    ctx.scene.enter('getSchedule')
})

getSchedule.hears('Сменить группу', (ctx) => {
    ctx.reply('Нажми на /start')

})

getSchedule.hears(['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'], async(ctx) => {
    day = ctx.message.text

    request({
        url: url,
        json: true
    }, async function(error, response, body) {
        body.sort(function(obj1, obj2) {
            // Сортировка по возрастанию
            return obj1.pair_start_time - obj2.pair_start_time;
        });
        if (!error && response.statusCode === 200) {
            // Print the json response

            for (let i = 0; i < body.length; i++) {
                if (body[i].group_name === group) {
                    if (day === body[i].weekday) {

                        await ctx.reply(body[i].pair_start_time + "-" + body[i].pair_end_time + "\n" + body[i].subject_name + " " + "\n" + body[i].pair_type + "\n" + body[i].class_name + "\n" + body[i].week_type + "\n")

                    }


                }



            }
        }
        // console.log(day + "\n" + group + "\n")
        // console.log(body)
    })


    ctx.scene.enter('getSchedule')
})

bot.command('kp', async(ctx) => {
    for (let key of data.admins) {
        bot.telegram.sendMessage(
            key,
            `Новый запрос от преподавателя! \n\nID: [${ctx.from.id}](tg://user?id=${ctx.from.id})`, { parse_mode: 'markdown' }
        )
    }
    ctx.session = null


})
bot.command('ks', async(ctx) => {
    for (let key of data.admins) {
        bot.telegram.sendMessage(
            key,
            `Новый запрос от старосты! \n\nID: [${ctx.from.id}](tg://user?id=${ctx.from.id})`, { parse_mode: 'markdown' }
        )
    }
    ctx.session = null


})

bot.startPolling()
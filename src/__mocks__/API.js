const user = {
    id: 55,
    is_active: 1,
    username: 46086121,
    created_at: "2021-05-10T04:20:37.000Z",
    nickname: "Иван Фонтош"
};

export const API = {
    version: "1.0",

    USER: {
        LOGIN(username, password) {
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", username, password)
            return new Promise((resolve, reject) => {
                if (username === "moyecaf438@iludir.com" && password === "12345678") {
                    resolve(user);
                }
                else if (username === "moyecaf438@iludir.com1") {
                    reject({
                        response: {
                            data: {
                                msgUser: "Ошибка с API"
                            }
                        }
                    })
                }
                else {
                    reject({
                        response: {
                            data: {
                                msgUser1: ""
                            }
                        }
                    })
                }
            });
        },
    }
};
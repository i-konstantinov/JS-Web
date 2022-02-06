const bcrypt = require('bcrypt');

// функциите login & register връщат само true/false - успешно / неуспешно
// контролерите поемат по-нататъшните действия
module.exports = () => {
    const users = {
        'd7b5-31c4': {
            id: 'd7b5-31c4',
            username: 'peter',
            hashedPassword: '$2b$05$.RXLSlG8Ez.KwLA87uUms.pYtZCadXx.RTyS65XUIOlNvPk/c6b22'
        }
    };

    return (req, res, next) => {
        req.auth = {
            login,
            register
        }

        next();

        async function login(username, password) {
            const user = Object.values(users).find(u => u.username == username);

            const isUser = await bcrypt.compare(password, user.hashedPassword);
            if (isUser) {
                console.log("Successful Login");
                req.session.user = user;
                return true;
            } else {
                return false;
            }
        }

        async function register(username, password) {
            // ако, в списъка с информацията на юзерите, намери подаденото име -> връща false
            if (Object.values(users).find(u => u.username == username) != undefined) {
                return false;
            } else {
                const hashedPassword = await bcrypt.hash(password, 5);
                
                const id = 'xxxx-xxxx'.replace(/x/g, () => (Math.random() * 16 | 0).toString(16));
                
                const user = {
                    id,
                    username,
                    hashedPassword
                }
                users[id] = user;
    
                console.log('Registered user ' + username);

                req.session.user = user;
                // console.log(users)
                return true;
            }
        }
    }
}

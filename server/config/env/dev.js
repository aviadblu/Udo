module.exports = {
    pgConnectionStr: 'postgres://udo:udo1234@192.168.99.100/udo_db',
    port: 9090,
    app: null,
    configAuth: {
        facebookAuth: {
            clientID: '444085589117612',
            clientSecret: 'd5b622072a8d8a38551cc3d601ab3ad7',
            callbackURL: 'http://local.ec2-52-58-2-209.eu-central-1.compute.amazonaws.com:9090/auth/facebook/callback'
        },
        googleAuth: {
            clientID: '583113923049-inuvhr4ht5td989p9fio2p9o78muai33.apps.googleusercontent.com',
            clientSecret: 'I_5Q6HEBT8LgeGxfRcePBiWe',
            callbackURL: 'http://local.ec2-52-58-2-209.eu-central-1.compute.amazonaws.com:9090/auth/google/callback'
        }
    }
};
export default class User {
    constructor (MyConfig, TokenService, $log) {
        'ngInject';

        this.MyConfig = MyConfig;
        this.TokenService = TokenService;
        this.current = null;
        this.$log = $log;
        OAuth.initialize('4pUpbdH1nlAVqsMUM7lFyDY6CCA');
    }
    facebookLogin () {
        OAuth.popup('facebook')
            .done(result => {
                this.$log.log(result);
                this.TokenService.save(result.access_token);
                result.me()
                    .done(response => {
                        this.$log.log(response);
                        this.current = response;
                    });
            })
            .fail(err => {
                this.$log.log(err);
            });
    }
}

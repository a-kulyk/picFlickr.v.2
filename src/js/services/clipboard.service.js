import angular from 'angular';

export default class Clipboard {
    constructor ($compile, $rootScope, $document, MyConfig) {
        'ngInject';

        this.$compile = $compile;
        this.$rootScope = $rootScope;
        this.$document = $document;
        this.MyConfig = MyConfig;
    }

    toClipboard (element) {
        // const copyElement, body, clipboardElement, range;

        const copyElement = angular.element(`<span id="clipboardCopyId">${element}</span>`);
        const body = this.$document.find('body').eq(this.MyConfig.zero);

        body.append(this.$compile(copyElement)(this.$rootScope));

        const clipboardElement = angular.element(document.getElementById('clipboardCopyId'));
        const range = document.createRange();

        range.selectNode(clipboardElement[this.MyConfig.zero]);

        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);

        document.execCommand('copy');

        window.getSelection().removeAllRanges();

        copyElement.remove();
    }
}

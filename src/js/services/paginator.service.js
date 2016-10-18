export default class Paginator {
    constructor ($http, MyConfig) {
        'ngInject';

        this.MyConfig = MyConfig;
    }
    paginate (currPage, allPages) {
        const pageNav = [];

        if (currPage > this.MyConfig.one) pageNav.push({ text: '<< Back', number: currPage - this.MyConfig.one });

        for (let i = this.MyConfig.one; i <= allPages; i++)
            if (i === currPage)
                pageNav.push({ text: currPage, number: currPage, disabled: true });
            else
        if (i >= currPage - this.MyConfig.three && i <= currPage + this.MyConfig.three)
            pageNav.push({ text: i, number: i });

        if (currPage < allPages)
            pageNav.push({ text: 'Next >>', number: currPage + this.MyConfig.one });

        return pageNav;
    }
}

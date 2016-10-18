export default class FlickrService {
    constructor ($http, MyConfig, Paginator) {
        'ngInject';

        this.Paginator = Paginator;
        this.MyConfig = MyConfig;
        this.$http = $http;
    }

    search (request, page) {
        console.log('service: ', page);
        const params = {
            'api_key': this.MyConfig.API_KEY,
            'per_page': this.MyConfig.perPage,
            'safe_search': this.MyConfig.one,
            'privacy_filter': this.MyConfig.one,
            format: 'json',
            nojsoncallback: this.MyConfig.one,
            text: request || 'top rated',
            sort: 'relevance',
            page: page,
            method: 'flickr.photos.search'
        };

        this.allPhotos = [];

        return this.$http({ method: 'GET', url: this.MyConfig.base_url, params})
            .then(res => {
                this.allPhotos = res.data.photos.photo;
                const currPage = res.data.photos.page;
                const allPages = res.data.photos.pages;

                this.pageNav = this.Paginator.paginate(currPage, allPages);

                // return res.data;
            });
    }

    getPhotos () {
        return {
            photos: this.allPhotos,
            pageNav: this.pageNav
        };
    }
}

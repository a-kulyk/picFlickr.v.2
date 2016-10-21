export default class FlickrService {
    constructor ($http, $stateParams, $location, MyConfig, Paginator) {
        'ngInject';

        this.Paginator = Paginator;
        this.MyConfig = MyConfig;
        this.$http = $http;
        this.$location = $location;
        this.$stateParams = $stateParams;
        this.allPhotos = [];
        this.availableSizes = [
            {name: 'small', value: 'n', height: '200px'},
            {name: 'medium', value: 'z', height: '400px'},
            {name: 'large', value: 'c', height: '600px'},
            {name: 'larger', value: 'b', height: '800px'}
        ];
        this.size = this.availableSizes[MyConfig.one];
    }

    search (request, page = this.MyConfig.one) {
        console.log(request);
        const params = {
            'api_key': this.MyConfig.API_KEY,
            'per_page': this.MyConfig.perPage,
            'safe_search': this.MyConfig.one,
            'privacy_filter': this.MyConfig.one,
            format: 'json',
            nojsoncallback: this.MyConfig.one,
            text: request,
            sort: 'relevance',
            page,
            method: 'flickr.photos.search'
        };

        return this.$http({ method: 'GET', url: this.MyConfig.base_url, params })
            .then(res => {
                this.allPhotos = res.data.photos.photo;
                this.currPage = res.data.photos.page;
                this.allPages = res.data.photos.pages;
                this.pageNav = this.Paginator.paginate(this.currPage, this.allPages);
            });
    }

    getPhotos () {
        // if (this.allPhotos.length === 0) {
        //     this.search(this.$stateParams.search_request, 1)
        //         .then(() => {
        //             return { photos: this.allPhotos };
        //         });
        //     return;
        // }
        return {
            photos: this.allPhotos,
            pageNav: this.pageNav,
            currPage: this.currPage,
            allPages: this.allPages
        };
    }

    getLink () {
        const src = this.$stateParams;

        return `https://farm${src.farm}.static.flickr.com/${src.server}/${src.id}_${src.secret}_${this.size.value}.jpg`;
    }
    getAvailableSizes () {
        return this.availableSizes;
    }
    getSize () {
        return this.size;
    }
    setSize (size) {
        this.size = size;
    }
}

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
            {name: 'small', value: 'n', height: '250px'},
            {name: 'medium', value: 'z', height: '400px'},
            {name: 'large', value: 'c', height: '600px'}
        ];
        this.size = this.availableSizes[MyConfig.one];
    }

    search (request, page = this.MyConfig.one) {
        // console.log(request);
        const params = {
            'api_key': this.MyConfig.API_KEY,
            'per_page': this.MyConfig.perPage,
            'safe_search': this.MyConfig.one,
            'privacy_filter': this.MyConfig.one,
            method: this.MyConfig.photos_search,
            nojsoncallback: this.MyConfig.one,
            format: 'json',
            text: request,
            sort: 'relevance',
            page
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
    getUserInfo (id) {
        const params = {
            'api_key': this.MyConfig.API_KEY,
            'user_id': id,
            'method': this.MyConfig.people_search,
            'nojsoncallback': this.MyConfig.one,
            'format': 'json'
        };

        return this.$http({ method: 'GET', url: this.MyConfig.base_url, params })
            .then(res => res.data.person);
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

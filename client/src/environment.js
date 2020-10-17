export let baseApi = "";

if(process.env.NODE_ENV === 'development') {
    baseApi = 'http://localhost:4200/api/';
} else {
    baseApi = 'PRODUCTION URL';
}
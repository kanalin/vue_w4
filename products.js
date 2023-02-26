import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';
const site = 'https://vue3-course-api.hexschool.io/v2/';
const apiPath = 'niniin';

let productModal = {};
let delProductModal = {};
let myModal = '';
let deleteModal = '';

const app = createApp({
    data(){
        return{
            products: [],
            tempProducts: {
                imagesUrl: [],
            },
            isNew: false,   //確認是編輯或新增
            page: {},
        }
    },
    methods:{
        checkLogin(){
            const url = `${site}api/user/check`;
            axios.post(url)
                .then(res=>{
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.data.message);
                    window.location = `login.html`;
                })
        },
        getProducts(page = 1){  //參數預設
            const url = `${site}api/${apiPath}/admin/products/?page=${page}`;
            axios.get(url)
                .then(res => {
                    this.products = res.data.products;
                    this.page = res.data.pagination;
                    console.log(this.products);
                    console.log(res.data);
                })
                .catch(err=>{
                    alert(err.data.message)
                })
        },
        updateProduct(){
            let id = '';
            let method = 'post';
            let url = `${site}api/${apiPath}/admin/product`;
            if(!this.isNew){
                id = this.tempProducts.id;
                url = `${site}api/${apiPath}/admin/product/${id}`
                method = 'put';
            };
            axios[method](url, {data: this.tempProducts})
                .then(() => {
                    myModal.hide();
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.data.message)
                })
        },
        removeProduct(item){
            deleteModal.hide();
            const id = item.id
            const url = `${site}api/${apiPath}/admin/product/${id}`;
            axios.delete(url)
                .then(()=>{
                    this.getProducts();
                })
                .catch(err=>{
                    alert(err.data.message)
                })
        },
        //bootstrap方法
        openModal(status, item){
            this.isNew = status;
            // console.log(status);
            if(status){
                //帶入初始化資料
                this.tempProducts = {
                    imagesUrl: [],
                };
            }
            else{
                //帶入要編輯的資料
                // this.tempProducts = {...item};
                this.tempProducts = JSON.parse(JSON.stringify(item));
                if (!this.tempProducts.imagesUrl) {
                    this.tempProducts.imagesUrl = [];
                }
            }
            myModal.show();
        },
        openDeleteModal(item){
            this.tempProducts = {...item};
            deleteModal.show();
        }
    },
    components:{
        pagination,
    },
    mounted(){
        const cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('Token='))
        ?.split('=')[1];
        axios.defaults.headers.common['Authorization'] = cookieValue;
        this.checkLogin();
        myModal = new bootstrap.Modal('#productModal'); //實體化
        deleteModal = new bootstrap.Modal('#delProductModal');
    }
});

app.component('product-modal', {
    props: ['tempProducts', 'isNew', 'updateProduct'],
    template: '#product-modal-template',
})

app.mount('#app');
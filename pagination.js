// 流程
// - 建立一個元件
// - 建立元件、版型
// - 匯入元件
// - 元件的資料匯入
// - 元件與根元件的方法串接

export default {
    // props 練習
    props: ['pages', 'getProductInner'],
    template: `<nav aria-label="Page navigation example">
                    <ul class="pagination">
                    <li class="page-item" :class="{disabled : !pages.has_pre}">
                        <a class="page-link" href="#" aria-label="Previous" @click.prevent="getProductInner(pages.current_page - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="page in pages.total_pages" :key="page+page" :class="{active: page ===pages.current_page}">
                        <a class="page-link" href="#" @click.prevent="getProductInner(page)">{{page}}</a>
                    </li>
                    <li class="page-item" :class="{disabled : !pages.has_next}">
                        <a class="page-link" href="#" aria-label="Next" @click.prevent="getProductInner(pages.current_page + 1)">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    </ul>
                </nav>`,

    // emit 練習
    // props: ['pages'],
    // template: `<nav aria-label="Page navigation example">
    //                 <ul class="pagination">
    //                 <li class="page-item" :class="{disabled : !pages.has_pre}">
    //                     <a class="page-link" href="#" aria-label="Previous" @click.prevent="$emit('change-page', pages.current_page - 1)">
    //                     <span aria-hidden="true">&laquo;</span>
    //                     </a>
    //                 </li>
    //                 <li class="page-item" v-for="page in pages.total_pages" :key="page+page" :class="{active: page ===pages.current_page}">
    //                     <a class="page-link" href="#" @click.prevent="$emit('change-page', page)">{{page}}</a>
    //                 </li>
    //                 <li class="page-item" :class="{disabled : !pages.has_next}">
    //                     <a class="page-link" href="#" aria-label="Next" @click.prevent="$emit('change-page', pages.current_page + 1)">
    //                     <span aria-hidden="true">&raquo;</span>
    //                     </a>
    //                 </li>
    //                 </ul>
    //             </nav>`,
}
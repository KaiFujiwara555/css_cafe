var IMG_SLIDE_SHOW = IMG_SLIDE_SHOW || {};
var ACCESS_PROCESS = ACCESS_PROCESS || {};

// 特定の要素の配下imgタグのsrc要素を配列で取得する
IMG_SLIDE_SHOW.get_img_src = function(element) {
    const img_elements = element.getElementsByTagName('img');

    let img_hrefs = new Array(img_elements.length);
    for (let i=0; i<img_elements.length; i++) {
        img_hrefs[i] = img_elements[i].src;
    }

    return img_hrefs;
};

// 特定の要素のsrc要素を変更する
IMG_SLIDE_SHOW.set_img_src = function(element, src_url) {
    element.src = src_url;
};

// スライドショー管理用
IMG_SLIDE_SHOW.slide_show_timeout;
IMG_SLIDE_SHOW.slide_show_interval;
// スライドショー
IMG_SLIDE_SHOW.slide_show = function(slide_element, src_url_list, start_idx, slide_time, first_slide_time) {
    let slide_idx = start_idx;
    IMG_SLIDE_SHOW.set_img_src(slide_element, src_url_list[start_idx]);
    IMG_SLIDE_SHOW.slide_show_timeout = setTimeout(() => {
        IMG_SLIDE_SHOW.slide_show_interval = setInterval(() => {
            slide_idx++;
            if (slide_idx >= src_url_list.length) {
                slide_idx -= src_url_list.length;
            }

            src_url = src_url_list[slide_idx];
            IMG_SLIDE_SHOW.set_img_src(slide_element, src_url);
        }, slide_time)
    }, first_slide_time-slide_time);
}


// アクセス画面内の処理
ACCESS_PROCESS.main = function() {
    ACCESS_PROCESS.slide_element = document.getElementById('slide_show_img');
    ACCESS_PROCESS.near_images = document.getElementsByClassName('near_image');
    ACCESS_PROCESS.src_url_list = IMG_SLIDE_SHOW.get_img_src(document.getElementById('near_images'));

    window.addEventListener("load", (event) => {
        IMG_SLIDE_SHOW.slide_show(ACCESS_PROCESS.slide_element, ACCESS_PROCESS.src_url_list, 0, 3000, 3000);
    });

    for (let i=0; i<ACCESS_PROCESS.near_images.length; i++) {
        ACCESS_PROCESS.near_images[i].addEventListener("click", (click) => {
            clearInterval(IMG_SLIDE_SHOW.slide_show_interval);
            clearTimeout(IMG_SLIDE_SHOW.slide_show_timeout);
            IMG_SLIDE_SHOW.slide_show(ACCESS_PROCESS.slide_element, ACCESS_PROCESS.src_url_list, i, 3000, 5000);
        })
    }
};

ACCESS_PROCESS.main();

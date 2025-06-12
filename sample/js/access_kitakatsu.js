// varは古い書き方なので、constかletを使用すると良いですよ。(ES6以降の書き方です。)
// 名前空間の表現になっているはずですが、感覚はこれでGoodです！変数のスコープが限られている実感が得られていれば今は十分です！
const IMG_SLIDE_SHOW = IMG_SLIDE_SHOW || {};
const ACCESS_PROCESS = ACCESS_PROCESS || {};

// 特定の要素の配下imgタグのsrc要素を配列で取得する
IMG_SLIDE_SHOW.get_img_src = function(element) {
    const img_elements = element.getElementsByTagName('img');

    // imgタグが存在しない場合はエラーを投げるようにすると親切でしょう。もしくは、空の配列を返すようにしても良いでしょう。
    if (img_elements.length === 0) {
        throw new Error("指定された要素内にimgタグが存在しません");
    }

    // letは変更可能な変数を定義するためのキーワードです。constは変更不可な変数を定義するためのキーワードなので、代入の予定がなければconstを使用するのが良いでしょう。
    const img_hrefs = [];
    for (let i=0; i<img_elements.length; i++) {
        // srcが書かれていなかったり、消してしまったらここはエラーになるので、チェックを入れるのも良いでしょう。
        // srcを書かないケースがあればエラーを投げるようにすると開発者にとって親切な印象を出せます。
        if (img_elements[i].src) {
            // 配列ならpushを使っても良いかもしれません。
            img_hrefs.push(img_elements[i].src);
        } else {
            throw new Error("srcが定義されていません");
        }
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
// src_url_listはACCESS_PROCESS.src_url_listで取得できるはずなので、こちらで取ると引数を減らせて、保守性が上がるのでおすすめです。
IMG_SLIDE_SHOW.slide_show = function(slide_element, start_idx) {
    // 引数にとっていた以下はマジックナンバーになっているので、読みづらい原因になります。以下のように変数名で意味を表現するのが良いでしょう。
    const slide_time = 3000;
    const first_slide_time = 5000;

    let slide_idx = start_idx;
    IMG_SLIDE_SHOW.set_img_src(slide_element, ACCESS_PROCESS.src_url_list[start_idx]);
    IMG_SLIDE_SHOW.slide_show_timeout = setTimeout(() => {
        IMG_SLIDE_SHOW.slide_show_interval = setInterval(() => {
            slide_idx++;


            // 多分画像の繰りが最後まで行ったら最初に戻るようにしたいのだと思うので、単純に0で良いかもしれません。
            if (slide_idx >= ACCESS_PROCESS.src_url_list.length) {
                slide_idx == 0;
            }

            // 変数の定義はconstかletは必ず使うくらいだと良いでしょう。一旦変数に取ったのはGoodです！
            const src_url = ACCESS_PROCESS.src_url_list[slide_idx];
            IMG_SLIDE_SHOW.set_img_src(slide_element, src_url);
        }, slide_time)
        // ここは気になる！が今はこの実装でも十分だと思います！
    }, first_slide_time-slide_time);
}


// アクセス画面内の処理
ACCESS_PROCESS.main = function() {
    ACCESS_PROCESS.slide_element = document.getElementById('slide_show_img');
    ACCESS_PROCESS.near_images = document.getElementsByClassName('near_image');
    ACCESS_PROCESS.src_url_list = IMG_SLIDE_SHOW.get_img_src(document.getElementById('near_images'));

    // スライドのインデックスのデフォルト値
    const default_slide_idx = 0;

    // かなり細かいけどeventは使っていない変数になるはずなので、jsではそういった場合は「_」をつけておくと良いでしょう。(プロジェクトでルールがある時もあります！)
    window.addEventListener("load", (_event) => {
        // slide_showへの第3引数は「0」だとマジックナンバーに見えるので、読みづらさに影響します。なので変数で名前付けしたものを渡すと良いでしょう。
        IMG_SLIDE_SHOW.slide_show(ACCESS_PROCESS.slide_element, ACCESS_PROCESS.src_url_list, default_slide_idx);
    });

    for (let i=0; i<ACCESS_PROCESS.near_images.length; i++) {
        // こちらもclickは「_」をつけておくと良いでしょう。
        ACCESS_PROCESS.near_images[i].addEventListener("click", (_click) => {
            clearInterval(IMG_SLIDE_SHOW.slide_show_interval);
            clearTimeout(IMG_SLIDE_SHOW.slide_show_timeout);
            IMG_SLIDE_SHOW.slide_show(ACCESS_PROCESS.slide_element, ACCESS_PROCESS.src_url_list, i);
        })
    }
};


// ACCESS_PROCESS.main();
// ファイル上でそのまま実行するのも良いですが、ファイルを読み込んだタイミングで実行されてしまうので、htmlファイルのscriptタグ内で呼び出すのが一般的です。
// こうすれば、ファイルを読み込むタイミングと実行のタイミングを分けることができるので、より柔軟なコードになります。
// なので、以下のようにhtmlファイルのscriptタグ内で呼び出すと良いでしょう。

//   <link rel="js" href="../js/access.js">

//   <script>
//     ACCESS_PROCESS.main();
//   </script>
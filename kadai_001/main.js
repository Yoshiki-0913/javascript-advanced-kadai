 // 変数の初期化
 let untyped = '';
 let typed = '';
 let score = 0;
 
 // HTML要素の取得
 const untypedfield = document.getElementById('untyped');
 const typedfield = document.getElementById('typed');
 const wrap = document.getElementById('wrap');
 const start = document.getElementById('start');
 const count = document.getElementById('count');
 const scoreview = document.getElementById('score');

// テキストを格納する配列
  const textLists = [
    'Hello World','This is my App','How are you?',
    'Today is sunny','I love JavaScript!','Good morning',
    'I am Japanese','Let it be','Samurai',
    'Typing Game','Information Technology',
    'I want to be a programmer','What day is today?',
    'I want to build a web app','Nice to meet you',
    'Chrome Firefox Edge Safari','machine learning',
    'Brendan Eich','John Resig','React Vue Angular',
    'Netscape Communications','undefined null NaN',
    'Thank you very much','Google Apple Facebook Amazon',
    'ECMAScript','console.log','for while if switch',
    'var let const','Windows Mac Linux iOS Android',
    'programming'
  ];
 
 // ランダムテキスト表示
 const randomText = () => {
  typed = '';
  typedfield.textContent = typed;
  let random = Math.floor(Math.random() * textLists.length);
  untyped = textLists[random];
  untypedfield.textContent = untyped;
};
 // 入力の判定
 const keyPress = e => {
  
  // ミスタイプ
  if(e.key !== untyped.substring(0, 1)) {
    wrap.classList.add('mistyped');
      // 100ms後に背景色を元に戻す
      setTimeout(() => {
        wrap.classList.remove('mistyped');
      }, 100);
    return;
  }

  // クリアタイプ
  wrap.classList.remove('mistyped');
  typed += untyped.substring(0, 1);
  untyped = untyped.substring(1);
  score +=1;
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  scoreview.textContent = score;

    // 新しいテキストを表示
    if(untyped === '') {
      randomText();
    }
 };
 
 // タイピングスキルのランクを判定
 const rankCheck = score => {};
 
 // ゲーム終了
 const gameOver = id => {
    clearInterval(id);
    console.log('ゲーム終了!');
 };
 
 // カウントダウンタイマー
 const timer = () => {
     // タイマー部分のHTML要素（p要素）を取得する
     let time = count.textContent;
 
     const id = setInterval(() => {
   
       // カウントダウンする
       time--;
       count.textContent = time;
   
       // カウントが0になったらタイマーを停止する
       if(time <= 0) {
        gameOver(id);
       }
     }, 1000);
 };

  // ゲームスタート時の処理
  start.addEventListener('click', () => {
   // カウントダウンタイマー開始
    timer();
    // ランダムテキスト表示
    randomText();
  
    // 「スタート」ボタン非表示
    start.style.display = 'none';
    // スコア表示
    scoreview.textContent = score;
    // キーボードイベント処理
    document.addEventListener('keypress', keyPress);
  });
  
  untypedfield.textContent = 'スタートボタンで開始';

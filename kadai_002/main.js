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
  score ++;
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  scoreview.textContent = score;

    // 新しいテキストを表示
    if(untyped === '') {
      randomText();
    }
 };
 
// タイピングスキルのランクを判定
const rankCheck = score => {
  let text = '';
 
  // スコアに応じて変数textに格納する
  if(score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
  } else if(score < 200) {
    text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
  } else if(score < 300) {
    text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
  } else if(score >= 300) {
    text = `あなたのランクはSです。\nおめでとうございます!`;    
  }
 
  // 生成したメッセージと一緒に文字列を返す
  return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
  clearInterval(id);
  setTimeout(()=>{
    const result = confirm(rankCheck(score));},10);

  // OKボタンクリックでリロード
  if(result == true) {
    window.location.reload();
  }
};
 
 // カウントダウンタイマー
 const timer = () => {
     // タイマー部分のHTML要素（p要素）を取得
     let time = count.textContent;
 
     const id = setInterval(() => {
   
       // カウントダウン
       time--;
       count.textContent = time;
   
       // カウントが0になったらタイマーを停止
       if(time <= 0) {
        setTimeout(()=>{
          document.removeEventListener('keypress', keyPress); 
          typedfield.textContent = '';
          untypedfield.textContent = 'タイムアップ！';
          gameOver(id);
         },10);
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
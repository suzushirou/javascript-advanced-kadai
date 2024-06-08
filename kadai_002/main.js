// 変数の初期化
let untyped = '';
let typed = '';
let score = 0;

// 定数untypedfieldにID:untypedを代入
const untypedfield =
  document.getElementById('untyped');
const typedfield =
  document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
// タイプ数
const countUp = document.getElementById('countup');
// タイムアップ表示要素
const timeUp = document.getElementById('timeup');


// 配列の文字を作成
const textList = [
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

// display text at random
const createText = ()=> {
// 正タイプした文字列をクリア
typed = '';
typedfield.textContent = typed;

let random = Math.floor(Math.random()*textList.length);

  untyped = textList[random];
  untypedfield.textContent = untyped;
};

// judge typed
const keyPress = e => {
  // 誤タイプの時
  if (e.key !== untyped.substring(0,1)) {
    wrap.classList.add('mistyped');
    // 0.1秒経過後に背景色をもとに戻す
    setTimeout(()=> {
      wrap.classList.remove('mistyped');
    }, 100);
    return;
  }
  //正タイプの時 
  // e.keyは字の判別をする
  score++;//スコアインクリメント
  wrap.classList.remove('mistyped');
  typed +=untyped.substring(0,1);
  untyped =untyped.substring(1);
  typedfield.textContent = typed;
  untypedfield.textContent = untyped;
  countUp.textContent = score;

  // テキストがなくなったら新しいテキストを表示
  if (untyped === '') {
    createText();
  }
};
  
// judge rank
const rankCheck = score => {
  //●●文字打てましたというメッセージを出す
  //ランクごとに異なるメッセージを表示するための変数[text]
  let text = '';
  //スコアごとに異なるメッセージを作成
  if (score < 100) {
    text = `あなたのランクはCです。\nBランクまであと${100-score}文字です`;
    } else if(score < 200) {
      text = `あなたのランクはBです。\nAランクまであと${200-score}文字です`;
    } else if(score < 200) {
      text = `あなたのランクはAです。\nSランクまであと${300-score}文字です`;
    } else if(score >= 300) {
      text = `あなたのランクはSです。\nおめでとうございます!`;
    }
  return `${score}文字打てました！\n${text}\n [OK] リトライ/ [キャンセル] 終了`;
};

// game end
const gameOver = id => {
  clearInterval(id);
  //ランクチェックとスコアを呼び出してダイアログに表示
  const result = confirm(rankCheck(score));

  //ダイアログでOKがクリックされたらリロード
  if(result == true) {
    window.location.reload();
  }
  //console.log('ゲーム終了‼');
};

// timer
const timer = ()=> {
  // p要素の中身「60」部分を取得
  let time = count.textContent;
  const id = setInterval(()=> {
    // count down
    time--;//←このハイフン２つは何？
    //p要素の「　」をカウントダウンされた数字に変更
    count.textContent = time;
    //数字が0になったらタイマーをクリア
    if (time <= 0) {
      typedfield.textContent = '';
      untypedfield.textContent = '';
      timeUp.textContent = 'タイムアップ！';
      setTimeout(()=> {
        gameOver(id);
      }, 500);
    }
  //1000mm秒でカウントする
  }, 1000);
};

// スタートボタンをクリックしたら
start.addEventListener('click', ()=> {
  //タイマー開始
  timer();
  // テキストをランダムに生成
  createText();
  // スタートボタンが非表示に
  start.style .display = 'none';
  // keyPressイベント処理
  document.addEventListener('keypress', keyPress);
});
untypedfield.textContent = 'スタートボタンで開始';

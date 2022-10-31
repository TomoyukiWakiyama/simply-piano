/**
 * 起動時に「Let's Play ~」をウェーブ
 * それが終わると鍵盤をドからホバーして流していく
 * 演奏が終わると初期画面（autoPlayTimeoutIdをnull
 * 演奏をランダムにする
 * 自動演奏中(autoPlayTimeoutId)がある場合、キーボードはリターンにする
 */
export default class Piano {
  displayElm: HTMLDivElement;
  displayTextElm: HTMLDivElement;
  keyboardElms: NodeListOf<Element>;
  autoPlayElm: HTMLButtonElement;
  timeoutId: NodeJS.Timeout;
  intervalId: NodeJS.Timeout;
  autoPlayTimeoutId: NodeJS.Timeout;
  constructor(public name: string) {
    this._init();
  }
  private _init() {
    // 表示するdivを取得
    this.displayElm = document.querySelector(".simplyPiano__display");
    // 表示するテキストを取得
    this.displayTextElm = document.querySelector(".simplyPiano__display-text");
    // 全てのキーボードを取得
    this.keyboardElms = document.querySelectorAll(".simplyPiano__keys")!;
    // 自動演奏ボタンを取得
    this.autoPlayElm = document.querySelector(".autoPlay__btn");
  }

  keyboardHandler() {
    this.keyboardElms.forEach((keyboard) => {
      keyboard.addEventListener(
        "click",
        function () {
          if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            console.log("clearTimeoutId: " + this.timeoutId);
          }
          let displayText = keyboard.firstElementChild.textContent;
          this.displayTextElm.textContent = displayText;
          this.displayElm.classList.add("inview");
          console.log(displayText);
          console.log("newTimeoutId: " + this.timeoutId);
          this._clearDisplay(1000);
        }.bind(this)
      );
    });
  }

  autoPlayTimeout(text: string, sec: number = 500, elm: string) {
    return new Promise(
      function (resolve) {
        this.autoPlayTimeoutId = setTimeout(
          function () {
            resolve();
            this.displayTextElm.textContent = text;
            console.log(this.autoPlayTimeoutId);
          }.bind(this),
          sec
        );
      }.bind(this)
    );
  }

  autoPlayHandler() {
    this.autoPlayElm.addEventListener(
      "click",
      async function () {
        if (this.autoPlayTimeoutId) {
          clearTimeout(this.autoPlayTimeoutId);
          console.log("clearautoPlayTimeoutId: " + this.autoPlayTimeoutId);

          this.displayTextElm.textContent = "Let's Play the Piano ♪";
          this.autoPlayTimeoutId = null;
          return;
        }
        await this.autoPlayTimeout("ド", 0);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ド");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ラ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ラ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");

        await this.autoPlayTimeout("ファ", 2000);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ド");

        await this.autoPlayTimeout("ソ", 2000);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");

        await this.autoPlayTimeout("ソ", 2000);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");

        await this.autoPlayTimeout("ド", 2000);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ド");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ラ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ラ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ソ");

        await this.autoPlayTimeout("ファ", 2000);
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ファ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ミ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("レ");
        await this.autoPlayTimeout("");
        await this.autoPlayTimeout("ド");
        await this.autoPlayTimeout("");
      }.bind(this)
    );
  }

  _clearDisplay(sec: number, text: string = "Let's Play the Piano ♪") {
    this.timeoutId = setTimeout(
      function () {
        this.displayTextElm.textContent = text;
        this.displayElm.classList.remove("inview");
      }.bind(this),
      sec
    );
  }

  printKeys() {
    console.log("clicked");
  }
}

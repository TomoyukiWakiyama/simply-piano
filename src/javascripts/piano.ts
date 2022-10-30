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
  decorationItemElms: NodeListOf<Element>;
  keyboardElms: NodeListOf<Element>;
  autoPlayElm: HTMLButtonElement;
  timeoutId: NodeJS.Timeout;
  intervalId: NodeJS.Timeout;
  autoPlayTimeoutId: NodeJS.Timeout;

  decorationInvervalId: NodeJS.Timeout;
  constructor(public name: string) {
    this._init();
  }
  private _init() {
    // 表示するdivを取得
    this.displayElm = document.querySelector(".display");
    // 表示するテキストを取得
    this.displayTextElm = document.querySelector(".display__heading");
    // 全てのキーボードを取得
    this.keyboardElms = document.querySelectorAll(".keyboard__keys")!;
    // 自動演奏ボタンを取得
    this.autoPlayElm = document.querySelector(".autoPlay__btn");

    this.decorationItemElms = document.querySelectorAll(".decoration__item");
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

  private _clearDisplay(sec: number, text: string = "Let's Play the Piano ♪") {
    this.timeoutId = setTimeout(
      function () {
        this.displayTextElm.textContent = text;
        this.displayElm.classList.remove("inview");
      }.bind(this),
      sec
    );
  }

  autoPlayHandler() {
    this.autoPlayElm.addEventListener(
      "click",
      function () {
        if (this.autoPlayTimeoutId) {
          clearTimeout(this.autoPlayTimeoutId);
          console.log("clearautoPlayTimeoutId: " + this.autoPlayTimeoutId);
          clearInterval(this.decorationInvervalId);
          this.displayTextElm.textContent = "Let's Play the Piano ♪";
          this.autoPlayTimeoutId = null;
          this.decorationInvervalId = null;
          return;
        }
        this._decoration();
        this._twinkleRecord();
      }.bind(this)
    );
  }

  private _decoration() {
    this.decorationInvervalId = setInterval(
      function () {
        console.log("decoration");
        // 1.8毎にsetInterval回して、2分の1でinviewをつけるようにする
        this.decorationItemElms.forEach((item) => {
          item.classList.remove("inview");
          let randomNum = Math.floor(Math.random() * 2 + 1);
          let addInviewBool = Boolean(randomNum % 2 === 0);
          if (addInviewBool) {
            console.log("addDecoration");
            item.classList.add("inview");
          }
        });
      }.bind(this),
      1400
    );
  }

  private _autoPlayTimeout(text: string, sec: number = 500, elm?: string) {
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

  async _twinkleRecord() {
    await this._autoPlayTimeout("ド", 0);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ラ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ラ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");

    // 2sec setTimeout Interval
    await this._autoPlayTimeout("ド", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
  }
}

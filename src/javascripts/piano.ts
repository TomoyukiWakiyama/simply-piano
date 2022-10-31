/**
 * 起動時に「Let's Play ~」をウェーブ
 * それが終わると鍵盤をドからホバーして流していく
 * 演奏が終わると初期画面（autoPlayTimeoutIdをnull
 * 演奏をランダムにする
 * 自動演奏中(autoPlayTimeoutId)がある場合、キーボードはリターンにする
 * 自動演奏が終わった後にinitを起動する
 */
export default class Piano {
  displayElm: HTMLDivElement;
  displayTextElm: HTMLDivElement;
  decorationStarItemElms: NodeListOf<Element>;
  decorationTulipItemElms: NodeListOf<Element>;
  decorationInvervalId: NodeJS.Timeout;
  keyboardElms: NodeListOf<Element>;
  autoPlayBtnElm: HTMLButtonElement;
  singleTapTimeoutId: NodeJS.Timeout;
  autoPlayTimeoutId: NodeJS.Timeout;
  autoPlayHeadingElm: HTMLElement;
  constructor(
    public recordItems: string[] = ["starRecord", "tulipRecord"] // public recordItems: string[] = ["tulipRecord"]
  ) {
    this._getElements();
  }
  private _getElements() {
    this.displayElm = document.querySelector(".display");
    this.autoPlayHeadingElm = document.querySelector(
      ".display__autoPlayHeading"
    );
    this.displayTextElm = document.querySelector(".display__heading");
    this.keyboardElms = document.querySelectorAll(".keyboard__keys")!;
    this.autoPlayBtnElm = document.querySelector(".autoPlay__btn");
    this.decorationStarItemElms = document.querySelectorAll(
      ".decoration__item-star"
    );
    this.decorationTulipItemElms = document.querySelectorAll(
      ".decoration__item-tulip"
    );
  }

  // singleTap

  singleTapHandle() {
    this.keyboardElms.forEach((keyboard) => {
      keyboard.addEventListener(
        "click",
        function () {
          if (!this._autoPlayingValidation()) return;
          this._singleTapShowDisplay(keyboard);
          this._singleTapClearDisplay(1000);
        }.bind(this)
      );
    });
  }

  private _autoPlayingValidation() {
    if (this.autoPlayTimeoutId) {
      return false;
    } else {
      return true;
    }
  }

  private _singleTapShowDisplay(keyboard) {
    if (this.singleTapTimeoutId) {
      clearTimeout(this.singleTapTimeoutId);
    }
    let displayText = keyboard.firstElementChild.textContent;
    this.displayTextElm.textContent = displayText;
    this.displayElm.classList.remove("inview");
    this.displayElm.classList.add("inview");
  }

  private _singleTapClearDisplay(
    sec: number,
    text: string = "Let's Play the Piano ♪"
  ) {
    this.singleTapTimeoutId = setTimeout(
      function () {
        this.displayTextElm.textContent = text;
        this.displayElm.classList.remove("inview");
      }.bind(this),
      sec
    );
  }

  // autoPlay

  autoPlayHandle() {
    this.autoPlayBtnElm.addEventListener(
      "click",
      function () {
        if (!this._autoPlayStop()) return;
        this._autoPlayDisplayButton();
        this._autoPlayRandom();
      }.bind(this)
    );
  }

  private _autoPlayStop() {
    if (this.autoPlayTimeoutId) {
      this._autoPlayInit();
      return false;
    } else {
      return true;
    }
  }

  private _autoPlayInit() {
    clearTimeout(this.autoPlayTimeoutId);
    this.autoPlayTimeoutId = null;
    clearInterval(this.decorationInvervalId);
    this.decorationInvervalId = null;
    this.displayTextElm.textContent = "Let's Play the Piano ♪";
    this.autoPlayBtnElm.textContent = "自動演奏";
    this.autoPlayHeadingElm.textContent = "";
    this.keyboardElms.forEach((key) => {
      key.classList.remove("inview");
    });
  }

  private _autoPlayRandom() {
    let recordTitle =
      this.recordItems[Math.floor(Math.random() * this.recordItems.length)];
    switch (recordTitle) {
      case "starRecord":
        this.starRecord();
        this._autoPlaydecoration("star");
        this._autoPlayDisplayHeading("star");
        break;
      case "tulipRecord":
        this.tulipRecord();
        this._autoPlaydecoration("tulip");
        this._autoPlayDisplayHeading("tulip");
        break;
    }
  }

  private _autoPlaydecoration(title: string) {
    let decorationItemElms: NodeListOf<Element>;
    switch (title) {
      case "star":
        decorationItemElms = this.decorationStarItemElms;
        break;
      case "tulip":
        decorationItemElms = this.decorationTulipItemElms;
        break;
    }
    this.decorationInvervalId = setInterval(
      function () {
        decorationItemElms.forEach((item) => {
          item.classList.remove("inview");
          let randomNum = Math.floor(Math.random() * 2 + 1);
          let addInviewBool = Boolean(randomNum % 2 === 0);
          if (addInviewBool) {
            item.classList.add("inview");
          }
        });
      }.bind(this),
      1400
    );
  }

  private _autoPlayDisplayHeading(title: string) {
    switch (title) {
      case "star":
        this.autoPlayHeadingElm.textContent = "自動演奏中です：きらきら星";
        break;
      case "tulip":
        this.autoPlayHeadingElm.textContent =
          "自動演奏中です：チューリップの歌";
        break;
    }
  }

  private _autoPlayDisplayButton() {
    this.autoPlayBtnElm.textContent = "演奏中です";
  }

  private _autoPlayTimeout(text: string, sec: number = 500) {
    return new Promise(
      function (resolve) {
        this.autoPlayTimeoutId = setTimeout(
          function () {
            resolve();
            this._autoPlayShowDisplay(text);
            this._autoPlayKeyboardDecoration(text);
          }.bind(this),
          sec
        );
      }.bind(this)
    );
  }

  private _autoPlayShowDisplay(text: string) {
    this.displayTextElm.textContent = text;
  }

  private _autoPlayKeyboardDecoration(keyboardText: string) {
    const keyboards = {
      ド: "do",
      レ: "re",
      ミ: "mi",
      ファ: "fa",
      ソ: "so",
      ラ: "ra",
      シ: "si",
    };

    let inviewKey = keyboards[keyboardText];
    this.keyboardElms.forEach((key) => {
      key.classList.remove("inview");
    });
    if (keyboardText) {
      let highligntKeyElm = document.querySelector(`.${inviewKey}`);
      highligntKeyElm.classList.add("inview");
    }
  }

  // Records

  async starRecord() {
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

    await this._autoPlayTimeout("ファ", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");

    await this._autoPlayTimeout("ソ", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");

    await this._autoPlayTimeout("ソ", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ソ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");

    await this._autoPlayTimeout("ド", 2000);
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

    await this._autoPlayTimeout("ファ", 2000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ファ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("", 0).then(
      function () {
        this._autoPlayInit();
      }.bind(this)
    );
  }

  async tulipRecord() {
    await this._autoPlayTimeout("ド", 0);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("ド", 1000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");

    await this._autoPlayTimeout("ソ", 1000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");

    await this._autoPlayTimeout("ド", 1000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("ド", 1000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");

    await this._autoPlayTimeout("ソ", 1000);
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("レ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ミ");
    await this._autoPlayTimeout("");
    await this._autoPlayTimeout("ド");

    await this._autoPlayTimeout("ソ", 1000);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ソ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ミ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ソ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ラ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ラ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ソ", 250);

    await this._autoPlayTimeout("ミ", 1000);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ミ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("レ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("レ", 250);
    await this._autoPlayTimeout("", 250);
    await this._autoPlayTimeout("ド", 250);
    await this._autoPlayTimeout("", 4000);
    await this._autoPlayTimeout("", 0).then(
      function () {
        this._autoPlayInit();
      }.bind(this)
    );
  }
}

export default class Piano {
  displayElm: HTMLDivElement;
  displayTextElm: HTMLDivElement;
  keyboardElms: NodeListOf<Element>;
  timeoutId: NodeJS.Timeout;
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
  }

  handleClick() {
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

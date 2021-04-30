class ButtonItem extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const href = this.getAttribute("href");
    const title = this.getAttribute("title");
    this.removeAttribute("title");
    let html = "";

    if (href) {
      html = this.linkHtml(title, href);
    } else {
      html = this.buttonHtml(title, href);
    }

    this.innerHTML = html;
  }

  getClasses() {
    const style = this.getAttribute("style");
    let classes = "";

    switch (style) {
      case "default":
        classes = this.classesStyleDefault();
        break;
      case "action":
        classes = this.classesStyleAction();
        break;
      case "ghost":
        classes = this.classesStyleGhost();
        break;
    }

    return this.classesBase().concat(classes);
  }

  linkHtml(title, href) {
    return `<a href="${href}" class="${this.getClasses().join(
      " "
    )}">${title}</a>`;
  }

  buttonHtml(title) {
    return `<button class="focus:outline-none cursor-default ${this.getClasses().join(
      " "
    )}">${title}</button>`;
  }

  classesBase() {
    return [
      "inline-flex",
      "items-center",
      "gap-2",
      "px-4",
      "py-1.5",
      "font-bold",
      "rounded",
      "fill-current",
    ];
  }

  classesStyleDefault() {
    return [
      "text-white",
      "border-2",
      "bg-blueGray-700",
      "border-black",
      "hover:bg-blueGray-800",
    ];
  }

  classesStyleAction() {
    return [
      "text-white",
      "bg-gradient-to-br",
      "from-navy-500",
      "via-navy-600",
      "to-navy-600",
      "hover:from-navy-600",
      "border",
      "border-navy-600",
    ];
  }

  classesStyleGhost() {
    return ["border-2", "border-gray-200", "hover:border-gray-400"];
  }
}

customElements.define("button-item", ButtonItem);

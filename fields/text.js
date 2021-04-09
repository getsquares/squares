class FieldText extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    //return ["active"];
  }

  connectedCallback() {
    const value = "test";
    this.innerHTML = `
      <input value="${value}" type="text" class="focus:outline-none p-2 w-80 border-2 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-1 focus:ring-offset-gray-100">
    `;

    this.onKeyup();
    this.onEnter();
    this.onEscape();

    updatePreview(this.querySelector("input").value, this);

    this.querySelector("input").select();
  }

  // On key up
  onKeyup() {
    this.querySelector("input").addEventListener("keyup", (e) => {
      updatePreview(e.currentTarget.value, this);
    });
  }

  onEnter() {
    this.querySelector("input").addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      e.preventDefault();
      leaveEdit();
      console.log("lvea");
    });
  }

  onEscape() {
    window.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      e.preventDefault();
      fieldClose();
    });
  }

  // Enter

  attributeChangedCallback(attr, oldValue, newValue) {
    /*if (attr != "active") return;
    if (oldValue !== newValue) {
      if (newValue == "true") {
        this.classList.remove("hidden");
      } else {
        this.classList.add("hidden");
      }
    }*/
  }
}

customElements.define("field-text", FieldText);

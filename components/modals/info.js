class ModalInfo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="flex flex-col flex-1 gap-6">
        <img-svg
          src="assets/icons/logo.svg"
          classes="h-8 text-lightBlue-600"
        ></img-svg>
        we rjiweor jweior jweior jwer iowejrio wejrweiojr weiorj weiorj
        weiorj iowerj weiorj weiorjwe

        <!-- Links -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">Links</h2>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://github.com/getsquares/squares"
                target="_blank"
                class="text-lightBlue-600 hover:underline"
                >Github</a
              >
            </li>
            <li>
              <a
                href="https://github.com/getsquares/squares"
                target="_blank"
                class="text-lightBlue-600 hover:underline"
                >Documentation</a
              >
            </li>
          </ul>
        </div>

        <!-- Dependencies -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">Dependencies</h2>
          <ul class="list-disc list-inside">
            <li>
              <a
                href="https://remixicon.com/"
                target="_blank"
                class="text-lightBlue-600 hover:underline"
                >Remixicon</a
              >
            </li>
            <li>
              <a
                href="https://fonts.google.com/icons"
                target="_blank"
                class="text-lightBlue-600 hover:underline"
                >Material Icons</a
              >
            </li>
          </ul>
        </div>

        <!-- Dependencies -->
        <div class="flex flex-col gap-2">
          <h2 class="text-xl font-bold">License</h2>
          <p>
            Free to use with some limitations. You are not allowed to use
            the source code in your own projects.
          </p>
        </div>
        
        <!-- Purchase -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <h2 class="text-xl font-bold">Purchase</h2>
            <p>
              By purchasing to this product, you will support the software
              now and in the future.
            </p>
          </div>
          <div class="flex gap-2">
            <div>
              <a
                href=""
                class="inline-flex items-center gap-2 px-5 py-3 text-white border-b-2 fill-current bg-lightBlue-600 border-lightBlue-700 hover:bg-lightBlue-700"
              >
                <img-svg
                  src="assets/icons/remixicon/shopping-cart-fill.svg"
                ></img-svg>
                Purchase
              </a>
            </div>
            <div>
              <a
                href=""
                class="inline-flex items-center gap-2 px-5 py-3 border-2 border-gray-200 fill-current"
              >
                Cancel
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("modal-info", ModalInfo);

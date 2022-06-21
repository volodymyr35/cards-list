import CardsList from "./cards-list.js";
import Pagination from "./pagination.js";
import { fetchData } from "./fetchRequest.js";


export default class OnlineStorePage {
  constructor(products = []) {
    
    this.pageSize = 9;
    this.components = {};

    this.initComponents();
    this.render();
    this.renderComponents();

    this.initEventListeners();
  }

  getTemplate() {
    return `
    <div>
    <div data-element="cardsList">
    <!-- Card component -->
    </div>
    <div data-element="pagination">
    <!-- Pagination component -->
    </div>
    </div>
    `;
  }

  async initComponents() {
    const cardList = new CardsList([]);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages: 12,
    });
    
    this.components.cardList = cardList;
    this.components.pagination = pagination;
    
    const data = await fetchData(1, this.pageSize);
    this.components.cardList.update(data);
  }

  renderComponents() {
    const cardsContainer = this.element.querySelector(
      '[data-element="cardsList"]'
    );
    const paginationContainer = this.element.querySelector(
      '[data-element="pagination"]'
    );

    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  initEventListeners() {
    this.components.pagination.element.addEventListener(
      "page-changed",
      async (event) => {
        const pageNumber = event.detail + 1;

        const data = await fetchData(pageNumber, this.pageSize);
        this.components.cardList.update(data);
      }
    );
  }
}

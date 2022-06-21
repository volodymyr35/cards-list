export default class Card {
  constructor (someProduct = {}) {
    this.state = someProduct;
    this.myRender();
    
  }

  getTemplate () {
    const result = `
    <div class="card">
    <div class="card__inner">  
    <img class="card__img" src="${this.state.images[0]}" alt="product" />
    <div class="card__details">
      <div class="card__rate-and-price">
        <button class="card__product--rate">${this.state.rating}&nbsp;
          <i class="bi bi-star"></i>
        </button>
        <span class="card__price">${this.state.price}</span>
      </div>
      <h4 class="card__title">${this.state.title}</h4>
      <span class="card__info">${this.state.category}</span>
    </div>
  </div>
  <button class="card__btn">Add to cart</button>
  </div>
    `;
    return result; 
  }

  update(data = {}) {
    this.state = data;
    this.componentElement.innerHTML = this.getTemplate();
  }

  myRender () {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }
}

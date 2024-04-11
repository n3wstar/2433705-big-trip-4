export default class OffersModel{

  constructor(service){
    this.service = service;
    this.offers = this.service.getOffers();
  }

  getOffers(){
    return this.offers;
  }

  getOfferByType(type){
    return this.offers.find((offer) => offer.type === type);
  }
}

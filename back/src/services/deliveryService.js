import { Delivery } from "../db/model/Delivery";

class deliveryService {
  // 해당 거래 배송 조회
  static async deliveryDetail(dealId) {
    const delivery = await Delivery.findDeliveryByDealId(dealId);

    return delivery;
  }

  //배송상태별 배송 조회
  static async deliveryByStatus(status) {
    const delivery = await Delivery.findDeliveryByStatus(status);

    return delivery;
  }
}

export { deliveryService };

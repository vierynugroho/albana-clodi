export const getHargaByCustomerCategory = (
  price: {
    normal: number;
    member?: number;
    reseller?: number;
    agent?: number;
  },
  category?: string
): number => {
  switch (category) {
    case "AGENT":
      return price.agent ?? price.reseller ?? price.member ?? price.normal;
    case "RESELLER":
      return price.reseller ?? price.member ?? price.normal;
    case "MEMBER":
      return price.member ?? price.normal;
    case "DROPSHIPER":
        return price.normal;
    case "CUSTOMER" :
        return price.normal;
    default:
      return price.normal;
  }
};

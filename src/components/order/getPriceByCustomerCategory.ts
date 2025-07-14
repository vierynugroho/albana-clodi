export const getHargaByCustomerCategory = (
  price: {
    normal: number;
    member?: number;
    reseller?: number;
    agent?: number;
  },
  category?: string
): number | null => {
  if (category === "CUSTOMER") {
    return price.normal;
  } else if (category === "DROPSHIPPER") {
    return price.normal;
  } else if (category === "MEMBER") {
    return price.member ?? null;
  } else if (category === "RESELLER") {
    return price.reseller ?? null;
  } else if (category === "AGENT") {
    return price.agent ?? null;
  } else {
    return null;
  }
};

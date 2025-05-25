import { ref } from "vue"
import { defineStore } from "pinia"
import { Card, CardApi } from "../../api/card.js"

export { useCardStore, getCardBrand, getCardLogo, getCardBackground }

const useCardStore = defineStore("card", () => {
    const cards = ref([])

    async function add(card) {
        const result = await CardApi.add(card)
        console.log("Tarjeta agregada:", result);
        const newCard = Object.assign(new Card(), result);
        cards.value.push(newCard);
        return newCard;
    }
    async function modify(card) {
        const result = await CardApi.modify(card);
        await getAll();
        return result;
    }

    async function remove(id) {
        const result = await CardApi.remove(id);
        await getAll();
        return result;
    }
    async function get(id) {
        const result = await CardApi.get(id);
        await getAll();
        return Object.assign(new Card(), result);
    }

    async function getAll(controller = null) {
        let result = await CardApi.getAll(controller);
        result = result.map((card) => Object.assign(new Card(), card));
        cards.value = result;
    }

    return { cards, add, modify, remove, get, getAll }
})

function getCardBrand(number) {
  if (!number) return "Otro";
  const sanitized = number.replace(/[\s-]/g, "");

  if (/^4/.test(sanitized)) return "Visa";
  const prefix2 = parseInt(sanitized.slice(0, 2));
  const prefix4 = parseInt(sanitized.slice(0, 4));
  if ((prefix2 >= 51 && prefix2 <= 55) || (prefix4 >= 2221 && prefix4 <= 2720)) {
    return "Mastercard";
  }
  if (/^3[47]/.test(sanitized)) return "American Express";
  const prefix3 = parseInt(sanitized.slice(0, 3));
  const prefix6 = parseInt(sanitized.slice(0, 6));
  if (
    /^6011/.test(sanitized) ||
    /^65/.test(sanitized) ||
    (prefix3 >= 644 && prefix3 <= 649) ||
    (prefix6 >= 622126 && prefix6 <= 622925)
  ) {
    return "Discover";
  }
  return "Otro";
}

function getCardLogo(number) {
  if (!number) return "https://upload.wikimedia.org/wikipedia/commons/3/39/Generic_Credit_Card_Icon.png";
  const brand = getCardBrand(number);
  switch (brand.toLowerCase()) {
    case "visa":
      return "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png";
    case "mastercard":
      return "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png";
    case "american express":
      return "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg";
    case "discover":
      return "https://upload.wikimedia.org/wikipedia/commons/5/53/Discover_Card_logo.svg";
    default:
      return "https://upload.wikimedia.org/wikipedia/commons/3/39/Generic_Credit_Card_Icon.png";
  }
}

function getCardBackground(number) {
  const brand = getCardBrand(number);
  switch (brand.toLowerCase()) {
    case "visa":
      return "bg-gradient-to-br from-blue-600 to-gray-300";
    case "mastercard":
      return "bg-gradient-to-br from-red-500 to-yellow-400";
    case "american express":
      return "bg-gradient-to-br from-blue-500 to-green-400";
    default:
      return "bg-gradient-to-br from-orange-500 to-gray-500";
  }
}
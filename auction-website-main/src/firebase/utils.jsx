import {
  getDoc,
  updateDoc,
  doc,
  Timestamp,
  deleteField,
  setDoc
} from "firebase/firestore";
import { db } from "./config";
import yaml from "js-yaml";
import { formatField } from "../utils/formatString";

const parseField = (key) => {
    const match = key.match(/item(\d+)_bid(\d+)/);
    return {
      item: Number(match[1]),
      bid: Number(match[2]),
    };
  };
  
export const unflattenItems = (doc, demo) => {
  let items = {};
  for (const [key, value] of Object.entries(doc.data())) {
    const { item, bid } = parseField(key);

    if (!(item in items)) items[item] = { bids: {} };

    if (bid === 0) {
      const { amount, endTime, ...itemData } = value;
      // Spread operator on `items[item]` in case bid 0 wasn't the first to be read
      items[item] = { ...items[item], ...itemData, startingPrice: amount, endTime: endTime.toDate() };
      if (demo) {
        const now = new Date();
        items[item].endTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          now.getHours(),
          now.getMinutes() + items[item].endTime.getMinutes(),
          items[item].endTime.getSeconds()
        );
      }
    } else {
      items[item].bids[bid] = value;
    }
  }
  return Object.values(items);
};
  
export const editItems = async (
  id = undefined,
  updateItems = false,
  deleteBids = false
) => {

  try {

    const response = await fetch(
      import.meta.env.BASE_URL + "items.yml"
    );

    let items = yaml.load(await response.text());

    // Single item update
    if (id !== undefined) {

      const foundItem = items.find(
        (item) => item.id === id
      );

      if (!foundItem) {
        console.error("Item not found");
        return;
      }

      items = [foundItem];
    }

    const updates = {};

    items.forEach((item) => {

      updates[formatField(item.id, 0)] = {

        ...item,

        amount: item.amount,

        endTime: Timestamp.fromDate(
          new Date(item.endTime)
        ),
      };
    });

    // THIS IS THE IMPORTANT CHANGE
    // setDoc with merge:true recreates fields

    await setDoc(
      doc(db, "auction", "items"),
      updates,
      { merge: true }
    );

    console.log("ALL ITEMS RESTORED");

    alert("All auction items restored!");

  } catch (err) {

    console.error(err);

    alert("Restore failed");
  }
};
  
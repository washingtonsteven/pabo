import Action from "@base/Action";
import Being from "@base/Being";
import pick from "@base/std/utils/pick";

const Transfer = new Action(
  "Transfer",
  /**
   * @param {Being} giver
   * @param {Being} recipient
   * @param {Action} thisAction
   */
  (giver: Being, recipient: Being, thisAction) => {
    const transferredItem = pick(giver.getInventory());
    if (!transferredItem) {
      return {
        message: `${giver.name} has nothing to give ${recipient.name}`,
      };
    }

    giver.removeFromInventory(transferredItem);
    recipient.addToInventory(transferredItem);

    if (!giver.getInventory() || !giver.getInventory().length) {
      giver.removeAction(thisAction);
    }
    if (
      recipient.getInventory() &&
      recipient.getInventory().length &&
      !recipient.hasAction(thisAction)
    ) {
      recipient.addAction(thisAction);
    }

    return {
      message: `${giver.name} gave the ${transferredItem.name} to ${recipient.name}`,
    };
  },
  true
);

export default Transfer;

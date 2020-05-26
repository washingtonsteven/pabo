const Action = require("@base/Action");
const Being = require("@base/Being");
const pick = require("@base/std/utils/pick");

const Transfer = new Action(
  "Transfer",
  /**
   * @param {Being} giver
   * @param {Being} recipient
   * @param {Action} thisAction
   */
  (giver, recipient, thisAction) => {
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

module.exports = Transfer;

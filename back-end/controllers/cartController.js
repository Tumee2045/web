import userModel from "../models/userModel.js";

// ✅ Add to cart (atomic, safe)
const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    let { itemId } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (typeof itemId !== "string" || !(itemId = itemId.trim())) {
      return res.status(400).json({ success: false, message: "Invalid or missing itemId" });
    }

    const user = await userModel.findById(userId).select("_id");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Atomically increment this item count (creates it if absent)
    await userModel.updateOne(
      { _id: userId },
      { $inc: { [`cartData.${itemId}`]: 1 } }
    );

    return res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.error("addToCart error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Update cart (set quantity or remove when 0)
const updateCart = async (req, res) => {
  try {
    const userId = req.userId;
    let { itemId, quantity } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (typeof itemId !== "string" || !(itemId = itemId.trim())) {
      return res.status(400).json({ success: false, message: "Invalid or missing itemId" });
    }
    if (typeof quantity !== "number" || !Number.isFinite(quantity) || quantity < 0) {
      return res.status(400).json({ success: false, message: "Invalid quantity" });
    }

    const user = await userModel.findById(userId).select("_id");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (quantity === 0) {
      await userModel.updateOne(
        { _id: userId },
        { $unset: { [`cartData.${itemId}`]: "" } }
      );
    } else {
      await userModel.updateOne(
        { _id: userId },
        { $set: { [`cartData.${itemId}`]: quantity } }
      );
    }

    return res.json({ success: true, message: "Cart updated" });
  } catch (error) {
    console.error("updateCart error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Get cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await userModel.findById(userId).select("cartData");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartData = user.cartData || {};
    return res.json({ success: true, cartData });
  } catch (error) {
    console.error("getUserCart error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { addToCart, updateCart, getUserCart };

const Order = require("../model/order.model");

exports.placeOrder = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentMethod } = req.body;

    const userid = req.user?.id;

    if (!userid) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - Please login",
      });
    }

    const order = await Order.create({
      user: userid,
      items,
      totalAmount,
      address,
      paymentMethod,
    });

    res.json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });

  } catch (error) {
    console.error("Order error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getOrder  = async(req,res) => {
    try {
        const orders = await Order.find({user: req.user.id}).sort({ createdAt: -1 }); 
        res.json({
          success: true,
          message: "order Details fetch",
          data: orders,
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}

exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
        .populate("user", "name email") // show user info
        .sort({ createdAt: -1 });
      res.json({
        success: true,
        orders,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
  
      const order = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
  
      res.json({
        success: true,
        message: "Order status updated",
        order,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
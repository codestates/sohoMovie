module.exports = {
  signout: async (req, res) => {
    return res.status(205).json({ message: "로그아웃 성공" });
    
  }
};
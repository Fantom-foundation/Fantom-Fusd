const ConvertLib = artifacts.require("ConvertLib");
const FusdToken = artifacts.require("FusdToken");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, FusdToken);
  deployer.deploy(FusdToken);
};

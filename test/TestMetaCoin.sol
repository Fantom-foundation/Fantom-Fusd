pragma solidity >=0.4.25 <0.7.0;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/FUSDToken.sol";

contract TestMetaCoin {

  // test initial balance to be empty on deployed contract
  function testInitialBalanceUsingDeployedContract() public {
    FusdToken token = FusdToken(DeployedAddresses.FusdToken());
    uint expected = 0;
    Assert.equal(token.getBalance(tx.origin), expected, "Owner should not have any fUSD.");
  }

  // test initial balance to be empty on a new  instance of the contract
  function testInitialBalanceWithNewFusdToken() public {
    FusdToken token = new FusdToken();
    uint expected = 0;
    Assert.equal(token.getBalance(tx.origin), expected, "Owner should not have any fUSD.");
  }
}

const FusdToken = artifacts.require("FusdToken");

contract('FusdToken', (accounts) => {
  it('should not have any fUSD initially', async () => {
    const tokenInstance = await FusdToken.deployed();
    const balance = await tokenInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 0, "first account has non-zero balance");
  });
  
  it('should call a function that depends on a linked library', async () => {
    const tokenInstance = await FusdToken.deployed();
    const tokenBalance = (await tokenInstance.getBalance.call(accounts[0])).toNumber();
    const tokenEthBalance = (await tokenInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(tokenEthBalance, 2 * tokenBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  
  it('should send coin correctly', async () => {
    const tokenInstance = await FusdToken.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await tokenInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await tokenInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await tokenInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await tokenInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await tokenInstance.getBalance.call(accountTwo)).toNumber();

    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});

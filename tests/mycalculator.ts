const assert = require("assert")
const anchor = require("@project-serum/anchor")
const { SystemProgram } = anchor.web3

describe("mycalculator  app", () => {
  const provider = anchor.AnchorProvider.local()
  anchor.setProvider(provider)
  const calculator = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Mycalculator

  it("Creates a calculator", async () => {
    await program.rpc.create("Welcome to SolCalc", {
      accounts: {
        calculator: calculator.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: SystemProgram.programId,
      },
      signers: [calculator],
    })

    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.greeting === "Welcome to SolCalc")
  })

  it("Add two numbers", async () => {
    await program.rpc.add(new anchor.BN(2), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(5)))
  })

  it("Subtract two numbers", async () => {
    await program.rpc.subtract(new anchor.BN(5), new anchor.BN(3), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(2)))
  })

  it("Multipy two numbers", async () => {
    await program.rpc.multiply(new anchor.BN(1), new anchor.BN(5), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(5)))
  })

  it("Divide two numbers", async () => {
    await program.rpc.divide(new anchor.BN(4), new anchor.BN(2), {
      accounts: {
        calculator: calculator.publicKey,
      },
    })
    const account = await program.account.calculator.fetch(calculator.publicKey)
    assert.ok(account.result.eq(new anchor.BN(2)))
  })
})

import { useState, useEffect } from "react";
import ProductMarket from "./contracts/ProductMarket.json";
import Web3 from "web3";
import "./App.css";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [data, setData] = useState({});
  const [value, setValue] = useState();
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545"); // Ensure correct URL format

    async function initWeb3() {
      try {
        const web3Instance = new Web3(provider);
        const networkId = await web3Instance.eth.net.getId();
        const deployedNetwork = ProductMarket.networks[networkId];

        if (deployedNetwork) {
          const contractInstance = new web3Instance.eth.Contract(
            ProductMarket.abi,
            deployedNetwork.address
          );

          setWeb3(web3Instance);
          setContract(contractInstance);
        } else {
          console.error("Contract not deployed on this network.");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    }

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (contract) {
        try {
          const data = await contract.methods.getter().call();
          setData(data);
          console.log(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [contract]);

  async function writeData() {
    if (contract) {
      try {
        const value = document.querySelector("#value").value;
        const id = document.querySelector("#id").value;
        const name = document.querySelector("#name").value;
        const price = Number(document.querySelector("#price").value); 
        const quantity = Number(document.querySelector("#quantity").value); 
        const owner = document.querySelector("#owner").value;

        setValue(value)
        setId(id)
        setName(name)
        setPrice(price)
        setQuantity(quantity)
        setOwner(owner);

        await contract.methods
          .setter(value, id, name, price, quantity, owner)
          .send({ from: "0x0A1E205Ac03c9A32b43A68f88D18C960e4dD3309" })

        console.log("Data written successfully!");
      } catch (error) {
      }
    } else {
      console.error("Contract not yet initialized.");
    }
  }

  return (
    <>
      <h1>Welcome to Dapp</h1>
      <div className="App">

        <div>
          
          <input type="text" id="value" required="required" />
          {value ?? <p className="text">Value: {value} </p>}
          <input type="number" id="id" required="required" />
          {id ?? <p className="text">ID: {id} </p>}
          <input type="text" id="name" required="required" />
          {name ?? <p className="text">Name: {name} </p>}
          <input type="number" id="price" required="required" /> 
          {price ?? <p className="text">Price: {price} </p>}
          <input type="number" id="quantity" required="required" />
          {quantity ?? <p className="text">Quantity: {quantity} </p>}
          <input type="text" id="owner" required="required" />
          {owner ?? <p className="text">Owner: {owner}</p>}

        </div>
        <button onClick={writeData} className="button button2">
          Change Data
        </button>
      </div>
    </>
  );
}

export default App;


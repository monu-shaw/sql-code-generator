import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'animate.css';

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState('');
  const [mode, setMode] = useState(false);
  const [hvr, setHvr] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setResult('Loding...');
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ animal: animalInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data);
      setResult(data.result.choices[0].text);
      setAnimalInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }
  const notify = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied !");
  }

  return (
    <div className={`${mode?'text-dark bg-light':'text-light bg-dark'}`}>
      <ToastContainer />
      <Head>
        <title>OurSQL</title>
        <meta name="description" content="SQL Command Auto Search Powered OpenAI" />
        <link rel="icon" href="/2772165.png" />
      </Head>
      <button className={`end-0 position-absolute p-2 border-0 rounded-circle ${mode?'text-dark bg-light':'text-light bg-dark'}`} onClick={()=>setMode(i=>!i)}><i className={`bi bi-${mode?'lightbulb-fill':'lightbulb'}`}></i></button>
      <a target="_blank"href="https://monu-shaw.github.io/portfolio/" className={`text-capitalize fw-semibold px-5 text-decoration-none position-absolute start-0 animate__animated animate__pulse animate__infinite py-1`} style={{transform: 'rotate(-20deg)'}}>Visit My Folio</a>
      <main className={`d-flex justify-content-center flex-column align-items-center`} style={{minWidth:'100vw', minHeight:'100vh'}}>
        <img src="/2772165.png" className={``} style={{width:'54px'}} />
        <h3 className="text-center">Generate SQL Query From Sentence</h3>
        <form onSubmit={onSubmit} className='col-11 col-md-8 col-lg-6 mx-auto'>
          <textarea
          className={`${styles.inSub} w-100 my-1`}
            type="text"
            name="animal"
            placeholder="Select all user whose name start with word monu"
            value={animalInput}
            rows='4'
            onChange={(e) => setAnimalInput(e.target.value)}
          ></textarea>
          <br />
          <input type="submit" className={`${styles.btnSub} text-capitalize w-100 my-1`} value="Generate query" />
        </form>
        <div className={styles.result} onClick={()=>notify()} onMouseOver={()=>setHvr(true)} onMouseOut={()=>setHvr(false)}>{result}</div>
        <p className={`small ${hvr?'opacity-100':'opacity-0'}`} style={{fontSize:'12px'}}>Click On Query to Copy</p>
      </main>
    </div>
  );
}

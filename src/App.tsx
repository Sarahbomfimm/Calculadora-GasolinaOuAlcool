import { useState } from 'react'
import './App.css'
import lojoImg from './assets/logo.png'
import type { FormEvent } from 'react'


interface infoProps{
  title: string
  alcool: string | number
  gasolina: string | number
}

function App() {
  const [gasolinaIput, setGasolinaInput] = useState(1)
  const [alcoolInput, setAlcoolInput] = useState(1)
  const [info, setInfo] = useState <infoProps> ()

  function calcular(event: FormEvent) {
    event.preventDefault()

    let calculo = (alcoolInput / gasolinaIput)

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar Álcool",
        gasolina: formatarMoeda(gasolinaIput),
        alcool: formatarMoeda(alcoolInput)
      })
    } else {
        setInfo({
        title: "Compensa usar Gasolina",
        gasolina: formatarMoeda(gasolinaIput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

  return (
    <div>
      <main className='container'>
        <img
          className='logo'
          src={lojoImg}
          alt='Logo da calculadora de gasolina ou alcool' />
        <h1 className='title'>Qual a melhor opção?</h1>

        {/* Formulário Alcool */}
        <form className='form' onSubmit={calcular}>
          <label> Álcool (preço por litro) : </label>
          <input
            type='number'
            className='input'
            placeholder='4,90'
            min={1}
            step={0.01}
            value={alcoolInput}
            onChange={(e) => setAlcoolInput(Number(e.target.value))}
            required />
        </form>

        {/* Formulario Gasolina */}
        <form className='form' onSubmit={calcular}>
          <label>Gasolina (preço por litro) : </label>
          <input
            type='number'
            className='input'
            placeholder='4,90'
            min={1}
            step={0.01}
            value={gasolinaIput}
            onChange={(e) => setGasolinaInput(Number(e.target.value))}
            required />

          <input
            className='button'
            type="submit"
            value="Calcular" />
        </form>
        {info && Object.keys(info).length > 0 && (
          <section className='result'>
        <h2 className='result-title'>{info.title}</h2>

        <span>Álcool {info.alcool}</span>
         <span>Gasolina {info.gasolina}</span>
      </section>)}
  
      </main>
    </div>
  )
}

export default App